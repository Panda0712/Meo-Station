import { Spin } from "antd";
import { differenceInDays } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { checkVoucherAPI, fetchHotelsAPI, getAllBookingsAPI } from "~/apis";
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
import Input from "~/components/Input/Input";
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
  addMinusOneDayAtMidnight,
  formatHourMinute,
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
  const [loadingButton, setLoadingButton] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [voucher, setVoucher] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");

  const { hotelId } = useParams();

  const currentUser = useSelector(selectCurrentUser);
  const activeHotel = useSelector(selectActiveHotel);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listInDayBookings = bookings
    ?.filter((booking) => booking.mode === BOOKING_MODE.day)
    ?.map((booking) => ({
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
    }));
  const listInRangeBookings = bookings
    ?.filter((booking) => booking.mode === BOOKING_MODE.night)
    ?.map((booking) => ({
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
    }));

  const disabledDayRangesHours = listInDayBookings?.map((b) => ({
    from: new Date(b.checkInDate),
    to: new Date(b.checkOutDate),
    startTime: formatHourMinute(new Date(b.checkInDate)),
    endTime: formatHourMinute(new Date(b.checkOutDate)),
  }));
  const disabledDayRangesForNightBooking = listInDayBookings?.map((b) =>
    formatHourMinute(new Date(b.checkInDate)) === "20:00"
      ? { from: new Date(b.checkInDate), to: new Date(b.checkOutDate) }
      : null
  );

  const disabledNightRangesForNightBooking = listInRangeBookings?.map((b) => ({
    from: new Date(b.checkInDate),
    to: addMinusOneDayAtMidnight(new Date(b.checkOutDate), "minus"),
  }));
  const disabledNightsRangesForDayBooking = listInRangeBookings?.map((b) => ({
    from: addMinusOneDayAtMidnight(new Date(b.checkInDate), "plus"),
    to: addMinusOneDayAtMidnight(new Date(b.checkOutDate), "minus"),
  }));
  const disabledNightRangesHours = listInRangeBookings?.map((b) => ({
    from: new Date(b.checkInDate),
    to: new Date(b.checkOutDate),
    startTime: formatHourMinute(new Date(b.checkInDate)),
    endTime: formatHourMinute(new Date(b.checkOutDate)),
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pastDaysDisabled = { before: today };

  const nightMode = bookingMode === BOOKING_MODE.night;
  const dayMode = bookingMode === BOOKING_MODE.day;
  const disabledButton =
    !guestCount || dayMode
      ? !selectedDate || !selectedTimeSlot
      : !nights || !range.from || !range.to;
  const totalPrice = Math.max(
    nightMode && !disabledButton
      ? activeHotel?.pricePerNight * nights - activeHotel?.discount
      : activeHotel?.priceEachHour * 3 -
          activeHotel?.discount -
          (activeHotel?.priceEachHour - activeHotel?.priceFirstHour),
    0
  );
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

      if (nightMode) {
        const hasOverlap = disabledNightRangesForNightBooking.some(
          (disabled) => {
            return range.from <= disabled.to && range.to >= disabled.from;
          }
        );
        if (hasOverlap) {
          toast.error(
            "Khoảng thời gian bạn chọn đã có người đặt phòng. Vui lòng chọn khoảng thời gian khác!!!"
          );
          return;
        }
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
      totalPrice: voucher?.discount
        ? totalPrice - (totalPrice * voucher?.discount) / 100
        : totalPrice,
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
    if (voucher) localStorage.setItem("voucher-info", JSON.stringify(voucher));
    navigate("/booking/info");
  };

  const handleVoucherCode = () => {
    if (!voucherCode) {
      toast.error("Vui lòng nhập mã voucher!!!");
      return;
    }

    setLoadingButton(true);
    checkVoucherAPI({ code: voucherCode, hotelId })
      .then((res) => {
        if (!res.error) {
          setVoucher(res);
        }
      })
      .catch(() => setVoucher(null))
      .finally(() => setLoadingButton(false));
  };

  const handleChangeVoucherCode = (e) => setVoucherCode(e.target.value);

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
    dispatch(fetchHotelDetailsAPI(hotelId));
    getAllBookingsAPI().then((res) => {
      setBookings(res || []);
    });
    fetchHotelsAPI().then((res) => {
      setHotels(res.hotels || []);
      setLoading(false);
    });
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
    <section className="lg:px-24 md:px-12 px-8 py-16 relative w-full">
      <h2
        className="absolute md:left-[96px] md:translate-x-0 md:text-normal 
      text-center left-1/2 transform -translate-x-1/2"
      >
        Trang chủ /
        <span className="text-[#152C5B] font-semibold">Chi tiết phòng</span>
      </h2>
      <div className="mx-auto mb-12 lg:mt-0 mt-16">
        <h4
          className="text-center font-semibold lg:text-[36px] 
        md:text-[32px] sm:text-[28px] text-[24px] text-[#152C5B]"
        >
          {activeHotel?.title}
        </h4>
        <p
          className="text-center lg:text-[18px] md:text-[16px] 
        text-[14px] font-light text-[#b0b0b0]"
        >
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

      <div
        className="mt-12 flex lg:flex-nowrap max-[900px]:flex-col 
      flex-row flex-wrap gap-16"
      >
        <div className="basis-[calc(65%-32px)]">
          <h5 className="text-[#152C5B] font-medium md:text-[20px] text-[18px] mb-3">
            Giới thiệu phòng
          </h5>
          <p className="max-w-[600px] md:text-[16px] text-[14px] font-light text-[#b0b0b0]">
            {activeHotel?.description}
          </p>

          <div className="grid sm:grid-cols-4 grid-cols-3 gap-4 mt-8">
            {activeHotel?.utilities.map((item) => (
              <div key={item.type} className="flex flex-col gap-1">
                <img
                  className="md:w-[38px] md:h-[38px] w-[30px] h-[30px]"
                  src={imagesMap[item.type]}
                  alt={item.type}
                />
                <p className="md:text-[16px] sm:text-[14px] text-[12px]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="basis-[calc(35%-32px)] flex items-center justify-center 
        min-h-[550px] rounded-xl border-[2px] border-gray-200"
        >
          <div className="py-8 px-4">
            <h5
              className="text-[#152C5B] font-medium md:text-[20px] 
            sm:text-[18px] text-[16px] mb-3"
            >
              Tiến hành đặt phòng
            </h5>
            <p className="lg:text-[36px] md:text-[32px] sm:text-[24px] text-[20px]">
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
                <label
                  htmlFor="night"
                  className="md:text-[18px] sm:text-[16px] text-[14px]"
                >
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
                <label
                  htmlFor="day"
                  className="md:text-[18px] sm:text-[16px] text-[14px]"
                >
                  Đặt trong ngày
                </label>
              </div>
            </div>

            <div>
              <h6 className="md:text-[16px] text-[14px] text-[#152C5B] mb-3">
                Số khách
              </h6>
              <GuestSelector
                maxGuest={activeHotel?.maxGuest}
                guestCount={guestCount}
                handleChangeGuestCount={handleChangeGuestCount}
              />
            </div>

            {nightMode ? (
              <div>
                <div className="mb-7 mt-5">
                  <h6 className="md:text-[16px] text-[14px] text-[#152C5B] mb-3">
                    Bạn sẽ ở trong bao lâu?
                  </h6>
                  <NightSelector
                    nights={nights}
                    handleChangeNight={handleChangeNight}
                  />
                </div>

                <div>
                  <h6 className="md:text-[16px] text-[14px] text-[#152C5B] mb-3">
                    Chọn ngày
                  </h6>
                  <DateRangePicker
                    toggleOpen={toggleOpen}
                    mode={bookingMode}
                    range={range}
                    isOpen={isOpen}
                    handleSelect={handleSelect}
                    disabledDates={[
                      ...disabledNightRangesForNightBooking,
                      ...disabledDayRangesForNightBooking,
                      pastDaysDisabled,
                    ]}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-7 mt-5">
                  <h6 className="md:text-[16px] text-[14px] text-[#152C5B] mb-3">
                    Chọn khung giờ
                  </h6>
                  <TimeSlotSelector
                    selectedDate={selectedDate}
                    disabledDayRangesHours={disabledDayRangesHours}
                    disabledNightRangesHours={disabledNightRangesHours}
                    disabled={selectedDate !== "" ? false : true}
                    selectedSlot={selectedTimeSlot}
                    onChange={setSelectedTimeSlot}
                  />
                </div>
                <div>
                  <h6 className="md:text-[16px] text-[14px] text-[#152C5B] mb-3">
                    Chọn ngày
                  </h6>
                  <DateSelect
                    isOpen={isOpen}
                    toggleOpen={toggleOpen}
                    mode={bookingMode}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    disabledDates={[
                      ...disabledNightsRangesForDayBooking,
                      pastDaysDisabled,
                    ]}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center my-5">
              <Input
                name="voucher"
                value={voucherCode}
                content="Nhập mã voucher"
                onChange={handleChangeVoucherCode}
                style="sm:w-full w-full md:text-[16px]! text-[14px]!
                 rounded-tr-none rounded-br-none outline-none"
              />
              <Button
                title={loadingButton ? <Spin size="small" /> : "Áp dụng"}
                disabled={loadingButton}
                onClick={handleVoucherCode}
                style="h-[50px] md:text-[16px]! text-[14px]! 
                text-center py-0! px-2! w-[40%] rounded-tl-none rounded-bl-none"
              />
            </div>

            <p className="md:text-[16px] text-[14px] max-w-[300px] mt-4 font-light text-[#b0b0b0]">
              Bạn sẽ trả{" "}
              <span
                className={`font-medium text-[#152c5b] ${
                  voucher?.discount && "line-through"
                }`}
              >
                {formatVND(totalPrice)}đ
              </span>{" "}
              {voucher?.discount && (
                <span className="font-medium text-[#152c5b] text-[18px]">
                  {voucher?.discount
                    ? totalPrice - (totalPrice * voucher?.discount) / 100
                    : totalPrice}
                  đ
                </span>
              )}{" "}
              cho{" "}
              <span className="font-medium text-[#152c5b]">{priceText}</span>{" "}
            </p>

            <Button
              onClick={handleSubmit}
              disabled={disabledButton}
              title="Tiếp tục đặt phòng"
              style={`interceptor-loading w-full mt-12 md:text-[18px] 
                text-[16px] py-3 font-medium shadow-lg ${
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
        <Introduce title="Lựa chọn hot" filterList={hotels.slice(0, 4)} />
      </div>
    </section>
  );
};

export default HotelDetails;
