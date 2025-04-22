import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { TIME_SLOTS } from "~/utils/constants";

const TimeSlotSelector = ({ selectedSlot, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (slot) => {
    onChange(slot);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-[300px]">
      <div
        className="flex items-center justify-between px-4 h-10 bg-gray-100 
        rounded-lg cursor-pointer shadow-sm hover:bg-gray-200 transition"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-[#152C5B] font-medium text-[16px]">
          {selectedSlot?.label || "Chọn khung giờ"}
        </span>
        <ChevronDown size={20} className="text-[#152C5B]" />
      </div>

      {isOpen && (
        <ul className="absolute z-20 w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          {TIME_SLOTS.map((slot) => (
            <li
              key={slot.label}
              className={`px-4 py-3 hover:bg-[#f0f4ff] text-[#152C5B] cursor-pointer transition ${
                selectedSlot?.label === slot.label
                  ? "bg-[#e0eaff] font-semibold"
                  : ""
              }`}
              onClick={() => handleSelect(slot)}
            >
              {slot.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeSlotSelector;
