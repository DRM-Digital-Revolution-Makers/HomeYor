import { supabase } from "../../src/lib/supabaseClient";

// Basic token economics config
export const TOKEN_COST_PER_VOTE = 1;

export type TokenTransactionType = "purchase" | "sale" | "spend_vote" | "refund";

export type TokenTransaction = {
  id?: string;
  user_id: string;
  type: TokenTransactionType;
  amount: number; // positive for purchase/refund, negative for sale/spend
  created_at?: string;
  meta?: Record<string, any> | null;
};

const LS_KEY = (uid: string) => `tokensBalance:${uid}`;

async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data } = await supabase!.auth.getUser();
    return data.user?.id ?? null;
  } catch (e) {
    return null;
  }
}

export async function getBalance(userId?: string): Promise<number> {
  const uid = userId || (await getCurrentUserId());
  if (!uid) return 0;
  // Prefer Supabase table user_tokens if configured, otherwise use localStorage fallback
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("user_tokens")
        .select("balance")
        .eq("user_id", uid)
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        await supabase.from("user_tokens").upsert({ user_id: uid, balance: 0 });
        return 0;
      }
      return (data as any)?.balance ?? 0;
    } catch (e) {
      console.warn("getBalance supabase error", e);
      const raw = localStorage.getItem(LS_KEY(uid));
      return raw ? parseInt(raw) || 0 : 0;
    }
  }
  const raw = localStorage.getItem(LS_KEY(uid));
  return raw ? parseInt(raw) || 0 : 0;
}

async function setBalance(newBalance: number, userId?: string): Promise<number> {
  const uid = userId || (await getCurrentUserId());
  if (!uid) return 0;
  if (supabase) {
    try {
      const { error } = await supabase
        .from("user_tokens")
        .upsert({ user_id: uid, balance: newBalance });
      if (error) throw error;
    } catch (e) {
      console.warn("setBalance supabase error", e);
      localStorage.setItem(LS_KEY(uid), String(newBalance));
    }
  } else {
    localStorage.setItem(LS_KEY(uid), String(newBalance));
  }
  // broadcast balance update for UI components to react
  try {
    window.dispatchEvent(new CustomEvent("tokens:updated", { detail: { balance: newBalance, userId: uid } }));
  } catch {}
  return newBalance;
}

async function addTransaction(tx: TokenTransaction): Promise<void> {
  if (!tx.user_id) return;
  if (supabase) {
    try {
      await supabase.from("token_transactions").insert({
        user_id: tx.user_id,
        type: tx.type,
        amount: tx.amount,
        meta: tx.meta ?? null,
      });
      return;
    } catch (e) {
      console.warn("addTransaction supabase error", e);
    }
  }
  // local fallback: store last 50 in LS
  const key = `${LS_KEY(tx.user_id)}:txs`;
  const arr: TokenTransaction[] = JSON.parse(localStorage.getItem(key) || "[]");
  arr.push({ ...tx, created_at: new Date().toISOString() });
  while (arr.length > 50) arr.shift();
  localStorage.setItem(key, JSON.stringify(arr));
}

export async function getTransactions(userId?: string): Promise<TokenTransaction[]> {
  const uid = userId || (await getCurrentUserId());
  if (!uid) return [];
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("token_transactions")
        .select("id,user_id,type,amount,created_at,meta")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as TokenTransaction[];
    } catch (e) {
      console.warn("getTransactions supabase error", e);
    }
  }
  const key = `${LS_KEY(uid)}:txs`;
  const arr: TokenTransaction[] = JSON.parse(localStorage.getItem(key) || "[]");
  return arr.reverse();
}

export async function buyTokens(amount: number, userId?: string): Promise<number> {
  const uid = userId || (await getCurrentUserId());
  if (!uid || amount <= 0) return 0;
  const current = await getBalance(uid);
  const next = current + amount;
  await setBalance(next, uid);
  await addTransaction({ user_id: uid, type: "purchase", amount, meta: { source: "demo" } });
  return next;
}

export async function sellTokens(amount: number, userId?: string): Promise<number> {
  const uid = userId || (await getCurrentUserId());
  if (!uid || amount <= 0) return 0;
  const current = await getBalance(uid);
  const next = Math.max(0, current - amount);
  await setBalance(next, uid);
  await addTransaction({ user_id: uid, type: "sale", amount: -amount, meta: { source: "demo" } });
  return next;
}

export async function spendTokensOnVote(initiativeId: number, agree: boolean, userId?: string): Promise<{ ok: boolean; balance: number; message?: string; }>{
  const uid = userId || (await getCurrentUserId());
  if (!uid) return { ok: false, balance: 0, message: "Нет пользователя" };
  const current = await getBalance(uid);
  if (current < TOKEN_COST_PER_VOTE) {
    return { ok: false, balance: current, message: "Недостаточно токенов" };
  }
  const next = current - TOKEN_COST_PER_VOTE;
  await setBalance(next, uid);
  await addTransaction({ user_id: uid, type: "spend_vote", amount: -TOKEN_COST_PER_VOTE, meta: { initiativeId, agree } });
  // Optionally also update votes_count (client-side illusion)
  return { ok: true, balance: next };
}