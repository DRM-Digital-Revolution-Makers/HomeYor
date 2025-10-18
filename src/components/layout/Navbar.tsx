import React from "react";
import { Link } from "@tanstack/react-router";
import { HomeIcon, BellIcon, ChatIcon } from "@/assets/icons";

const Navbar: React.FC = () => {
  const navData = [
    { name: "Главная", href: "/", icon: <HomeIcon /> },
    { name: "Оповещения", href: "/notifications", icon: <BellIcon /> },
    { name: "Сообщения", href: "/chat", icon: <ChatIcon /> },
  ];
  return (
    <div className="fixed z-10 bottom-0 left-0 right-0 flex items-center justify-between px-8 pb-2 bg-[#fff] h-[70px] mt-4 border-t border-t-[#0000004D]">
      {navData.map((item) => {
        return (
          <div key={item.href} className="flex flex-col items-center min-w-[90px]">
            <Link to={item.href} className="flex flex-col items-center gap-1">
              <div>{item.icon}</div>
              <span className="text-[#676767] text-[10px] font-[400] font-sf">
                {item.name}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
