import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { BOOKING_MODE } from "~/utils/constants";

const DateSelect = ({
  selectedDate,
  mode,
  isOpen,
  toggleOpen,
  setSelectedDate,
  disabledDates,
}) => {
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex justify-center items-center h-10 bg-gray-100 rounded-lg cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="bg-[#152C5B] p-2 absolute left-0 top-0 rounded-md ">
          <Calendar className="text-white" size={24} strokeWidth={2.5} />
        </div>
        <p className="text-[#152C5B] text-[16px] font-medium text-center">
          {selectedDate ? `${format(selectedDate, "dd MMM")}` : "Chọn ngày"}
        </p>
      </div>
      {isOpen && mode === BOOKING_MODE.day && (
        <div className="absolute z-10 right-0 bg-white shadow-md p-4 rounded-md min-w-[350px]">
          <DayPicker
            selected={selectedDate}
            onDayClick={handleDateChange}
            disabled={disabledDates}
          />
        </div>
      )}
    </div>
  );
};

export default DateSelect;
