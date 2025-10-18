import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import Navbar from "./Navbar";
import { supabase } from "@/lib/supabaseClient";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const hideTopbar = location.pathname.startsWith("/chat/");
  const hideNavbar = location.pathname.startsWith("/chat/");

  useEffect(() => {
    const client = supabase;
    if (!client) {
      navigate({ to: "/auth/login" });
      return;
    }
    const check = async () => {
      const {
        data: { session },
      } = await client.auth.getSession();
      if (!session) navigate({ to: "/auth/login" });
    };
    check();
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate({ to: "/auth/login" });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar виден на /chat, скрыт на вложенных путях (/chat/...) */}
      {/* {!hideTopbar && <Topbar />} */}
      <main
        className={`p-4 lg:p-6 flex flex-col ${!hideTopbar ? "pt-20" : ""}`}
      >
        <Outlet />
        {/* Отступ снизу нужен, когда Navbar виден */}
        {!hideNavbar && <div className="mb-20"></div>}
      </main>
      {/* Navbar скрыт для всех путей, начинающихся с /chat */}
      {!hideNavbar && <Navbar />}
    </div>
  );
};

export default AdminLayout;
