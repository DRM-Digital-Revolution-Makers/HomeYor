import React from "react";

const InitiativesCard: React.FC = () => {
  return (
    <div className="bg-[#fff] min-w-[300px] max-w-md w-full p-4 rounded-[30px] gap-4  mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-sf text-lg text-[#000] font-[510] ">
          Иннициативы в вашем двору
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M22 7H2"
            stroke="#1E90FF"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            opacity="0.5"
            d="M19 12H5"
            stroke="#1E90FF"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M16 17H8"
            stroke="#1E90FF"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-4">
        <div className="box w-full h-[100px] bg-[#EEE] col-span-6 rounded-[14px]"></div>
        <div className="box w-full h-[100px] bg-[#EEE] col-span-6 rounded-[14px]"></div>
        <div className="box w-full h-[100px] bg-[#EEE] rounded-[14px] col-span-6"></div>
        <div className="box w-full h-[100px] bg-[#EEE] rounded-[14px] col-span-6"></div>
        <button className="h-[45px] text-[#000] font-sf text-[16px] bg-[#EEE] rounded-[14px] col-span-12">
          Перейти к Иннициативам
        </button>
      </div>
    </div>
  );
};

export default InitiativesCard;
