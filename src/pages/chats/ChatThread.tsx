import React, { useEffect, useRef, useState } from "react";
import { LeftArrow } from "@/assets/icons";

type ChatMessage = {
  id: number;
  author: string; // "me" для исходящих, иначе имя собеседника
  text: string;
  time: string;
  delivered?: boolean;
};

export default function ChatThread() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "me",
        text: txt,
        time: `${hh}:${mm}`,
        delivered: true,
      },
    ]);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col">
      <div className="bg-white">
        <div className="mx-auto max-w-md ">
          <div className="h-12 flex items-center">
            <button
              aria-label="Назад"
              onClick={() => window.history.back()}
              className="p-2 -ml-2 mr-2"
            >
              <LeftArrow />
            </button>
            <div className="flex-1 text-center font-sf text-[16px] font-[600] text-[#000]">
              Общий чат соседей
            </div>
            <div className="w-8" />
          </div>
        </div>
      </div>
      -{" "}
      <div className="mx-auto max-w-md w-full px-4">
        - <div className="mt-2 mb-2"></div>-{" "}
      </div>
      <div
        ref={listRef}
        className="mx-auto max-w-md w-full flex-1 px-4 pb-24 overflow-y-auto"
      >
        {messages.map((msg) => {
          const isMe = msg.author === "me";
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3`}
            >
              <div
                className={`${
                  isMe ? "bg-[#1E90FF] text-white" : "bg-[#D9D9D9] text-[#000]"
                } rounded-[20px] px-4 py-3 max-w-[80%]`}
              >
                {!isMe && (
                  <div className="text-[#666] font-sf text-[14px] mb-1">
                    {msg.author}
                  </div>
                )}
                <div
                  className={`font-sf text-[14px] ${isMe ? "font-[600]" : ""}`}
                >
                  {msg.text}
                </div>
                <div
                  className={`mt-2 flex items-center justify-end gap-1 text-[12px] ${
                    isMe ? "text-white/70" : "text-[#666]"
                  }`}
                >
                  <span>{msg.time}</span>
                  {isMe && msg.delivered && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-md px-4 py-3">
          <div className="flex items-center gap-2">
            <button aria-label="Эмодзи" className="p-2 text-[#6b7280]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#6b7280"
                  strokeWidth="1.6"
                />
                <circle cx="9" cy="10" r="1" fill="#6b7280" />
                <circle cx="15" cy="10" r="1" fill="#6b7280" />
                <path
                  d="M8 14C9 15.5 10.5 16.25 12 16.25C13.5 16.25 15 15.5 16 14"
                  stroke="#6b7280"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Сообщение"
              className="flex-1 h-10 rounded-full bg-[#F6F6F6] border border-gray-300 px-4 font-sf text-[14px] text-[#000] outline-none"
            />
            <button
              onClick={send}
              aria-label="Отправить"
              className="p-2 rounded-full bg-[#1E90FF] text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12L19 5L16 19L12 14L5 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
