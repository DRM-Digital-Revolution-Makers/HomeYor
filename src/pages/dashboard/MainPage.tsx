import React, { useEffect, useState } from "react";
import Verified from "@/components/Verified";
import InitiativesCard from "@/components/InitiativesCard";
import SpecialistCard from "@/components/SpecialistCard";
// Убираю локальный Topbar: он уже рендерится в AdminLayout
// import Topbar from "@/components/layout/Topbar";
import Notifications from "@/components/Notifications";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";

export default function MainPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

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
      if (!session) {
        navigate({ to: "/auth/login" });
        return;
      }
      setReady(true);
    };
    check();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate({ to: "/auth/login" });
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!ready) return null;

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Verified />
        <Notifications />
        <div className="lg:col-span-2">
          <InitiativesCard />
        </div>
        <div className="lg:col-span-2">
          <SpecialistCard />
        </div>
      </div>
    </div>
  );
}
