import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { TIME_SLOTS } from "~/utils/constants";
import { isSameDate } from "~/utils/formatters";

const TimeSlotSelector = ({
  selectedSlot,
  selectedDate,
  disabledDayRangesHours,
  disabledNightRangesHours,
  onChange,
  disabled,
}) => {
  const [day, setDay] = useState(null);
  const [nightCheckIn, setNightCheckIn] = useState(null);
  const [nightCheckOut, setNightCheckOut] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (slot) => {
    if (day || nightCheckIn || nightCheckOut) {
      if (day?.startTime === slot.startTime && day?.endTime === slot.endTime) {
        return;
      }
      if (nightCheckIn?.startTime === slot.startTime) {
        return;
      }
      if (nightCheckOut?.endTime === slot.startTime) {
        return;
      }
    }

    onChange(slot);
    setIsOpen(false);
  };

  const handleResetType = (type) => {
    if (type === "day") {
      setNightCheckIn(null);
      setNightCheckOut(null);
    } else if (type === "nightCheckIn") {
      setDay(null);
      setNightCheckOut(null);
    } else if (type === "nightCheckOut") {
      setDay(null);
      setNightCheckIn(null);
    }
  };

  const handleReset = () => {
    setDay(null);
    setNightCheckIn(null);
    setNightCheckOut(null);
  };

  const isDayRangesHoursContainsSelectedDate = disabledDayRangesHours.some(
    (day) => isSameDate(day.from, selectedDate)
  );
  const isNightRangesHoursContainsSelectedDateCheckIn =
    disabledNightRangesHours.some((night) =>
      isSameDate(night.from, selectedDate)
    );
  const isNightRangesHoursContainsSelectedDateCheckOut =
    disabledNightRangesHours.some((night) =>
      isSameDate(night.to, selectedDate)
    );

  useEffect(() => {
    handleReset();
    if (isDayRangesHoursContainsSelectedDate) {
      setDay(
        disabledDayRangesHours.find((day) => isSameDate(day.from, selectedDate))
      );
      handleResetType("day");
    }
    if (isNightRangesHoursContainsSelectedDateCheckIn) {
      setNightCheckIn(
        disabledNightRangesHours.find((night) =>
          isSameDate(night.from, selectedDate)
        )
      );
      handleResetType("nightCheckIn");
    }
    if (isNightRangesHoursContainsSelectedDateCheckOut) {
      setNightCheckOut(
        disabledNightRangesHours.find((night) =>
          isSameDate(night.to, selectedDate)
        )
      );
      handleResetType("nightCheckOut");
    }
  }, [
    disabledDayRangesHours,
    disabledNightRangesHours,
    selectedDate,
    isDayRangesHoursContainsSelectedDate,
    isNightRangesHoursContainsSelectedDateCheckIn,
    isNightRangesHoursContainsSelectedDateCheckOut,
  ]);

  const disabledText = "❌ (đã có người đặt)";
  const opacityDisabled = "opacity-50 cursor-not-allowed";

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center justify-between px-4 h-10 bg-gray-100 
        rounded-lg cursor-pointer shadow-sm hover:bg-gray-200 transition ${
          disabled && "opacity-50"
        }`}
        onClick={() => setIsOpen((prev) => (disabled ? false : !prev))}
      >
        <span className="text-[#152C5B] font-medium text-[16px]">
          {selectedSlot?.label ||
            `Chọn khung giờ ${disabled ? "(chọn ngày trước)" : ""}`}
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
              } ${
                day &&
                slot.startTime === day.startTime &&
                slot.endTime === day.endTime &&
                opacityDisabled
              } ${
                nightCheckIn &&
                slot.startTime === nightCheckIn.startTime &&
                opacityDisabled
              } ${
                nightCheckOut &&
                slot.startTime === nightCheckOut.endTime &&
                opacityDisabled
              }`}
              onClick={() => handleSelect(slot)}
            >
              {slot.label}{" "}
              {day &&
                slot.startTime === day.startTime &&
                slot.endTime === day.endTime &&
                disabledText}{" "}
              {nightCheckIn && slot.startTime === "20:00" && disabledText}
              {nightCheckOut && slot.startTime === "12:00" && disabledText}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeSlotSelector;
