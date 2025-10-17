import React, { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  HomeIcon,
  ChatIcon,
  BotIcon,
  IntegrationsIcon,
  SettingsIcon,
  SupportIcon,
} from "@/assets/icons";

const items = [
  { to: "/", label: "Дашборд", Icon: HomeIcon },
  { to: "/chatbot", label: "Чат-Бот", Icon: BotIcon },
  { to: "/chats", label: "Чаты", Icon: ChatIcon },
  { to: "/integrations", label: "Интеграции", Icon: IntegrationsIcon },
  { to: "/support", label: "Поддержка", Icon: SupportIcon },
  { to: "/settings", label: "Настройки", Icon: SettingsIcon },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-full text-white p-4 flex flex-col justify-between  transition-all ${
        collapsed ? "w-16" : "w-full lg:w-[240px]"
      }`}
    ></aside>
  );
};

export default Sidebar;
