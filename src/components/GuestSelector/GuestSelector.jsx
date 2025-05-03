import { ChevronDown } from "lucide-react";
import { useState } from "react";

const GuestSelector = ({ guestCount, maxGuest, handleChangeGuestCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (slot) => {
    handleChangeGuestCount(slot);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="flex items-center justify-between px-4 h-10 bg-gray-100 
          rounded-lg cursor-pointer shadow-sm hover:bg-gray-200 transition"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-[#152C5B] font-medium md:text-[16px] text-[14px]">
          {guestCount || "Chọn số khách"}
        </span>
        <ChevronDown size={20} className="text-[#152C5B]" />
      </div>

      {isOpen && (
        <ul className="absolute z-20 w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          {Array.from({ length: maxGuest }).map((_, index) => (
            <li
              key={index}
              className={`px-4 py-3 hover:bg-[#f0f4ff] text-[#152C5B] cursor-pointer transition ${
                guestCount === index + 1 ? "bg-[#e0eaff] font-semibold" : ""
              }`}
              onClick={() => handleSelect(index + 1)}
            >
              {index + 1} khách
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestSelector;
