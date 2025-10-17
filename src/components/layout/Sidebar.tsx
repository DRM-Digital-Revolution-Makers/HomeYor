import React, { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";

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
