import { Spin } from "antd";
import { Ban, CircleCheckBig, CircleDot } from "lucide-react";
import { deleteBookingAPI, getListBookingsAPI, updateBookingAPI } from "~/apis";
import AdminTable from "~/components/AdminTable/AdminTable";
import ConfirmModal from "~/components/ConfirmModal/ConfirmModal";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal/DeleteConfirmationModal";
import Pagination from "~/components/Pagination/Pagination";
import useBookingTable from "~/hooks/useBookingTable";
import { ORDER_STATUS } from "~/utils/constants";
import { formatDate } from "~/utils/formatters";

const BookingManagement = () => {
  const {
    dataBookings: bookings,
    loading,
    openOptions,
    handleToggle,
    handleReset,
    handlePageChange,
    currentPage,
    totalPages,
    onUpdating,
    onDeleting,
    openModal,
    deleting,
    navigate,
  } = useBookingTable({
    fetchDataFn: getListBookingsAPI,
    updateDataFn: updateBookingAPI,
    deleteDataFn: deleteBookingAPI,
    dataKey: "bookings",
    totalKey: "totalBookings",
  });

  const headerList = [
    {
      label: "Ảnh phòng",
      width: "w-[200px]",
    },
    {
      label: "Khách",
    },
    {
      label: "Tên phòng",
    },
    {
      label: "Thời gian",
      width: "w-[150px]",
    },
    {
      label: "Trạng thái",
    },
    {
      label: "Giá",
    },
    {
      label: "",
      width: "w-[100px]",
    },
  ];

  const tHeadStyle =
    "font-medium border border-gray-200 px-4 py-2 md:text-[18px] sm:text-[16px] text-[14px]";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex flex-col max-[900px]:overflow-auto min-h-screen">
      <DeleteConfirmationModal
        isOpen={openModal}
        onClose={handleReset}
        onConfirm={onDeleting}
        title="Xóa đơn đặt phòng"
        message="Bạn có chắc chắn muốn xóa đơn đặt phòng không? Sau khi xóa không thể hoàn tác!"
        confirmButtonText="Xóa"
        cancelButtonText="Trở lại"
        modalStyle="w-[450px]"
      />

      <ConfirmModal
        isOpen={openModal && !deleting.delete}
        onClose={handleReset}
        onConfirm={onUpdating}
        title="Thanh toán đơn đặt phòng"
        message="Bạn có chắc chắn muốn thanh toán đơn đặt phòng này không?"
        confirmButtonText="Thanh toán"
        cancelButtonText="Trở lại"
        modalStyle="w-[450px]"
      />

      <h3 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
        Quản lý đặt phòng
      </h3>

      <AdminTable
        headers={headerList}
        data={bookings}
        renderRow={(booking) => (
          <>
            <td className={`${tHeadStyle}`}>
              <img
                src={booking?.hotelImages?.[0]}
                className="object-cover md:w-[200px] md:h-[150px] sm:w-[150px] sm:h-[100px] 
                  w-[120px] h-[80px] mx-auto rounded-sm"
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
              <div
                className="flex items-center lg:flex-nowrap flex-wrap 
                justify-center gap-2 rounded-xl max-w-[120px] mx-auto bg-[#f5f5f5] py-1 shadow-sm"
              >
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
          </>
        )}
        openOptions={openOptions}
        handleToggleOptions={(idx) => handleToggle("options", idx)}
        optionItems={[
          {
            label: "Xem thông tin",
            onClick: (booking) => navigate(`/admin/booking/${booking?._id}`),
          },
          {
            label: "Thanh toán",
            onClick: (booking) => handleToggle("edit", booking),
          },
          {
            label: "Xóa đặt phòng",
            onClick: (booking) => handleToggle("delete", booking?._id),
          },
        ]}
        tHeadStyle={tHeadStyle}
        optionStyle={optionStyle}
        responsiveStyle="max-[900px]:min-w-[950px]"
      />

      {totalPages > 1 && (
        <Pagination
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default BookingManagement;
