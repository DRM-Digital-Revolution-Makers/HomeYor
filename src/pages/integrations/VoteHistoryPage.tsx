import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LeftArrow } from "@/assets/icons";
import { getTransactions } from "../../../services/tokens-services";

export default function VoteHistoryPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [votes, setVotes] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const t = await getTransactions();
        const onlyVotes = (t || []).filter((x: any) => x.type === "spend_vote");
        setVotes(onlyVotes);
      } catch (e: any) {
        setError(e?.message || "Не удалось загрузить историю голосов");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 bg-[#F2F2F2] flex items-center justify-between px-5 py-5 rounded-e-xl">
        <button onClick={() => navigate({ to: "/" })} aria-label="Назад" className="flex items-center gap-2">
          <LeftArrow />
        </button>
        <h1 className="font-sf font-[500] text-[24px] text-[#000]">История голосов</h1>
        <div />
      </div>

      <div className="px-5 pt-24 pb-6 space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {loading && <div className="text-[#676767] text-[14px]">Загрузка…</div>}
        {!loading && (
          <div className="bg-[#fff] rounded-[20px] p-4 border border-[#E5E7EB]">
            <div className="text-[#000] font-sf text-[16px] font-[600] mb-2">Последние голоса</div>
            <div className="space-y-2">
              {votes.length === 0 && (
                <div className="text-[#676767] text-[14px]">Вы пока не голосовали</div>
              )}
              {votes.map((t: any, i: number) => {
                const agree = Boolean(t?.meta?.agree);
                const initiativeId = t?.meta?.initiativeId ?? "-";
                const created = t?.created_at ? new Date(t.created_at) : null;
                const dateStr = created
                  ? created.toLocaleString(undefined, { hour12: false })
                  : "";
                return (
                  <div key={i} className="flex items-center justify-between text-[14px]">
                    <div className="text-[#000]">
                      Инициатива #{initiativeId}
                      <span className={`ml-2 ${agree ? "text-[#00C896]" : "text-[#FF6B6B]"}`}>
                        {agree ? "За" : "Против"}
                      </span>
                    </div>
                    <div className="text-[#676767]">{dateStr}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}