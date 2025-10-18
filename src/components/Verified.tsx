import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";

const Verified = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [emailText, setEmailText] = useState<string | null>(null);
  const [nameText, setNameText] = useState<string | null>(null);
  const [hackMode, setHackMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProfile = async () => {
      const client = supabase;
      if (!client) {
        setLoading(false);
        return;
      }
      try {
        const { data: userData } = await client.auth.getUser();
        const uid = userData.user?.id;
        const email = userData.user?.email || "";
        const HACKATHON_EMAIL = (import.meta.env.VITE_HACKATHON_EMAIL || "hackathon@testmail.com").toLowerCase();
        const isHackathon = email.toLowerCase() === HACKATHON_EMAIL;
        if (!uid) {
          setLoading(false);
          return;
        }
        if (isHackathon) {
          setHackMode(true);
          // Статичные данные для версии хактона
          setNameText("hackathon");
          setEmailText("hackathon@testmail.com");
          setAddress("квартал 2/1, 34, массив Каракамыш, Алмазарский район, Ташкент");
          // Флаг верификации без показа личного телефона
          setPhone("hackathon");
          setLoading(false);
          return;
        }
        const { data, error } = await client
          .from("profiles")
          .select("phone_number, address")
          .eq("id", uid)
          .maybeSingle();
        if (error) throw error;
        setPhone((data as any)?.phone_number ?? null);
        setAddress((data as any)?.address ?? null);
      } catch (e) {
        console.warn("Не удалось получить профиль:", (e as any)?.message || e);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const verified = hackMode ? true : Boolean(phone);
  const checkColor = verified ? "#1E90FF" : "#FF6B6B";

  return (
    <div className="bg-[#fff] w-full p-4 rounded-[30px] gap-3">
      <div className="flex items-center text-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            opacity="0.5"
            d="M6.39507 2.1337C6.23274 2.27204 6.15156 2.34122 6.06487 2.39932C5.86614 2.53252 5.64294 2.62497 5.40823 2.67131C5.30584 2.69153 5.19952 2.70001 4.98688 2.71698C4.45263 2.75961 4.1855 2.78093 3.96264 2.85965C3.44717 3.04172 3.04172 3.44717 2.85965 3.96264C2.78093 4.1855 2.75962 4.45262..."
            fill={checkColor}
          />
          <path
            d="M10.9156 6.57516C11.1274 6.36327 11.1274 6.01973 10.9156 5.80785C10.7036 5.59595 10.3601 5.59595 10.1482 5.80785L6.9147 9.04137L5.85152 7.97811C5.63963 7.76624 5.29609 7.76624 5.08421 7.97811C4.87232 8.19004 4.87232 8.53357 5.08421 8.74544L6.53107 10.1923C6.74297 10.4042 7.0865 10.404..."
            fill={checkColor}
          />
        </svg>
        <span className="font-sf font-[200] text-base text-[#000] px-1">
          {verified ? "Верифицирован" : "Не верифицирован"}
        </span>
      </div>
      {/* Имя и почта (только для демо-режима) */}
      {hackMode && (
        <div className="mt-2 text-[#676767] text-[12px] font-sf">
          <div>Имя: {nameText}</div>
          <div>Почта: {emailText}</div>
        </div>
      )}
      <h2 className="font-sf text-lg text-[#000] font-[510]">
        {address ? address : "Адрес не указан"}
      </h2>
      {!address && (
        <div className="mt-3">
          <button
            className="w-full bg-[#1E90FF] text-white rounded-[14px] py-2 text-[14px] font-sf"
            onClick={() => navigate({ to: "/profile/address" })}
          >
            Добавить адрес
          </button>
        </div>
      )}
    </div>
  );
};

export default Verified;
