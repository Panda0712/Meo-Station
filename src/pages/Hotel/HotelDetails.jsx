import { Spin } from "antd";
import { differenceInDays } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import bathroom from "~/assets/images/bathroom.png";
import bedroom from "~/assets/images/bedroom.png";
import coldMachine from "~/assets/images/coldMachine.png";
import diningRoom from "~/assets/images/diningRoom.png";
import internet from "~/assets/images/internet.png";
import livingRoom from "~/assets/images/livingRoom.png";
import refrigerator from "~/assets/images/refrigerator.png";
import TV from "~/assets/images/TV.png";
import Button from "~/components/Button/Button";
import DateRangePicker from "~/components/DatePicker/DatePicker";
import DateSelect from "~/components/DayPicker/DayPicker";
import GuestSelector from "~/components/GuestSelector/GuestSelector";
import NightSelector from "~/components/NightSelector/NightSelector";
import TimeSlotSelector from "~/components/TimeSlotSelector/TimeSlotSelector";
import Introduce from "~/pages/Homepage/Introduce/Introduce";
import HotelComments from "~/pages/Hotel/HotelComments/HotelComments";
import {
  fetchHotelDetailsAPI,
  selectActiveHotel,
} from "~/redux/activeHotel/activeHotelSlice";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";
import { BOOKING_MODE } from "~/utils/constants";
import {
  formatVND,
  interceptorLoadingElements,
  toVNISOString,
} from "~/utils/formatters";

const imagesMap = {
  bedroom,
  livingRoom,
  bathroom,
  diningRoom,
  internet,
  coldMachine,
  refrigerator,
  TV,
};

const HotelDetails = () => {
  const [range, setRange] = useState({ from: null, to: null });
  const [isOpen, setIsOpen] = useState(false);
  const [nights, setNights] = useState(2);
  const [bookingMode, setBookingMode] = useState(BOOKING_MODE.night);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [loading, setLoading] = useState(false);

  const { hotelId } = useParams();

  const currentUser = useSelector(selectCurrentUser);
  const activeHotel = useSelector(selectActiveHotel);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nightMode = bookingMode === BOOKING_MODE.night;
  const dayMode = bookingMode === BOOKING_MODE.day;
  const disabledButton =
    !guestCount || dayMode
      ? !selectedDate || !selectedTimeSlot
      : !nights || !range.from || !range.to;
  const totalPrice =
    nightMode && !disabledButton
      ? activeHotel?.pricePerNight * nights - activeHotel?.discount
      : activeHotel?.priceEachHour * 3 -
        activeHotel?.discount -
        (activeHotel?.priceEachHour - activeHotel?.priceFirstHour);
  const priceText = nightMode
    ? `${nights} đêm`
    : `khung giờ ${selectedTimeSlot.label || "8h - 11h"}`;

  const handleSubmit = () => {
    if (range.from && range.to) {
      if (range.from === range.to) {
        toast.error(
          "Vui lòng chọn 2 ngày khác nhau!!! Nếu cùng 1 ngày, hãy đặt phòng theo ngày!!!"
        );
        return;
      }

      const numberOfNights = differenceInDays(range.to, range.from) || 1;
      if (numberOfNights !== nights) {
        toast.error("Vui lòng chọn đúng số đêm!!!");
        return;
      }
    }

    if (!guestCount) {
      toast.error("Vui lòng chọn số khách!!!");
      return;
    }

    const checkInOutDate = {
      checkInDate: nightMode
        ? toVNISOString(range.from, "20:00")
        : toVNISOString(selectedDate, selectedTimeSlot.startTime),
      checkOutDate: nightMode
        ? toVNISOString(range.to, "12:00")
        : toVNISOString(selectedDate, selectedTimeSlot.endTime),
    };

    const bookingDataTemplate = {
      userId: currentUser?._id,
      userEmail: currentUser?.email,
      hotelId: activeHotel?._id,
      hotelName: activeHotel?.title,
      hotelLocation: activeHotel?.location,
      hotelImages: activeHotel?.images,
      guest: guestCount,
      totalPrice,
      mode: bookingMode,
      checkInDate: checkInOutDate.checkInDate,
      checkOutDate: checkInOutDate.checkOutDate,
    };

    const bookingData = nightMode
      ? {
          ...bookingDataTemplate,
          numberOfNights: nights,
        }
      : bookingDataTemplate;

    localStorage.setItem("booking-data", JSON.stringify(bookingData));
    navigate("/booking/info");
  };

  const handleChangeGuestCount = (value) => setGuestCount(value);

  const handleChangeBookingMode = (value) => setBookingMode(value);

  const handleChangeNight = (value) => setNights(value);

  const handleSelect = (selectedRange) => {
    setRange(selectedRange);
    setIsOpen(false);

    if (selectedRange.from && selectedRange.to) {
      const numberOfNights =
        differenceInDays(selectedRange.to, selectedRange.from) || 1;
      setNights(numberOfNights);
    }
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchHotelDetailsAPI(hotelId)).then(() => setLoading(false));
  }, [dispatch, hotelId]);

  useEffect(() => {
    interceptorLoadingElements(disabledButton);
  }, [disabledButton]);

  const imageStyle =
    "object-cover rounded-[15px] basis-[calc(100%-5px)] h-[calc(50%-5px)]";
  const hoverImageStyle = "transition transform hover:translate-y-[-5px]";

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <section className="px-24 py-16 relative w-full">
      <h2 className="absolute left-[96px]">
        Trang chủ /
        <span className="text-[#152C5B] font-semibold">Chi tiết phòng</span>
      </h2>
      <div className="mx-auto mb-12">
        <h4 className="text-center font-semibold text-[36px] text-[#152C5B]">
          {activeHotel?.title}
        </h4>
        <p className="text-center text-[18px] font-light text-[#b0b0b0]">
          {activeHotel?.location}
        </p>
      </div>

      <div className="flex gap-[10px]">
        <div className="max-h-[500px] basis-[calc(60%-5px)]">
          <img
            className={`object-cover w-full h-full rounded-[15px] ${hoverImageStyle}`}
            src={activeHotel?.images[0]}
            alt=""
          />
        </div>
        <div className="max-h-[500px] gap-[10px] flex flex-wrap basis-[calc(40%-5px)]">
          <img
            className={`${imageStyle} ${hoverImageStyle}`}
            src={activeHotel?.images[1]}
            alt=""
          />
          <img
            className={`${imageStyle} ${hoverImageStyle}`}
            src={activeHotel?.images[2]}
            alt=""
          />
        </div>
      </div>

      <div className="mt-12 flex gap-16">
        <div className="basis-[calc(65%-32px)]">
          <h5 className="text-[#152C5B] font-medium text-[20px] mb-3">
            Giới thiệu phòng
          </h5>
          <p className="max-w-[600px] text-[16px] font-light text-[#b0b0b0]">
            {activeHotel?.description}
          </p>

          <div className="grid grid-cols-4 gap-4 mt-8">
            {activeHotel?.utilities.map((item) => (
              <div key={item.type} className="flex flex-col gap-1">
                <img
                  className="w-[38px] h-[38px]"
                  src={imagesMap[item.type]}
                  alt={item.type}
                />
                <p className="text-[16px]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="basis-[calc(35%-32px)] flex items-center justify-center min-h-[550px] rounded-xl border-[2px] border-gray-200">
          <div>
            <h5 className="text-[#152C5B] font-medium text-[20px] mb-3">
              Tiến hành đặt phòng
            </h5>
            <p className="text-[36px]">
              <span className="text-[#1ABC9C] font-medium">
                {formatVND(activeHotel?.pricePerNight - activeHotel?.discount)}đ
              </span>
              <span className="text-[#b0b0b0] font-[300]"> mỗi đêm</span>
            </p>

            <div className="flex items-center justify-between gap-3 py-5">
              <div
                className="flex items-center gap-2"
                onClick={() => handleChangeBookingMode(BOOKING_MODE.night)}
              >
                <input
                  type="radio"
                  id="night"
                  name="mode-booking"
                  onChange={() => handleChangeBookingMode(BOOKING_MODE.night)}
                  checked={nightMode}
                />
                <label htmlFor="night" className="text-[18px]">
                  Đặt theo đêm
                </label>
              </div>
              <div
                className="flex items-center gap-2"
                onClick={() => handleChangeBookingMode(BOOKING_MODE.day)}
              >
                <input
                  type="radio"
                  id="day"
                  name="mode-booking"
                  onChange={() => handleChangeBookingMode(BOOKING_MODE.day)}
                  checked={dayMode}
                />
                <label htmlFor="day" className="text-[18px]">
                  Đặt trong ngày
                </label>
              </div>
            </div>

            <div>
              <h6 className="text-[16px] text-[#152C5B] mb-3">Số khách</h6>
              <GuestSelector
                maxGuest={activeHotel?.maxGuest}
                guestCount={guestCount}
                handleChangeGuestCount={handleChangeGuestCount}
              />
            </div>

            {nightMode ? (
              <div>
                <div className="mb-7 mt-5">
                  <h6 className="text-[16px] text-[#152C5B] mb-3">
                    Bạn sẽ ở trong bao lâu?
                  </h6>
                  <NightSelector
                    nights={nights}
                    handleChangeNight={handleChangeNight}
                  />
                </div>

                <div>
                  <h6 className="text-[16px] text-[#152C5B] mb-3">Chọn ngày</h6>
                  <DateRangePicker
                    toggleOpen={toggleOpen}
                    mode={bookingMode}
                    range={range}
                    isOpen={isOpen}
                    handleSelect={handleSelect}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-7 mt-5">
                  <h6 className="text-[16px] text-[#152C5B] mb-3">
                    Chọn khung giờ
                  </h6>
                  <TimeSlotSelector
                    selectedSlot={selectedTimeSlot}
                    onChange={setSelectedTimeSlot}
                  />
                </div>
                <div>
                  <h6 className="text-[16px] text-[#152C5B] mb-3">Chọn ngày</h6>
                  <DateSelect
                    isOpen={isOpen}
                    toggleOpen={toggleOpen}
                    mode={bookingMode}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
              </div>
            )}

            <p className="text-[16px] mt-4 font-light text-[#b0b0b0]">
              Bạn sẽ trả{" "}
              <span className="font-medium text-[#152c5b]">
                {formatVND(totalPrice)}đ
              </span>{" "}
              cho{" "}
              <span className="font-medium text-[#152c5b]">{priceText}</span>
            </p>

            <Button
              onClick={handleSubmit}
              disabled={disabledButton}
              title="Tiếp tục đặt phòng"
              style={`interceptor-loading w-full mt-12 text-[18px] py-3 font-medium shadow-lg ${
                disabledButton && "bg-slate-300 cursor-default"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="mt-24 mb-20">
        <HotelComments hotelId={hotelId} />
      </div>

      <div className="mt-24 mb-20">
        <Introduce title="Lựa chọn hot" />
      </div>
    </section>
  );
};

export default HotelDetails;
