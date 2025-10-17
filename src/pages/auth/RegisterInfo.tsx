import React, { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";
import { LeftArrow } from "@/assets/icons";

export default function RegisterInfo() {
  const navigate = useNavigate();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!first.trim() || !last.trim()) {
      setError("Заполните имя и фамилию");
      return;
    }
    if (!supabase) {
      setError("Supabase не настроен");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { first_name: first.trim(), last_name: last.trim(), email: email.trim() },
      });
      if (error) throw error;

      // Batch save to 'profiles' table
      try {
        const { data: userData } = await supabase.auth.getUser();
        const uid = userData.user?.id;
        if (uid) {
          await supabase.from("profiles").upsert({
            id: uid,
            first_name: first.trim(),
            last_name: last.trim(),
            email: email.trim(),
          });
        }
      } catch (e: any) {
        console.warn("Не удалось записать профиль в profiles:", e?.message || e);
      }

      navigate({ to: "/" });
    } catch (err: any) {
      setError(err.message || "Не удалось сохранить данные");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back */}
      <div className="fixed top-0 left-0 right-0 bg-background flex items-center justify-between px-5 py-5 rounded-e-xl">
        <button type="button" onClick={() => navigate({ to: "/auth/verify" })} className="flex items-center text-[#1E90FF]">
          <LeftArrow />
        </button>
        <div className="font-sf text-[20px] font-[600] text-[#000]">Регистрация</div>
        <div style={{ width: 30, height: 30 }} />
      </div>

      {/* Content */}
      <form onSubmit={submit} className="flex-1 px-5 pt-24 pb-24 max-w-sm mx-auto w-full" id="registerForm">
        <div className="mb-4">
          <label className="text-sm text-[#000] font-sf">Ваше имя</label>
          <input
            className="mt-2 w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base"
            placeholder="Введите ваше имя"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="text-sm text-[#000] font-sf">Ваша Фамилия</label>
          <input
            className="mt-2 w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base"
            placeholder="Введите вашу фамилию"
            value={last}
            onChange={(e) => setLast(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="text-sm text-[#000] font-sf">Email (для входа)</label>
          <input
            type="email"
            autoComplete="email"
            className="mt-2 w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="text-[#7A7A7A] text-[12px]">
          Нажимая <span className="text-[#1E90FF]">«Продолжить»</span>, вы соглашаетесь с условиями
          <span className="text-[#1E90FF]"> Пользовательского соглашения</span> и
          <span className="text-[#1E90FF]"> Политики конфиденциальности</span>.
        </div>
        <div className="text-center mt-3">
          <Link to="/auth/login" className="text-[#1E90FF] font-sf text-[14px]">Уже есть аккаунт? Войти</Link>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        {/* Spacer to avoid overlay by bottom button */}
        <div className="h-24" />
      </form>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-6">
        <button
          type="submit"
          form="registerForm"
          disabled={loading}
          className="w-full bg-[#1E90FF] text-white rounded-[14px] py-3 text-[16px] font-sf disabled:opacity-50"
        >
          {loading ? "Сохраняем…" : "Продолжить"}
        </button>
      </div>
    </div>
  );
}