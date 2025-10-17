import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./Navbar";
import NotFoundPage from "@/pages/errorPages/404";

export const Route = {
  notFoundComponent: NotFoundPage,
};

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 lg:p-6 flex flex-col pt-20 ">
        <Outlet />
        <div className="mb-20"></div>
      </main>
      <Navbar />
    </div>
  );
};

export default AdminLayout;
