import React from "react";

export default function Chats() {
  return (
    <div className="flex gap-4">
      <div className="bg-[#141414] rounded-2xl p-6 border border-white/5 min-h-[300px] min-w-[485px]">
        <h2 className="font-inter text-[40px] mb-6">Чаты</h2>
        <div className="bg-[#212121] rounded-2xl p-4 flex justify-between items-center">
          <div>
            <p className="text-white font-medium">Alice Smith</p>
            <p className="text-gray-400">Hey, how are you?</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-400 text-sm">10:30AM</span>
            <div className="w-6 h-6 rounded-full bg-gray-400 mt-2"></div>
          </div>
        </div>
      </div>
      <div className="bg-[#141414] rounded-2xl p-6 border border-white/5 min-h-[300px] min-w-[837px]">
        <h3 className="font-inter text-xl">Список чатов</h3>
      </div>
    </div>
  );
}
