import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";
import VectorLogo from "@/assets/logo/Vector.svg";

export default function EmailEnter() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);

  const isEmail = (v: string) => /.+@.+\..+/.test(v);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!isEmail(email)) {
      setError("Введите корректный email");
      return;
    }
    if (!supabase) {
      setError("Supabase не настроен");
      return;
    }
    if (resendIn > 0) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // По умолчанию новый пользователь будет создан автоматически
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
      setInfo("Мы отправили код на почту. Введите его на следующем шаге.");
      setResendIn(60);
      navigate({ to: "/auth/email-verify?email=" + encodeURIComponent(email) });
    } catch (err: any) {
      const msg = err?.message || "Не удалось отправить код";
      const hint = msg.includes("template") || msg.includes("link")
        ? " Проверьте шаблон письма Magic Link в Supabase: используйте {{ .Token }} для отправки кода."
        : "";
      setError(msg + hint);
    } finally {
      setLoading(false);
      if (resendIn === 0) {
        const t = setInterval(() => {
          setResendIn((n) => {
            if (n <= 1) {
              clearInterval(t);
              return 0;
            }
            return n - 1;
          });
          return;
        }, 1000);
      }
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
      <form onSubmit={sendCode} className="flex-1 px-5 pt-24 pb-24 max-w-sm mx-auto w-full" id="emailEnterForm">
        <div className="text-center font-sf text-[20px] font-[600] text-[#000] mb-4">Вход/регистрация по коду Email</div>
        <input
          type="email"
          autoComplete="email"
          className="w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base text-[#000] placeholder-[#7A7A7A] caret-[#1E90FF] mb-3"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="text-[#7A7A7A] text-[12px]">
          Мы отправим вам 6-значный код на указанную почту.
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {info && <div className="text-green-600 text-sm mt-2">{info}</div>}
        {/* Spacer */}
        <div className="h-24" />
      </form>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-6">
        <button
          type="submit"
          form="emailEnterForm"
          disabled={loading || resendIn > 0}
          className="w-full bg-[#1E90FF] text-white rounded-[14px] py-3 text-[16px] font-sf disabled:opacity-50"
        >
          {loading ? "Отправляем…" : resendIn > 0 ? `Повторно через ${resendIn} с` : "Отправить код"}
        </button>
      </div>
    </div>
  );
}