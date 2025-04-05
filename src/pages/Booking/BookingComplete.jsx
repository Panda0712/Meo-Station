import { useNavigate } from "react-router-dom";
import bookingComplete from "~/assets/images/bookingComplete.png";
import Button from "~/components/Button/Button";

const BookingComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-5 my-16">
      <h2 className="text-[36px] text-[#152c5b] font-semibold text-center mb-1">
        Đặt phòng thành công
      </h2>
      <img src={bookingComplete} className="mt-4" alt="" />
      <p className="text-[18px] font-light mt-6 text-[#b0b0b0] text-center max-w-[400px]">
        Chúng tôi sẽ gửi thông tin đặt phòng qua email cho bạn sau khi quá trình
        xác nhận hoàn tất.
      </p>

      <Button
        title="Trở về trang chủ"
        onClick={() => navigate("/")}
        style="mt-7 py-3 min-w-[210px] text-[18px]"
      />
    </div>
  );
};

export default BookingComplete;
