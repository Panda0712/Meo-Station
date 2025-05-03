import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNewBookingAPI, momoPaymentAPI, zaloPaymentAPI } from "~/apis";
import Button from "~/components/Button/Button";
import BookingCard from "~/pages/Booking/BookingCard/BookingCard";
import BookingHeading from "~/pages/Booking/BookingHeading/BookingHeading";
import BookingSeparate from "~/pages/Booking/BookingSeparate/BookingSeparate";
import { ORDER_STATUS, PAYMENT_METHODS } from "~/utils/constants";

const BookingPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CASH);

  const bookingData = JSON.parse(localStorage.getItem("booking-data"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleBooking = async () => {
    const bookingInfoData = {
      ...bookingData,
      paymentMethod,
    };

    if (paymentMethod === PAYMENT_METHODS.CASH) {
      toast
        .promise(
          createNewBookingAPI({
            ...bookingInfoData,
            status: ORDER_STATUS.PENDING,
          }),
          {
            pending: "Đang tạo đơn đặt phòng mới....",
          }
        )
        .then((res) => {
          if (!res.error) {
            toast.success("Đặt phòng thành công!!!!");
            navigate("/booking/complete");
          }
        });
    } else if (paymentMethod === PAYMENT_METHODS.MOMO) {
      await handleMomoPayment(bookingInfoData);
    } else if (paymentMethod === PAYMENT_METHODS.ZALOPAY) {
      await handleZaloPayment(bookingInfoData);
    }
  };

  const handleMomoPayment = async (bookingInfoData) => {
    const data = await momoPaymentAPI(bookingInfoData);

    const { payUrl } = data;

    if (payUrl) {
      window.location.href = payUrl;
    } else toast.error("Không thể tạo đường dẫn thanh toán!!!");
  };

  const handleZaloPayment = async (bookingInfoData) => {
    const data = await zaloPaymentAPI(bookingInfoData);

    const { order_url } = data;

    if (order_url) window.location.href = order_url;
    else toast.error("Không thể tạo đường dẫn thanh toán!!!");
  };

  if (!bookingData) navigate("/");

  return (
    <div className="mt-12">
      <BookingHeading
        heading="Thanh toán"
        subHeading="Hãy theo hướng dẫn thanh toán phía bên dưới"
      />

      <div
        className="flex lg:flex-row flex-col items-center 
      justify-center lg:gap-24 gap-12"
      >
        <BookingCard bookingData={bookingData} />
        <BookingSeparate booking />
        <div>
          <h6 className="md:text-[18px] text-[16px] text-[#152C5B] font-semibold">
            Phương thức thanh toán:
          </h6>
          <div className="flex flex-col gap-3 mt-4 mb-5">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value={PAYMENT_METHODS.CASH}
                checked={paymentMethod === PAYMENT_METHODS.CASH}
                onChange={handleChange}
              />
              <span className="md:text-[16px] text-[14px] font-medium text-[#152c5b]">
                Tiền mặt
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value={PAYMENT_METHODS.MOMO}
                checked={paymentMethod === PAYMENT_METHODS.MOMO}
                onChange={handleChange}
              />
              <span className="md:text-[16px] text-[14px] font-medium text-[#152c5b]">
                Ví Momo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value={PAYMENT_METHODS.ZALOPAY}
                checked={paymentMethod === PAYMENT_METHODS.ZALOPAY}
                onChange={handleChange}
              />
              <span className="md:text-[16px] text-[14px] font-medium text-[#152c5b]">
                Ví ZaloPay
              </span>
            </div>
          </div>

          <h6 className="md:text-[18px] text-[16px] text-[#152C5B] font-semibold mb-4">
            Thông tin thanh toán:
          </h6>
          <p className="md:text-[16px] text-[14px] text-[#152C5B]">
            Thuế TAX: <span className="font-medium ml-1">10%</span>
          </p>
          <p className="md:text-[16px] text-[14px] text-[#152C5B]">
            Giá phòng: <span className="font-medium ml-1">400.000đ</span>
          </p>
          <p className="md:text-[16px] text-[14px] text-[#152C5B]">
            Tổng giá: <span className="font-medium ml-1">450.000đ</span>
          </p>

          <div
            className="border-2 text-[#152c5b] md:text-[18px] text-[16px]
           font-medium mt-10 max-w-[400px] border-[#152c5b] pt-3 pb-5 px-4 rounded-sm"
          >
            <p className="md:text-[16px] text-[14px]">
              Lưu ý cho trường hợp hủy đặt phòng:
            </p>
            <p className="md:text-[16px] text-[14px]">
              &#34;Yêu cầu hủy của quý khách sẽ được ghi nhận xử lý và Thời gian
              quý khách sẽ được hoàn tiền theo quy định của ngân hàng phát hành
              thẻ như sau:
            </p>
            <p className="md:text-[16px] text-[14px]">
              - Thẻ nội địa/Ví điện tử/Tài khoản ngân hàng: từ 10 - 14 ngày làm
              việc.
            </p>
            <p className="md:text-[16px] text-[14px]">
              - Thẻ quốc tế: từ 8 - 17 ngày làm việc.
            </p>
            <p className="md:text-[16px] text-[14px]">
              **Ngày làm việc: Không bao gồm T7, CN, Lễ&#34;
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center mt-12">
        <Button
          title="Đặt phòng"
          onClick={handleBooking}
          style="w-[300px] p-6"
        />
        <Button
          onClick={() => navigate(-1)}
          title="Trở lại"
          style="w-[300px] font-medium"
          type="cancel-secondary"
        />
      </div>
    </div>
  );
};

export default BookingPayment;
