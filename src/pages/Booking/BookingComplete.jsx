import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateVoucherAPI } from "~/apis";
import bookingComplete from "~/assets/images/bookingComplete.png";
import Button from "~/components/Button/Button";

const BookingComplete = () => {
  const [expiredTime, setExpiredTime] = useState(15);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setExpiredTime((expiredTime) => {
        if (expiredTime <= 1) {
          clearInterval(interval);
          localStorage.removeItem("booking-data");
          navigate("/");
          return 0;
        }

        return expiredTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem("booking-data"));
    const voucherInfo = JSON.parse(localStorage.getItem("voucher-info"));

    if (!bookingData) navigate("/");

    if (voucherInfo) {
      const updateData = {
        usedCount: voucherInfo.usedCount + 1,
      };
      updateVoucherAPI(voucherInfo?._id, updateData);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 my-16">
      <h2 className="text-[36px] text-[#152c5b] font-semibold text-center mb-1">
        Đặt phòng thành công
      </h2>
      <p>Bạn sẽ được điều hướng về trang chủ trong {expiredTime} giây!!!</p>
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
