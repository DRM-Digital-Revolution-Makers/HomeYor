import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";

type InitiativeItem = {
  id: number;
  title: string;
  description: string | null;
  user_id: string | null;
  tags: string[] | null;
  status: "active" | "closed" | "voting";
  votes_count: number;
  created_at: string;
};

const statusLabel: Record<InitiativeItem["status"], string> = {
  active: "Активна",
  closed: "Закрыта",
  voting: "Голосование",
};


const InitiativesCard: React.FC<{ showVoting?: boolean; showLink?: boolean }> = ({ showVoting = false, showLink = true }) => {
  const [items, setItems] = useState<InitiativeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Record<number, "agree" | "disagree" | undefined>>({});

  useEffect(() => {
    const loadInitiatives = async () => {
      const client = supabase;
      if (!client) {
        setLoading(false);
        setError("Supabase client not initialized");
        return;
      }
      try {
        const { data, error } = await client
          .from("initiatives")
          .select(
            "id,title,description,tags,status,votes_count,created_at"
          )
          .in("status", ["active", "voting"]) // show active and voting initiatives only
          .order("created_at", { ascending: false })
          .limit(8);
        if (error) throw error;
        setItems((data ?? []) as InitiativeItem[]);
      } catch (e) {
        setError((e as any)?.message || "Не удалось загрузить инициативы");
      } finally {
        setLoading(false);
      }
    };
    loadInitiatives();
  }, []);

  const handleVote = (id: number, value: "agree" | "disagree") => {
    setUserVotes((prev) => ({ ...prev, [id]: value }));
    // TODO: Persist votes to the server (RPC/insert) once the votes table is ready
  };

  return (
    <div className="bg-[#fff] w-full p-4 rounded-[30px] gap-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-sf text-lg text-[#000] font-[510]">Инициативы в вашем двору</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M22 7H2" stroke="#1E90FF" strokeWidth="1.5" strokeLinecap="round" />
          <path
            opacity="0.5"
            d="M19 12H5"
            stroke="#1E90FF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M16 17H8" stroke="#1E90FF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Mobile layout: two columns on small screens */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {loading && (
          <>
            <div className="box w-full h-[100px] bg-[#EEE] rounded-[14px]" />
            <div className="box w-full h-[100px] bg-[#EEE] rounded-[14px]" />
            <div className="box w-full h-[100px] bg-[#EEE] rounded-[14px]" />
            <div className="box w-full h-[100px] bg-[#EEE] rounded-[14px]" />
          </>
        )}

        {!loading && error && (
          <div className="col-span-2 text-center py-4 text-[#FF6B6B] font-sf">
            Ошибка загрузки инициатив: {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="col-span-2 text-center py-4 text-[#676767] font-sf">
            Нет активных инициатив
          </div>
        )}

        {!loading && !error &&
          items.map((item, idx) => (
            <div
              key={item.id}
              className={`w-full min-h-[100px] h-auto rounded-[14px] p-3 flex flex-col justify-between ${idx === 0 ? "bg-[#1E90FF] text-white" : "bg-[#EEE] text-[#000]"}`}
            >
              <div
                className={`font-sf text-[14px] font-[500] leading-[18px] ${idx === 0 ? "text-white" : "text-[#000]"}`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.title}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className={`flex items-center gap-1 text-[12px] ${idx === 0 ? "text-white" : "text-[#000]"}`}>
                  <span>+ {item.votes_count}</span>
                </div>
                <div className="flex items-center gap-2">
                  {showVoting && (
                    <>
                      <button
                        type="button"
                        aria-label="За"
                        onClick={() => handleVote(item.id, "agree")}
                        className={`w-8 h-8 rounded-[10px] border flex items-center justify-center text-[14px] transition-colors ${
                          userVotes[item.id] === "agree"
                            ? "bg-[#1E90FF] text-white border-[#1E90FF]"
                            : "bg-[#fff] text-[#000] border-[#DDD] hover:bg-[#f5f8ff]"
                        }`}
                      >
                        ✓
                      </button>
                      <button
                        type="button"
                        aria-label="Против"
                        onClick={() => handleVote(item.id, "disagree")}
                        className={`w-8 h-8 rounded-[10px] border flex items-center justify-center text-[14px] transition-colors ${
                          userVotes[item.id] === "disagree"
                            ? "bg-[#FF6B6B] text-white border-[#FF6B6B]"
                            : "bg-[#fff] text-[#000] border-[#DDD] hover:bg-[#fff0f0]"
                        }`}
                      >
                        ✕
                      </button>
                    </>
                  )}
                  {showLink && (
                    <Link
                      to="/initiatives"
                      aria-label={`Открыть инициативу ${item.title}`}
                      className="w-8 h-8 flex items-center justify-center bg-[#fff] border border-[#DDD] rounded-[10px] hover:bg-[#f5f8ff] hover:border-[#1E90FF]"
                    >
                      <span className="text-[#000]">↗</span>
                    </Link>
                  )}
                 </div>

              </div>
            </div>
          ))}

      </div>
    </div>
  );
};

export default InitiativesCard;
