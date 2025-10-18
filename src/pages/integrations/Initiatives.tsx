import React from "react";
import InitiativesCard from "@/components/InitiativesCard";
import { LeftArrow, FilterIcon } from "@/assets/icons";

export default function Initiatives() {
  return (
    <div className="">
      <div className="fixed top-0 left-0 right-0 bg-[#F2F2F2] flex items-center justify-between px-5 py-5 lg:px-6 rounded-e-xl">
        <div className="flex items-center gap-2 text-2xl font-bold text-[#000] font-sans">
          <LeftArrow />
        </div>
        <h1 className="font-sf font-[500] text-[24px] text-[#000]">
          Иннициативы
        </h1>
        <div>
          <FilterIcon width={30} height={30} />
        </div>
      </div>
      <div>
        <InitiativesCard showVoting showLink={false} />
      </div>
    </div>
  );
}
