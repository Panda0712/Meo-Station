import { CalendarMinus2, CircleAlert, UsersRound } from "lucide-react";
import BoxTimeline from "~/components/BoxTimeline/BoxTimeline";

const BookingCard = ({ orderInfo }) => {
  const bookingInfoStyle = {
    containerInfo:
      "p-[40px] border-[1px] border-t-0 rounded-bl-[30px] rounded-br-[30px] border-green-600",
    cardInfoContainer:
      "my-16 bg-[#F2F0F2] max-w-[522px] shadow-sm rounded-[30px] overflow-hidden",
    headingStyle: "text-[36px] text-[#152c5b] font-semibold text-center mb-1",
    textHeadingStyle: "text-[18px] font-semibold mb-3 text-[#181A18]",
    textRegularStyle: "text-[18px] text-[#181A18]",
  };

  return (
    <div className={bookingInfoStyle.cardInfoContainer}>
      <div className="relative">
        <img
          src={orderInfo.roomImage}
          className="w-full object-cover h-[282px]"
          alt=""
        />
      </div>

      <div className={bookingInfoStyle.containerInfo}>
        <div className="flex items-center gap-32">
          <div>
            <h5 className={bookingInfoStyle.textHeadingStyle}>Check In</h5>
            <div className="flex items-center gap-2">
              <CalendarMinus2 />
              <p className={bookingInfoStyle.textRegularStyle}>
                {orderInfo.checkInDate}
              </p>
            </div>
          </div>
          <div>
            <h5 className={bookingInfoStyle.textHeadingStyle}>Check Out</h5>
            <div className="flex items-center gap-2">
              <CalendarMinus2 />
              <p className={bookingInfoStyle.textRegularStyle}>
                {orderInfo.checkOutDate}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 mt-12">
          <div className="flex items-center gap-2">
            <UsersRound />
            <p className="text-[18px] font-semibold text-[#181A18]">Số Khách</p>
          </div>
          <p className="text-[18px] font-semibold text-[#181A18]">
            {orderInfo.guest}
          </p>
        </div>

        <div className="mt-12">
          <h5 className={bookingInfoStyle.textHeadingStyle}>
            Thời hạn thanh toán
          </h5>
          <div className="flex gap-5">
            <BoxTimeline />
            <div className="flex flex-col gap-5">
              <div className="flex gap-24">
                <div className="leading-[1.4]">
                  <h5 className="text-[18px] mb-1 text-[#181A18]">
                    Đặt trước phòng này
                  </h5>
                  <p className="text-[14px] text-[#181A18]">Ngay bây giờ</p>
                </div>
                <p className="text-[18px] mb-1 text-[#181A18]">
                  {orderInfo.totalPrice}.000đ
                </p>
              </div>
              <div className="leading-[1.4]">
                <h5 className="text-[18px] mb-1 text-[#181A18]">
                  Sau khi check-out
                </h5>
                <p className="text-[14px] text-[#181A18] flex items-center gap-2">
                  Hoàn trả 100% chi phí nếu có sự cố phát sinh{" "}
                  <span>
                    <CircleAlert className="fill-black text-white" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
