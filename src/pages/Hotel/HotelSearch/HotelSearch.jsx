import { format } from "date-fns";
import {
  ArrowRight,
  CalendarRange,
  Minus,
  Plus,
  UsersRound,
} from "lucide-react";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import Button from "~/components/Button/Button";

const HotelSearch = ({
  guestCount,
  date,
  handleIncrementGuestCount,
  handleDecrementGuestCount,
  handleToggleDatePicker,
  handleChangeDateValue,
  handleSubmit,
}) => {
  const spanTextStyle =
    "md:text-[16px] sm:text-[14px] text-[12px] font-semibold";

  return (
    <div
      className="relative border-4 border-[#064749] md:h-[60px] pl-[30px] md:py-[6px] py-5
      md:pb-[6px] rounded-[40px] lg:max-w-[80%] max-w-full mx-auto 
    flex md:flex-row flex-col justify-between items-center gap-5"
    >
      <div className="flex items-center gap-2">
        <div className="relative flex items-center gap-2 cursor-pointer">
          <CalendarRange />
          <span
            className={spanTextStyle}
            onClick={() => handleToggleDatePicker("checkIn")}
          >
            {date["checkIn"]?.date
              ? `${format(date["checkIn"]?.date, "dd MMM")}`
              : "Check-In"}
          </span>

          {date["checkIn"].open && (
            <div className="absolute z-10 right-0 bottom-[-100px] p-4 pr-8 shadow-lg rounded-xl bg-white">
              <DatePicker
                onChange={(selectedDate) =>
                  handleChangeDateValue("checkIn", {
                    date: selectedDate,
                    open: false,
                  })
                }
                value={date["checkIn"].date}
                calendarClassName="custom-calendar"
                clearIcon={null}
                format="dd/MM/yyyy"
              />
            </div>
          )}
        </div>

        <ArrowRight />

        <div className="relative">
          <span
            className={`${spanTextStyle} cursor-pointer`}
            onClick={() => handleToggleDatePicker("checkOut")}
          >
            {date["checkOut"]?.date
              ? `${format(date["checkOut"]?.date, "dd MMM")}`
              : "Check-Out"}
          </span>

          {date["checkOut"].open && (
            <div className="absolute z-10 left-0 bottom-[-100px] p-4 shadow-lg rounded-xl bg-white">
              <DatePicker
                onChange={(selectedDate) =>
                  handleChangeDateValue("checkOut", {
                    date: selectedDate,
                    open: false,
                  })
                }
                value={date["checkOut"].date}
                calendarClassName="custom-calendar"
                clearIcon={null}
                format="dd/MM/yyyy"
              />
            </div>
          )}
        </div>
      </div>

      <div className="md:w-[2px] w-full md:h-full h-[2px] bg-[#49735a]" />

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <UsersRound fill="#000" />
          <span className={spanTextStyle}>Khách</span>
        </div>
        <div className="flex items-center gap-3">
          <Plus
            size={24}
            className="cursor-pointer"
            onClick={handleIncrementGuestCount}
          />
          <span className={spanTextStyle}>{guestCount}</span>
          <Minus
            size={24}
            className="cursor-pointer"
            onClick={handleDecrementGuestCount}
          />
        </div>
      </div>

      <div className="md:w-[2px] w-full md:h-full h-[3px] bg-[#49735a]" />

      <div>
        <Button
          title="Tìm kiếm"
          style="md:text-[16px] text-[14px]"
          onClick={handleSubmit}
          type="search"
        />
      </div>
    </div>
  );
};

export default HotelSearch;
