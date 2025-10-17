import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import { LeftArrow } from "@/assets/icons";

export default function CodeVerify() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const phone = params.get("phone") || "";
  const dispatch = useAppDispatch();

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(30);
  const [resending, setResending] = useState(false);
  const isValidE164 = (p: string) => /^\+[1-9]\d{7,14}$/.test(p);
  const isPhoneValid = isValidE164(phone);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = setInterval(() => setResendIn((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [resendIn]);

  const handleChange = (index: number, value: string) => {
    // Accept only a single digit
    if (/^\d?$/.test(value)) {
      const next = [...digits];
      next[index] = value;
      setDigits(next);
      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        // Clear current input
        const next = [...digits];
        next[index] = "";
        setDigits(next);
        return;
      }
      // Move focus to previous input
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isPhoneValid) {
      setError("Номер некорректен. Вернитесь и введите номер полностью.");
      return;
    }
    const token = digits.join("");
    if (token.length < 6) {
      setError("Введите 6-значный код из СМС");
      return;
    }
    if (!supabase) {
      setError("Supabase не настроен");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });
      if (error) throw error;
      if (!data.session) throw new Error("Сессия не получена");
      localStorage.setItem("accessToken", data.session.access_token);
      localStorage.setItem("refreshToken", data.session.refresh_token);
      dispatch(
        setCredentials({
          access: data.session.access_token,
          refresh: data.session.refresh_token,
        })
      );
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;

      // Save phone number to profile
      try {
        if (uid && phone) {
          await supabase.from("profiles").upsert({ id: uid, phone_number: phone });
        }
      } catch (e: any) {
        console.warn("Не удалось записать phone_number в profiles:", e?.message || e);
      }

      const meta = userData.user?.user_metadata || {};
      if (meta.first_name && meta.last_name) {
        navigate({ to: "/" });
      } else {
        navigate({ to: "/auth/register" });
      }
    } catch (err: any) {
      setError(err.message || "Не удалось подтвердить код");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (resendIn > 0 || resending) return;
    if (!isPhoneValid) {
      setError("Неверный формат номера. Используйте E.164, например +998901234567");
      return;
    }
    setError(null);
    setInfo(null);
    setResending(true);
    try {
      const { error } = await supabase!.auth.signInWithOtp({ phone, options: { channel: "sms" } });
      if (error) throw error;
      setInfo("Код отправлен повторно");
      setResendIn(30);
    } catch (err: any) {
      const msg = err?.message || "Не удалось отправить код повторно";
      const hint = msg.includes("disabled") || msg.includes("provider")
        ? " Проверьте Phone Auth/Twilio настройки в Supabase."
        : "";
      setError(msg + hint);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back */}
      <div className="fixed top-0 left-0 right-0 bg-background flex items-center justify-between px-5 py-5 rounded-e-xl">
        <button type="button" onClick={() => navigate({ to: "/auth/phone" })} className="flex items-center text-[#1E90FF]">
          <LeftArrow />
        </button>
        <div className="font-sf text-[20px] font-[600] text-[#000]">Введите код</div>
        <div style={{ width: 30, height: 30 }} />
      </div>

      {/* Content */}
      <form onSubmit={verify} className="flex-1 px-5 pt-24 pb-24 max-w-sm mx-auto w-full" id="verifyForm">
        <div className="flex items-center justify-between gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-12 text-center bg-[#fff] border border-[#E5E7EB] rounded-[14px] text-lg text-[#000] caret-[#1E90FF]"
              type="tel"
              inputMode="numeric"
              maxLength={1}
            />
          ))}
        </div>

        <div className="text-center text-[#7A7A7A] text-[12px] mt-3">
          Мы отправили вам сообщение с кодом подтверждения
        </div>
        <div className="text-center text-[#7A7A7A] text-[12px]">Номер: {phone || "не указан"}</div>
        <div className="text-center mt-2">
          <button type="button" onClick={() => navigate({ to: "/auth/phone" })} className="text-[#1E90FF] font-sf text-[14px]">
            Изменить номер
          </button>
        </div>
        {error && <div className="text-center text-red-500 text-sm mt-2">{error}</div>}
        {info && <div className="text-center text-green-600 text-sm mt-2">{info}</div>}
        <div className="text-center text-[12px] mt-3">
          {resendIn > 0 ? (
            <span className="text-[#7A7A7A]">Повторная отправка через {resendIn} с</span>
          ) : (
            <button
              type="button"
              onClick={resend}
              disabled={resending || !isPhoneValid}
              className="text-[#1E90FF] font-sf text-[14px] disabled:opacity-50"
            >
              {resending ? "Отправляем…" : "Отправить код повторно"}
            </button>
          )}
        </div>
        {/* Spacer to avoid overlay by bottom button */}
        <div className="h-24" />
      </form>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-6">
        <button
          type="submit"
          form="verifyForm"
          disabled={loading || !isPhoneValid}
          className="w-full bg-[#1E90FF] text-white rounded-[14px] py-3 text-[16px] font-sf disabled:opacity-50"
        >
          {loading ? "Подтверждаем…" : "Подтвердить"}
        </button>
      </div>
    </div>
  );
}