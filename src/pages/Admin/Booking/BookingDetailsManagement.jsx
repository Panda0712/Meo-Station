import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateBookingAPI } from "~/apis";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";
import {
  fetchBookingDetailsAPI,
  selectActiveBooking,
} from "~/redux/activeBooking/activeBookingSlice";
import { BOOKING_MODE, ORDER_STATUS, PAYMENT_METHODS } from "~/utils/constants";
import { formatDate, formatVND } from "~/utils/formatters";

const BookingDetailsManagement = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const activeBooking = useSelector(selectActiveBooking);

  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = () => {
    setOpenModal(false);
  };

  const handleAfterCUDNewBooking = () => {
    navigate("/booking");
  };

  const onPaying = async () => {
    const updateData = {
      status: ORDER_STATUS.COMPLETED,
    };

    toast
      .promise(updateBookingAPI(activeBooking?.hotelId, updateData), {
        pending: "Đang thanh toán...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Thanh toán thành công!!!");
          handleAfterCUDNewBooking();
        }
        handleReset();
      });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBookingDetailsAPI(bookingId)).then(() => setLoading(false));
  }, [dispatch, bookingId]);

  const boxStyle = "relative bg-white shadow-md rounded-md p-12";

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div>
      {openModal && (
        <Modal
          title="Thanh toán đơn đặt phòng"
          handleCloseModal={handleReset}
          modalStyle="w-[450px]"
        >
          <div className="mt-6 relative">
            <p className="text-black">
              Xác nhận thanh toán cho đơn đặt phòng này?
            </p>

            <div className="flex justify-end">
              <div className="flex items-center gap-2 mt-8">
                <Button
                  title="Trở lại"
                  type="cancel"
                  onClick={() => handleReset()}
                />
                <Button title="Thanh toán" type="warning" onClick={onPaying} />
              </div>
            </div>
          </div>
        </Modal>
      )}

      <h3 className="text-[20px] font-medium mb-10">Chi tiết đơn đặt phòng</h3>

      {!activeBooking ? (
        <div className="flex items-center justify-center">
          <h2 className="text-[20px] font-semibold text-center">
            Không có dữ liệu đặt phòng tương ứng!! Vui lòng thử lại sau!!!
          </h2>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <h4 className="text-[18px] font-medium mb-5">
            {activeBooking?.hotelName}
          </h4>
          <div className="relative flex items-center gap-5 h-[350px]">
            <div className="basis-[calc(60%-10px)] h-full">
              <img
                src={activeBooking?.hotelImages?.[0]}
                className="w-full h-full object-cover rounded-md"
                alt=""
              />
            </div>
            <div className="relative flex flex-col gap-4 basis-[calc(40%-10px)] h-full">
              <img
                src={activeBooking?.hotelImages?.[1]}
                className="w-full h-[167px] object-cover rounded-md"
                alt=""
              />
              <img
                src={activeBooking?.hotelImages?.[2]}
                className="w-full h-[167px] object-cover rounded-md"
                alt=""
              />
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-[18px] font-medium my-3">
              Thông tin đặt phòng
            </h4>
            <div className={boxStyle}>
              <div className="flex gap-16">
                <div className="relative">
                  <p className="text-[18px] font-semibold">Ngày check-in</p>
                  <h5 className="text-[16px]">
                    {formatDate(activeBooking?.checkInDate)}
                  </h5>
                </div>
                <div className="relative">
                  <p className="text-[18px] font-semibold">Ngày check-out</p>
                  <h5 className="text-[16px]">
                    {formatDate(activeBooking?.checkOutDate)}
                  </h5>
                </div>
                <div className="relative">
                  <p className="text-[18px] font-semibold">Địa chỉ</p>
                  <h5 className="text-[16px]">
                    {activeBooking?.hotelLocation}
                  </h5>
                </div>
                <div className="relative">
                  <p className="text-[18px] font-semibold">Số khách</p>
                  <h5 className="text-[16px]">{activeBooking?.guest}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-[18px] font-medium my-3">
              Thông tin khách hàng
            </h4>
            <div className={boxStyle}>
              <div className="flex gap-16">
                <div className="relative">
                  <p className="text-[18px] font-semibold">Khách hàng</p>
                  <h5 className="text-[16px]">{activeBooking?.userName}</h5>
                </div>
                <div className="relative">
                  <p className="text-[18px] font-semibold">Email</p>
                  <h5 className="text-[16px]">{activeBooking?.userEmail}</h5>
                </div>
                <div className="relative">
                  <p className="text-[18px] font-semibold">Số điện thoại</p>
                  <h5 className="text-[16px]">{activeBooking?.phone}</h5>
                </div>
                <div className="relative">
                  <p className="text-[18px] font-semibold">Loại phòng</p>
                  <h5 className="text-[16px]">
                    {activeBooking?.mode === BOOKING_MODE.day
                      ? "Theo ngày"
                      : "Theo đêm"}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-[18px] font-medium my-3">
              Trạng thái đặt phòng
            </h4>
            <div className={boxStyle}>
              <div className="flex gap-16">
                <div className="relative">
                  <p className="text-[18px] font-semibold">Trạng thái</p>
                  <h5 className="text-[16px]">
                    {activeBooking?.status === ORDER_STATUS.COMPLETED
                      ? "Đã thanh toán"
                      : activeBooking?.status === ORDER_STATUS.CANCELLED
                      ? "Đã hủy"
                      : "Chưa thanh toán"}
                  </h5>
                </div>
                <div className="relative">
                  <p className="text-[18px] font-semibold">
                    Phương thức thanh toán
                  </p>
                  <h5 className="text-[16px]">
                    {activeBooking?.paymentMethod === PAYMENT_METHODS.CASH
                      ? "Tiền mặt"
                      : activeBooking?.paymentMethod}
                  </h5>
                </div>
                <div className="relative">
                  <p className="text-[18px] font-semibold">Số đêm</p>
                  <h5 className="text-[16px]">
                    {activeBooking?.numberOfNight || "Trong ngày"}
                  </h5>
                </div>
                <div className="relative">
                  <p className="text-[18px] font-semibold">Tổng thanh toán</p>
                  <h5 className="text-[16px]">
                    {formatVND(activeBooking?.totalPrice)}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button
              title="Trở lại"
              type="cancel"
              onClick={() => navigate(-1)}
            />
            {activeBooking?.status === ORDER_STATUS.PENDING && (
              <Button
                title="Thanh toán"
                type="submit"
                onClick={() => setOpenModal(true)}
              ></Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailsManagement;
