import { Spin } from "antd";
import { Ban, CircleCheckBig, CircleDot, Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteBookingAPI, getListBookingsAPI, updateBookingAPI } from "~/apis";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";
import { DEFAULT_ITEMS_PER_PAGE, ORDER_STATUS } from "~/utils/constants";
import { formatDate } from "~/utils/formatters";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState({
    edit: false,
    data: null,
  });
  const [deleting, setDeleting] = useState({
    delete: false,
    id: null,
  });
  const [openOptions, setOpenOptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || 1);
  const totalPages = Math.ceil(totalBookings / DEFAULT_ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const updateStateData = (res) => {
    setBookings(res.bookings || []);
    setTotalBookings(res.totalBookings || 0);
    setOpenOptions(
      res.bookings?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const handleToggle = (type, data) => {
    setOpenModal(type === "options" ? false : true);
    if (type === "edit")
      setEditing({
        edit: true,
        data,
      });
    else if (type === "delete")
      setDeleting({
        delete: true,
        id: data,
      });
    else if (type === "options")
      setOpenOptions((prevOptions) =>
        prevOptions.map((item, index) =>
          index === data
            ? {
                ...item,
                open: !item.open,
              }
            : {
                ...item,
                open: false,
              }
        )
      );
  };

  const handleReset = () => {
    setEditing({
      edit: false,
      data: null,
    });
    setDeleting({
      delete: false,
      id: null,
    });
    setOpenOptions((prevOptions) =>
      prevOptions.map((item) => ({
        ...item,
        open: false,
      }))
    );
    setOpenModal(false);
  };

  const onUpdating = async () => {
    const updateData = {
      status: ORDER_STATUS.COMPLETED,
    };

    toast
      .promise(updateBookingAPI(editing.data?._id, updateData), {
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

  const onDeleting = async () => {
    toast
      .promise(deleteBookingAPI(deleting.id), {
        pending: "Đang xóa đơn đặt phòng...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa đơn đặt phòng thành công!!!");
          handleAfterCUDNewBooking();
        }
      });

    handleReset();
  };

  const handleAfterCUDNewBooking = () => {
    getListBookingsAPI(location.search).then(updateStateData);
  };

  useEffect(() => {
    setLoading(true);
    getListBookingsAPI(location.search)
      .then(updateStateData)
      .finally(() => setLoading(false));
  }, [location.search]);

  const tHeadStyle = "font-medium border border-gray-200 px-4 py-2 text-[18px]";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex flex-col">
      {openModal && (
        <Modal
          title={
            editing.edit ? "Thanh toán đơn đặt phòng" : "Xóa đơn đặt phòng"
          }
          handleCloseModal={() => handleReset()}
          modalStyle="w-[450px]"
        >
          {deleting.delete ? (
            <div className="mt-6 relative">
              <p className="text-black">
                Bạn có chắc chắn muốn xóa đơn đặt phòng này không? Sau khi xóa
                không thể hoàn tác!
              </p>

              <div className="flex justify-end">
                <div className="flex items-center gap-2 mt-8">
                  <Button
                    title="Trở lại"
                    type="cancel"
                    onClick={() => handleReset()}
                  />
                  <Button
                    title="Xóa đơn đặt phòng"
                    type="warning"
                    onClick={onDeleting}
                  />
                </div>
              </div>
            </div>
          ) : (
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
                  <Button
                    title="Thanh toán"
                    type="warning"
                    onClick={onUpdating}
                  />
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}

      <h3 className="text-[20px] font-medium">Quản lý đặt phòng</h3>

      <table className="table-fixed w-full border border-gray-200 bg-white rounded-md shadow-sm my-8">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className={`${tHeadStyle} w-[200px]`}>Ảnh phòng</th>
            <th className={`${tHeadStyle}`}>Khách</th>
            <th className={`${tHeadStyle}`}>Tên phòng</th>
            <th className={`${tHeadStyle} w-[150px]`}>Thời gian</th>
            <th className={`${tHeadStyle}`}>Trạng thái</th>
            <th className={`${tHeadStyle}`}>Giá</th>
            <th className={`${tHeadStyle} w-[100px]`}></th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking, index) => (
            <tr key={index} className="text-center">
              <td className={`${tHeadStyle}`}>
                <img
                  src={booking?.hotelImages?.[0]}
                  className="object-cover w-[200px] h-[150px] mx-auto rounded-sm"
                  alt=""
                />
              </td>
              <td className={`${tHeadStyle}`}>{booking?.userName}</td>
              <td className={`${tHeadStyle}`}>{booking?.hotelName}</td>
              <td className={`${tHeadStyle}`}>
                {formatDate(booking?.checkInDate) +
                  "-" +
                  formatDate(booking?.checkOutDate)}
              </td>
              <td className={`${tHeadStyle}`}>
                <div className="flex items-center justify-center gap-2 rounded-xl w-[120px] mx-auto bg-[#f5f5f5] py-1 shadow-sm">
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
              </td>
              <td className={`${tHeadStyle}`}>{booking?.totalPrice}đ</td>
              <td className={`${tHeadStyle} relative`}>
                <Ellipsis
                  size={18}
                  className="cursor-pointer mx-auto"
                  onClick={() => handleToggle("options", index)}
                />

                {openOptions[index]?.open && (
                  <ul
                    className="w-[150px] bg-white shadow-md z-100
                  border border-slate-100 rounded-sm absolute bottom-[-75px] text-[14px] right-0"
                  >
                    <li
                      className={`${optionStyle} border-b border-slate-200`}
                      onClick={() => navigate(`/admin/booking/${booking?._id}`)}
                    >
                      Xem thông tin
                    </li>
                    <li
                      className={`${optionStyle} border-b border-slate-200 `}
                      onClick={() => handleToggle("edit", booking)}
                    >
                      Thanh toán
                    </li>
                    <li
                      className={`${optionStyle}`}
                      onClick={() => handleToggle("delete", booking?._id)}
                    >
                      Xóa đặt phòng
                    </li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-10">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FiChevronRight />}
            previousLabel={<FiChevronLeft />}
            onPageChange={(selected) => handlePageChange(selected.selected + 1)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
            containerClassName="flex items-center justify-center gap-2 mt-6"
            pageClassName="px-4 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            activeClassName="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
            previousClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            nextClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakClassName="px-3 py-2 text-gray-500"
          />
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
