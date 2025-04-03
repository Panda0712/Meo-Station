import { Minus, Plus } from "lucide-react";

const NightSelector = ({ nights, handleChangeNight }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-[4px] w-full shadow-sm">
      <button
        onClick={() => handleChangeNight((prev) => Math.max(1, prev - 1))}
        className="bg-red-500 cursor-pointer text-white w-10 h-10 flex items-center justify-center rounded-[4px] hover:bg-red-600 transition"
      >
        <Minus strokeWidth={3} size={20} />
      </button>
      <span className="text-[16px] font-medium text-blue-900">
        {nights} đêm
      </span>
      <button
        onClick={() => handleChangeNight((prev) => prev + 1)}
        className="bg-teal-500 cursor-pointer text-white w-10 h-10 flex items-center justify-center rounded-[4px] hover:bg-teal-600 transition"
      >
        <Plus strokeWidth={3} size={20} />
      </button>
    </div>
  );
};

export default NightSelector;
