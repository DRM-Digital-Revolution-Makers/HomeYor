import React, { useState } from "react";
import { HamburgerIcon, LogoIcon } from "@/assets/icons";
import BurgerMenu from "./BurgerMenu";
const Topbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-[#F2F2F2] flex items-center justify-between px-5 py-5 lg:px-6 rounded-e-xl z-20">
        <div className="flex items-center gap-2 text-2xl font-bold text-[#000] font-sans">
          <LogoIcon width={24} height={24} />
          <h1 className="font-sf text-[24px]">HomeYor</h1>
        </div>
        <button onClick={() => setMenuOpen(true)} className="lg:hidden">
          <HamburgerIcon width={30} height={30} />
        </button>
      </div>
      {/* BurgerMenu extracted component */}
      <BurgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Topbar;
