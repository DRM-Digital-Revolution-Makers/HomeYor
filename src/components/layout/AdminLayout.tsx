import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import Navbar from "./Navbar";
import { supabase } from "@/lib/supabaseClient";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const path = router.state.location.pathname;
  const isChatPage = path.startsWith("/chat");

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
      {/* Topbar только вне страниц чатов */}
      {!isChatPage && <Topbar />}
      <main className={`p-4 lg:p-6 flex flex-col ${!isChatPage ? "pt-20" : ""}`}>
        <Outlet />
        {!isChatPage && <div className="mb-20"></div>}
      </main>
      {!isChatPage && <Navbar />}
    </div>
  );
};

export default AdminLayout;
