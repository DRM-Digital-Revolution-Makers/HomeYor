import React from "react";

const SpecialistCard: React.FC = () => {
  return (
    <div className="bg-[#fff] min-w-[300px] max-w-md w-full p-4 rounded-[30px] gap-4 mt-4">
      <h2 className=" font-sf text-lg text-[#000] font-[510] mb-">
        Важные оповещения
      </h2>
      <div className=" text-[#000] bg-[#EEEEEE] min-w-[300px] max-w-md w-full p-3 h-28 flex flex-col items-center justify-center rounded-[30px]">
        Оповещений пока нет
      </div>
    </div>
  );
};

export default SpecialistCard;
