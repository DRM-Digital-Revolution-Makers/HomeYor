import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./Navbar";

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="p-4 lg:p-6 flex flex-col ">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default AdminLayout;
