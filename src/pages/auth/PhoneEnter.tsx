import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";
import VectorLogo from "@/assets/logo/Vector.svg";

export default function PhoneEnter() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("+998");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^\+\d{7,15}$/.test(phone)) {
      setError("Введите номер в формате +998XXXXXXXXX");
      return;
    }
    if (!supabase) {
      setError("Supabase не настроен");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: { channel: "sms" },
      });
      if (error) throw error;
      navigate({ to: "/auth/verify", search: { phone } });
    } catch (err: any) {
      setError(err.message || "Не удалось отправить код");
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
      <form onSubmit={requestOtp} className="flex-1 px-5 pt-24 pb-24 max-w-sm mx-auto w-full" id="phoneForm">
        <div className="text-center font-sf text-[20px] font-[600] text-[#000] mb-4">Введите свой номер</div>

        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className="w-full bg-[#fff] border border-[#E5E7EB] rounded-[14px] px-3 py-3 text-base text-[#000] placeholder-[#7A7A7A] caret-[#1E90FF]"
          placeholder="+998"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="text-center text-[#7A7A7A] text-[12px] mt-2">
          Мы пришлем сообщение с кодом подтверждения
        </div>
        {error && <div className="text-center text-red-500 text-sm mt-2">{error}</div>}

        {/* Spacer to avoid overlay by bottom button */}
        <div className="h-24" />
      </form>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-6">
        <button
          type="submit"
          form="phoneForm"
          disabled={loading}
          className="w-full bg-[#1E90FF] text-white rounded-[14px] py-3 text-[16px] font-sf disabled:opacity-50"
        >
          {loading ? "Отправляем…" : "Далее"}
        </button>
      </div>
    </div>
  );
}