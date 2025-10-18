import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type NotificationItem = {
  id: string;
  title: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "planned" | "ongoing" | "resolved";
  starts_at: string | null;
  ends_at: string | null;
};

const priorityColor = (p: NotificationItem["priority"]) => {
  switch (p) {
    case "urgent":
      return "bg-[#FF6B6B] text-white";
    case "high":
      return "bg-[#FFA500] text-[#000]";
    case "medium":
      return "bg-[#1E90FF] text-white opacity-90";
    default:
      return "bg-[#EEE] text-[#000]";
  }
};

const statusLabel = (s: NotificationItem["status"]) => {
  switch (s) {
    case "ongoing":
      return "Идёт";
    case "planned":
      return "Запланировано";
    case "resolved":
      return "Завершено";
    default:
      return s;
  }
};

function formatDate(val: string | null) {
  if (!val) return "";
  try {
    return new Date(val).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return val || "";
  }
}

const Notifications: React.FC = () => {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const client = supabase;
        if (!client) {
          setItems([]);
          setLoading(false);
          return;
        }
        const { data, error } = await client
          .from("notifications")
          .select("id,title,category,priority,status,starts_at,ends_at")
          .or("status.eq.planned,status.eq.ongoing")
          .order("starts_at", { ascending: false })
          .limit(10);
        if (error) throw error;
        setItems((data || []) as NotificationItem[]);
      } catch (e) {
        console.warn("Не удалось загрузить оповещения:", (e as any)?.message || e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-[#fff] w-full p-4 rounded-[30px] gap-4 mt-4">
      <h2 className=" font-sf text-lg text-[#000] font-[510] ">Важные оповещения</h2>
      <div className="text-[#000] bg-[#EEEEEE] w-full p-3 flex flex-col rounded-[30px]">
        {loading ? (
          <div className="text-[14px]">Загрузка оповещений…</div>
        ) : items.length === 0 ? (
          <div className="text-[14px]">Оповещений пока нет</div>
        ) : (
          <ul className="space-y-3">
            {items.map((n) => (
              <li key={n.id} className="p-3 bg-white rounded-[14px] shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-sf text-[15px] font-[600]">{n.title}</span>
                  <span className={`px-2 py-1 rounded-full text-[12px] ${priorityColor(n.priority)}`}>
                    {n.priority}
                  </span>
                </div>
                <div className="mt-1 text-[12px] text-[#555]">
                  {statusLabel(n.status)}
                  {n.starts_at ? ` • c ${formatDate(n.starts_at)}` : ""}
                  {n.ends_at ? ` по ${formatDate(n.ends_at)}` : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
