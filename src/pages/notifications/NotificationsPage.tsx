import React from "react";
import Topbar from "@/components/layout/Topbar";
import Notifications from "@/components/Notifications";
export default function NotificationsPage() {
  const data = [
    {
      id: 1,
      created_time: "Сегодня 14:55",
      message: "У Геннадия Зуброва намечается свадьба через неделю",
      type: "Интересное",
    },
    {
      id: 2,
      created_time: "Вчера 14:55",
      message: "У Геннадия Зуброва намечается свадьба через неделю",
      type: "Интересное",
    },
  ];

  return (
    <div className="">
      <Topbar />
      <div className="mt-10">
        <Notifications />
        <div>
          {data.map((el) => {
            return (
              <div>
                <div key={el.id} className="p-4 border-b border-gray-300">
                  <div className="text-lg text-[#000] mb-1 text-center font-sf font-[500]">
                    {el.created_time}
                  </div>
                  <div className="bg-[#fff] rounded-[30px] flex flex-col items-center justify-start p-4">
                    <div className=" flex items-center justify-center gap-2 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          opacity="0.5"
                          d="M12.9994 6.00016V6.46956C12.9994 7.0329 13.1602 7.58363 13.4615 8.0523L14.1997 9.20096C14.8741 10.2501 14.3593 11.6761 13.1864 12.0079C10.1182 12.8758 6.88183 12.8758 3.81357 12.0079C2.6407 11.6761 2.12588 10.2501 2.80024 9.20096L3.53853 8.0523C3.83981 7.58363 4.00058 7.0329 4.00058 6.46956V6.00016C4.00058 3.42284 6.01504 1.3335 8.5 1.3335C10.9849 1.3335 12.9994 3.42284 12.9994 6.00016Z"
                          fill="#00C896"
                        />
                        <path
                          d="M5.32861 12.3638C5.76257 13.7006 7.01829 14.667 8.49971 14.667C9.98117 14.667 11.2368 13.7006 11.6708 12.3638C9.57384 12.7573 7.42557 12.7573 5.32861 12.3638Z"
                          fill="#00C896"
                        />
                      </svg>
                      <span className="text-[#000] font-sf font-[400] text-[16px]">
                        {el.type}
                      </span>
                    </div>
                    <p className="text-[#000] font-sf font-[500] text-[18px] text-center">
                      {el.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
