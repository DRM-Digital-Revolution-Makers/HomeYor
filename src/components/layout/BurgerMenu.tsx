import React from "react";
import {
  LeftArrow,
  RightArrow,
  ShieldIcon,
  DocumentCheckIcon,
  SettingsIcon,
  SupportIcon,
  InfoIcon,
  LogoutIcon,
} from "@/assets/icons";
import Verified from "../Verified";

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      } lg:hidden`}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          isOpen ? "opacity-40" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`absolute top-0 right-0 h-screen w-full bg-[#F2F2F2] shadow-xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-start p-5">
          <button onClick={onClose}>
            <LeftArrow />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-start h-full gap-8 px-4 text-xl font-sf text-black">
          <div className="user-info flex flex-col items-center gap-1">
            <h2 className="font-sf text-[20px] font-[600]">Джон Доуи</h2>
            <div className="flex items-center">
              <span className="font-sf text-[16px] font-[500] mr-1">Активист</span>
              <ShieldIcon width={24} height={24} />
            </div>
            <span className="font-sf text-[16px] font-[400]">+998(99)999-99-99</span>
          </div>

          <Verified />

          <div className="min-w-[300px] max-w-md w-full">
            <div className="bg-[#fff] p-4 rounded-[30px] gap-3 flex justify-between items-center">
              <div className="flex items-center justify-start">
                <DocumentCheckIcon width={24} height={24} />
                <span className="font-sf font-[500] text-lg text-[#000] px-1">
                  Верифицирован
                </span>
              </div>
              <div className="mr-2 mt-1">
                <RightArrow />
              </div>
            </div>
          </div>

          <div className="min-w-[300px] max-w-md w-full bg-[#fff] rounded-[30px]">
            <div className="p-4 gap-3 flex justify-between items-center">
              <div className="flex items-center justify-start">
                <SettingsIcon width={24} height={24} />
                <span className="font-sf font-[500] text-lg text-[#000] px-1">Настройки</span>
              </div>
              <div className="mr-2 mt-1">
                <RightArrow />
              </div>
            </div>
            <div className="p-4 gap-3 flex justify-between items-center">
              <div className="flex items-center justify-start">
                <SupportIcon width={20} height={20} />
                <span className="font-sf font-[500] text-lg text-[#000] px-1">Поддержка</span>
              </div>
              <div className="mr-2 mt-1">
                <RightArrow />
              </div>
            </div>
            <div className="p-4 gap-3 flex justify-between items-center">
              <div className="flex items-center justify-start">
                <InfoIcon width={24} height={24} />
                <span className="font-sf font-[500] text-lg text-[#000] px-1">Информация</span>
              </div>
              <div className="mr-2 mt-1">
                <RightArrow />
              </div>
            </div>
          </div>

          <div className="min-w-[300px] max-w-md w-full">
            <div className="bg-[#fff] p-4 rounded-[30px] gap-3 flex justify-between items-center">
              <div className="flex items-center justify-start">
                <LogoutIcon width={24} height={24} />
                <span className="font-sf font-[500] text-lg text-[#000] px-1">Выйти из Аккаунта</span>
              </div>
              <div className="mr-2 mt-1">
                <RightArrow />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenu;