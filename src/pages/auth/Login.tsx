import React, { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import VectorLogo from "@/assets/logo/Vector.svg";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const HACKATHON_EMAIL = import.meta.env.VITE_HACKATHON_EMAIL || "hackathon@testmail.com";
  const HACKATHON_PASSWORD = import.meta.env.VITE_HACKATHON_PASSWORD || "qwerty123";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Введите email и пароль");
      return;
    }
    if (!supabase) {
      setError("Supabase не настроен");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (!data.session) throw new Error("Сессия не получена");
      dispatch(
        setCredentials({
          access: data.session.access_token,
          refresh: data.session.refresh_token,
        })
      );
      navigate({ to: "/" });
    } catch (err: any) {
      setError(err.message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const loginHackathon = async () => {
    setError(null);
    if (!supabase) {
      setError("Supabase не настроен");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: HACKATHON_EMAIL,
        password: HACKATHON_PASSWORD,
      });
      if (error) throw error;
      if (!data.session) throw new Error("Сессия не получена");
      dispatch(
        setCredentials({
          access: data.session.access_token,
          refresh: data.session.refresh_token,
        })
      );
      navigate({ to: "/" });
    } catch (err: any) {
      const msg = err?.message || "Ошибка входа демо-пользователя";
      setError(`${msg}. Убедитесь, что VITE_HACKATHON_EMAIL существует в Supabase.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-background flex items-center justify-between px-5 py-5 rounded-e-xl">
        <div className="flex items-center gap-2">
          <img src={VectorLogo} alt="HomeYor" className="w-6 h-6" />
          <span className="font-sf text-[#000] text-[20px] font-[600]">HomeYor</span>
        </div>
        <div className="text-[#000] font-sf text-[14px]">Русский 🇷🇺</div>
      </div>

      {/* Content */}
      <form onSubmit={onSubmit} className="flex-1 px-5 pt-24 pb-24 max-w-sm mx-auto w-full" id="loginForm">
        <div className="text-center font-sf text-[20px] font-[600] text-[#000] mb-4">Вход</div>

        <input
          type="email"
          autoComplete="email"
          className="w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base text-[#000] placeholder-[#7A7A7A] caret-[#1E90FF] mb-3"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          autoComplete="current-password"
          className="w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base text-[#000] placeholder-[#7A7A7A] caret-[#1E90FF]"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center mt-3">
          <Link to="/auth/phone" className="text-[#1E90FF] font-sf text-[14px]">Нет аккаунта? Регистрация по номеру</Link>
        </div>
        <div className="text-center mt-1">
          <Link to="/auth/signup" className="text-[#1E90FF] font-sf text-[14px]">Или регистрация по email</Link>
        </div>
        {error && <div className="text-center text-red-500 text-sm mt-2">{error}</div>}

        {/* Spacer to avoid overlay by bottom button */}
        <div className="h-28" />
      </form>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-6 space-y-2">
        <button
          type="button"
          onClick={loginHackathon}
          disabled={loading}
          className="w-full bg-[#fff] text-[#1E90FF] border border-[#1E90FF] rounded-[14px] py-3 text-[16px] font-sf disabled:opacity-50"
        >
          {loading ? "Подготовка…" : "skip registration for hackathon"}
        </button>
        <button
          type="submit"
          form="loginForm"
          disabled={loading}
          className="w-full bg-[#1E90FF] text-white rounded-[14px] py-3 text-[16px] font-sf disabled:opacity-50"
        >
          {loading ? "Входим…" : "Войти"}
        </button>
      </div>
    </div>
  );
}