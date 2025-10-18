import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LeftArrow } from "@/assets/icons";
import { buyTokens, sellTokens, getBalance, getTransactions } from "../../../services/tokens-services";

export default function TokensPage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [txs, setTxs] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const b = await getBalance();
        setBalance(b);
        const t = await getTransactions();
        setTxs(t);
      } catch (e: any) {
        setError(e?.message || "Не удалось загрузить баланс");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onBuy = async () => {
    const next = await buyTokens(10);
    setBalance(next);
    const t = await getTransactions();
    setTxs(t);
  };
  const onSell = async () => {
    const next = await sellTokens(10);
    setBalance(next);
    const t = await getTransactions();
    setTxs(t);
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 bg-[#F2F2F2] flex items-center justify-between px-5 py-5 rounded-e-xl">
        <button onClick={() => navigate({ to: "/" })} aria-label="Назад" className="flex items-center gap-2">
          <LeftArrow />
        </button>
        <h1 className="font-sf font-[500] text-[24px] text-[#000]">Токены</h1>
        <div />
      </div>

      <div className="px-5 pt-24 pb-6 space-y-4">
        <div className="bg-[#fff] rounded-[20px] p-4 flex items-center justify-between border border-[#E5E7EB]">
          <div className="text-[#676767]">Текущий баланс</div>
          <div className="text-[#000] font-sf text-[18px] font-[600]">{balance}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={onBuy} className="w-full bg-[#1E90FF] text-white rounded-[14px] py-3 text-[16px] font-sf">
            Купить +10
          </button>
          <button onClick={onSell} className="w-full bg-[#fff] text-[#FF6B6B] border border-[#FF6B6B] rounded-[14px] py-3 text-[16px] font-sf">
            Продать -10
          </button>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="bg-[#fff] rounded-[20px] p-4 border border-[#E5E7EB]">
          <div className="text-[#000] font-sf text-[16px] font-[600] mb-2">История операций</div>
          <div className="space-y-2">
            {txs.length === 0 && (
              <div className="text-[#676767] text-[14px]">Нет операций</div>
            )}
            {txs.map((t, i) => (
              <div key={i} className="flex items-center justify-between text-[14px]">
                <div className="text-[#676767]">
                  {t.type === "purchase" && "Покупка"}
                  {t.type === "sale" && "Продажа"}
                  {t.type === "spend_vote" && "Списание за голос"}
                  {t.type === "refund" && "Возврат"}
                </div>
                <div className={`font-sf ${t.amount >= 0 ? "text-[#1E90FF]" : "text-[#FF6B6B]"}`}>{t.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}