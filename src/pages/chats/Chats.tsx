import React, { useState } from "react";
import ChatThread from "./ChatThread";
import Topbar from "@/components/layout/Topbar";

export default function Chats() {
  const [showThread, setShowThread] = useState(false);
  if (showThread) return <ChatThread />;
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Topbar удалён для страниц чатов */}
      <Topbar />

      <main className="mx-auto max-w-md px-4  pb-10">
        <button
          onClick={() => setShowThread(true)}
          className="bg-white rounded-[30px] p-4 mb-4 flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  opacity="0.5"
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39938 20.8229C6.78393 20.72 7.19121 20...."
                  fill="#1E90FF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0003 6.77539C11.5447 6.77539 11.1753 7.14476 11.1753 7.60039V16.4004C11.1753 16.856 11.5447 17.2254 12.0003 17.2254C12.4559 17.2254 12.8253 16.856 12.8253 16.4004V7.60039C12.8253 7.14476 12.4559 6.77539 12.0003 6.77539Z"
                  fill="#1E90FF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.60039 8.97559C7.14476 8.97559 6.77539 9.34496 6.77539 9.80059V14.2006C6.77539 14.6562 7.14476 15.0256 7.60039 15.0256C8.05603 15.0256 8.42539 14.6562 8.42539 14.2006V9.80059C8.42539 9.34496 8.05603 8.97559 7.60039 8.97559Z"
                  fill="#1E90FF"
                />
                <path
                  d="M15.5752 9.80059C15.5752 9.34496 15.9446 8.97559 16.4002 8.97559C16.8558 8.97559 17.2252 9.34496 17.2252 9.80059V14.2006C17.2252 14.6562 16.8558 15.0256 16.4002 15.0256C15.9446 15.0256 15.5752 14.6562 15.5752 14.2006V9.80059Z"
                  fill="#1E90FF"
                />
              </svg>
            </div>
            <span className="font-sf text-[16px] font-[600] text-[#000]">
              Общий чат соседей
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="#111"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="text-center text-[#666] mb-3">
          <span className="font-sf text-[16px]">Сегодня 5:30</span>
        </div>

        <div className="bg-white rounded-[30px] p-4 mb-3">
          <div className="text-[#666] font-sf text-[14px]">Геннадий Зубров</div>
          <div className="flex items-center justify-between">
            <div className="font-sf text-[16px] text-[#000] font-[600] truncate pr-3">
              Собаки погрызли вашу соседку...
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="#1E90FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-[30px] p-4 mb-3">
          <div className="text-[#666] font-sf text-[14px]">Оксана Белая</div>
          <div className="flex items-center justify-between">
            <div className="font-sf text-[16px] text-[#000] font-[600] truncate pr-3">
              Ктати, вы слышали новость п...
            </div>
            <div className="h-7 min-w-7 px-2 rounded-full bg-[#1E90FF] text-white flex items-center justify-center text-[12px] font-sf font-[700]">
              4+
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}
