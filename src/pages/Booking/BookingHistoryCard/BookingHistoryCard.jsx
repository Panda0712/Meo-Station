import { Ban, CircleCheckBig, CircleDot } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateBookingAPI } from "~/apis";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";
import { ORDER_STATUS } from "~/utils/constants";
import { formatDate } from "~/utils/formatters";

const BookingHistoryCard = ({ booking }) => {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const FIFTEEN_MINUTES = 15 * 60 * 1000;
  const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

  const bookingCheckInDate = booking?.checkInDate;
  const bookingCreatedAt = booking?.createdAt;

  const checkAvailableCancel = () => {
    const timeNow = new Date();
    const createdAtDiff = timeNow.getTime() - bookingCreatedAt;
    const checkInDiff =
      new Date(bookingCheckInDate).getTime() - timeNow.getTime();

    return (
      createdAtDiff <= FIFTEEN_MINUTES &&
      checkInDiff > 0 &&
      checkInDiff <= TWENTY_FOUR_HOURS
    );
  };

  const handleReset = () => {
    setOpenModal(false);
  };

  const handleAfterCUDNewBooking = () => {
    window.location.reload();
  };

  const handleCancelBooking = () => {
    const checkCancel = checkAvailableCancel();
    if (!checkCancel) {
      toast.error("Đã quá thời gian có thể hủy đặt phòng!!!");
      return;
    }

    const updateData = {
      status: ORDER_STATUS.CANCELLED,
    };

    toast
      .promise(updateBookingAPI(booking?._id, updateData), {
        pending: "Đang hủy đặt phòng...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Hủy đặt phòng thành công!!!");
          handleAfterCUDNewBooking();
        }
        handleReset();
      });
  };

  return (
    <div
      className="flex justify-between flex-wrap lg:flex-nowrap 
    gap-8 border-1 border-gray-300 rounded-2xl p-[40px]"
    >
      {openModal && (
        <Modal
          title="Hủy đơn đặt phòng"
          handleCloseModal={handleReset}
          modalStyle="w-[450px]"
        >
          <div className="mt-6 relative">
            <p className="text-black">Xác nhận hủy đơn đặt phòng này?</p>

            <div className="flex justify-end">
              <div className="flex items-center gap-2 mt-8">
                <Button
                  title="Trở lại"
                  type="cancel"
                  onClick={() => handleReset()}
                />
                <Button
                  title="Hủy"
                  type="warning"
                  onClick={handleCancelBooking}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      <div className="flex sm:flex-nowrap flex-wrap gap-5 relative">
        <img
          src={booking?.hotelImages?.[0]}
          className="sm:w-[400px] sm:h-[350px] 
          w-full h-[200px] object-cover rounded-xl"
          alt=""
        />
        <div className="flex flex-col">
          <div>
            <h6 className="md:text-[20px] sm:text-[18px] text-[16px] font-medium text-[#152c5b]">
              Phòng: {booking?.hotelName}
            </h6>
            <p className="md:text-[18px] sm:text-[16px] text-[14px] text-[#b0b0b0] font-light mb-2">
              Địa chỉ: {booking?.hotelLocation}
            </p>
            <p className="md:text-[22px] sm:text-[18px] text-[16px] text-[#152c5b] font-semibold flex items-center gap-2">
              <span className="font-normal">Giá theo đêm:</span>
              <span>{booking?.hotel?.[0]?.pricePerNight}đ</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(`/hotels/${booking?.hotelId}`)}
              title="Đặt phòng lần nữa"
              style="mt-5 md:text-[14px] text-[12px]"
            />
            {checkAvailableCancel() && (
              <Button
                onClick={() => setOpenModal(true)}
                title="Hủy đặt phòng"
                style="mt-5 md:text-[14px] text-[12px]"
              ></Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center gap-2 rounded-xl w-[120px] bg-[#f5f5f5] py-1 mb-4 shadow-sm">
          {booking?.status === ORDER_STATUS.COMPLETED && (
            <CircleCheckBig size={14} color="#1ABC9C" />
          )}
          {booking?.status === ORDER_STATUS.CANCELLED && (
            <Ban size={14} color="red" />
          )}
          {booking?.status === ORDER_STATUS.PENDING && (
            <CircleDot size={14} color="blue" />
          )}
          <span
            className={`md:text-[14px] text-[12px] 
          ${
            booking?.status === ORDER_STATUS.COMPLETED
              ? "text-[#1abc9c]"
              : booking?.status === ORDER_STATUS.CANCELLED
              ? "text-red-500"
              : booking?.status === ORDER_STATUS.PENDING
              ? "text-blue-500"
              : "text-[#152c5b]"
          } font-medium`}
          >
            {booking?.status}
          </span>
        </div>
        <div>
          <h5 className="md:text-[18px] sm:text-[16px] text-[14px] font-medium text-[#b0b0b0]">
            Mã đơn đặt phòng
          </h5>
          <p className="md:text-[18px] sm:text-[16px] text-[14px] font-medium text-[#152c5b]">
            #{booking?._id}
          </p>
        </div>
        <div className="flex items-center gap-8">
          <div>
            <h5 className="md:text-[18px] sm:text-[16px] text-[14px] font-medium text-[#b0b0b0]">
              Ngày Check-In
            </h5>
            <p className="md:text-[18px] sm:text-[16px] text-[14px] font-medium text-[#152c5b]">
              {formatDate(booking?.checkInDate)}
            </p>
          </div>
          <div className="border-l-1 border-gray-300 pl-5">
            <h5 className="md:text-[18px] sm:text-[16px] text-[14px] font-medium text-[#b0b0b0]">
              Ngày Check-Out
            </h5>
            <p className="md:text-[18px] sm:text-[16px] text-[14px] font-medium text-[#152c5b]">
              {formatDate(booking?.checkOutDate)}
            </p>
          </div>
        </div>
        <div className="border-b-1 border-gray-300 pb-5">
          <h5 className="md:text-[18px] sm:text-[16px] text-[14px] font-medium text-[#b0b0b0]">
            Phương thức thanh toán
          </h5>
          <p className="md:text-[18px] sm:text-[16px] text-[14px] font-medium text-[#152c5b]">
            {booking?.paymentMethod}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <h5 className="md:text-[20px] sm:text-[18px] text-[16px] font-medium text-[#b0b0b0]">
            Tổng thanh toán:
          </h5>
          <p className="md:text-[20px] sm:text-[18px] text-[16px] font-medium text-[#152c5b]">
            {booking?.totalPrice}đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryCard;
