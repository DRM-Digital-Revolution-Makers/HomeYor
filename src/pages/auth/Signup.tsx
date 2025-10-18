import React, { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";
import VectorLogo from "@/assets/logo/Vector.svg";

export default function Signup() {
  const navigate = useNavigate();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const isEmail = (v: string) => /.+@.+\..+/.test(v);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!first.trim() || !last.trim()) {
      setError("Заполните имя и фамилию");
      return;
    }
    if (!isEmail(email)) {
      setError("Введите корректный email");
      return;
    }
    if (!password || password.length < 6) {
      setError("Минимум 6 символов в пароле");
      return;
    }
    if (password !== confirm) {
      setError("Пароли не совпадают");
      return;
    }
    if (!supabase) {
      setError("Supabase не настроен");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + "/auth/login",
          data: { first_name: first.trim(), last_name: last.trim() },
        },
      });
      if (error) throw error;
      if (data.session) {
        // Email confirmation disabled -> session returned immediately
        navigate({ to: "/" });
      } else {
        // Typical case: email confirmation required
        setInfo(
          "Мы отправили письмо с подтверждением. Перейдите по ссылке из письма, затем войдите."
        );
      }
    } catch (err: any) {
      setError(err.message || "Не удалось зарегистрироваться");
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
      <form onSubmit={onSubmit} className="flex-1 px-5 pt-24 pb-24 max-w-sm mx-auto w-full" id="signupForm">
        <div className="text-center font-sf text-[20px] font-[600] text-[#000] mb-4">Регистрация по email</div>

        <div className="mb-3">
          <input
            className="w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base text-[#000] placeholder-[#7A7A7A] caret-[#1E90FF]"
            placeholder="Имя"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base text-[#000] placeholder-[#7A7A7A] caret-[#1E90FF]"
            placeholder="Фамилия"
            value={last}
            onChange={(e) => setLast(e.target.value)}
          />
        </div>

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
          autoComplete="new-password"
          className="w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base text-[#000] placeholder-[#7A7A7A] caret-[#1E90FF] mb-3"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          autoComplete="new-password"
          className="w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base text-[#000] placeholder-[#7A7A7A] caret-[#1E90FF]"
          placeholder="Повторите пароль"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <div className="text-[#7A7A7A] text-[12px] mt-2">
          Нажимая <span className="text-[#1E90FF]">«Зарегистрироваться»</span>, вы соглашаетесь с условиями
          <span className="text-[#1E90FF]"> Пользовательского соглашения</span> и
          <span className="text-[#1E90FF]"> Политики конфиденциальности</span>.
        </div>
        <div className="text-center mt-3">
          <Link to="/auth/login" className="text-[#1E90FF] font-sf text-[14px]">Уже есть аккаунт? Войти</Link>
        </div>
        {error && <div className="text-center text-red-500 text-sm mt-2">{error}</div>}
        {info && <div className="text-center text-green-600 text-sm mt-2">{info}</div>}

        {/* Spacer to avoid overlay by bottom button */}
        <div className="h-24" />
      </form>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-6">
        <button
          type="submit"
          form="signupForm"
          disabled={loading}
          className="w-full bg-[#1E90FF] text-white rounded-[14px] py-3 text-[16px] font-sf disabled:opacity-50"
        >
          {loading ? "Регистрируем…" : "Зарегистрироваться"}
        </button>
      </div>
    </div>
  );
}