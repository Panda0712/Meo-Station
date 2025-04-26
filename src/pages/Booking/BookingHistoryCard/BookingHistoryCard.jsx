import { Ban, CircleCheckBig, CircleDot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "~/components/Button/Button";
import { ORDER_STATUS } from "~/utils/constants";
import { formatDate } from "~/utils/formatters";

const BookingHistoryCard = ({ booking }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between gap-8 border-1 border-gray-300 rounded-2xl p-[40px]">
      <div className="flex gap-5 relative">
        <img
          src={booking?.hotelImages?.[0]}
          className="w-[400px] h-[350px] object-cover rounded-xl"
          alt=""
        />
        <div className="flex flex-col">
          <div>
            <h6 className="text-[20px] font-medium text-[#152c5b]">
              Phòng: {booking?.hotelName}
            </h6>
            <p className="text-[18px] text-[#b0b0b0] font-light mb-2">
              Địa chỉ: {booking?.hotelLocation}
            </p>
            <p className="text-[22px] text-[#152c5b] font-semibold flex items-center gap-2">
              <span className="font-normal">Giá theo đêm:</span>
              <span>{booking?.hotel?.[0]?.pricePerNight}đ</span>
            </p>
          </div>

          <Button
            onClick={() => navigate(`/hotels/${booking?.hotelId}`)}
            title="Đặt phòng lần nữa"
            style="mt-5 text-[14px]"
          />
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
            className={`text-[14px] 
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
          <h5 className="text-[18px] font-medium text-[#b0b0b0]">
            Mã đơn đặt phòng
          </h5>
          <p className="text-[18px] font-medium text-[#152c5b]">
            #{booking?._id}
          </p>
        </div>
        <div className="flex items-center gap-8">
          <div>
            <h5 className="text-[18px] font-medium text-[#b0b0b0]">
              Ngày Check-In
            </h5>
            <p className="text-[18px] font-medium text-[#152c5b]">
              {formatDate(booking?.checkInDate)}
            </p>
          </div>
          <div className="border-l-1 border-gray-300 pl-5">
            <h5 className="text-[18px] font-medium text-[#b0b0b0]">
              Ngày Check-Out
            </h5>
            <p className="text-[18px] font-medium text-[#152c5b]">
              {formatDate(booking?.checkOutDate)}
            </p>
          </div>
        </div>
        <div className="border-b-1 border-gray-300 pb-5">
          <h5 className="text-[18px] font-medium text-[#b0b0b0]">
            Phương thức thanh toán
          </h5>
          <p className="text-[18px] font-medium text-[#152c5b]">
            {booking?.paymentMethod}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <h5 className="text-[20px] font-medium text-[#b0b0b0]">
            Tổng thanh toán:
          </h5>
          <p className="text-[20px] font-medium text-[#152c5b]">
            {booking?.totalPrice}đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryCard;
