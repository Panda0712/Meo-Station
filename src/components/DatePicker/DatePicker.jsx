import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { BOOKING_MODE } from "~/utils/constants";

const DateRangePicker = ({
  toggleOpen,
  range,
  mode,
  isOpen,
  handleSelect,
  disabledDates,
}) => {
  return (
    <div className="relative w-full">
      <div
        className="flex justify-center items-center h-10 bg-gray-100 rounded-lg cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="bg-[#152C5B] p-2 absolute left-0 top-0 rounded-md ">
          <Calendar className="text-white" size={24} strokeWidth={2.5} />
        </div>
        <p className="text-[#152C5B] md:text-[16px] text-[14px] font-medium text-center">
          {range.from && range.to
            ? `${format(range.from, "dd MMM")} - ${format(range.to, "dd MMM")}`
            : "Chọn ngày"}
        </p>
      </div>

      {isOpen && mode === BOOKING_MODE.night && (
        <div className="absolute z-10 right-0 bg-white shadow-md p-4 rounded-md min-w-[680px]">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={disabledDates}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
