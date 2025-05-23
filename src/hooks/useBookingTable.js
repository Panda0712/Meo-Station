/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE, ORDER_STATUS } from "~/utils/constants";
import dayjs from "dayjs";

const useBookingTable = ({
  fetchDataFn,
  updateDataFn,
  deleteDataFn,
  dataKey = "bookings",
  totalKey = "totalBookings",
}) => {
  const [dataBookings, setDataBookings] = useState([]);
  const [dataTotalBookings, setDataTotalBookings] = useState(0);
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || 1);
  const queryStartDate = query.get("startDate");
  const queryEndDate = query.get("endDate");

  const totalPages = Math.ceil(dataTotalBookings / DEFAULT_ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const handleDateChange = (type, date) => {
    const params = new URLSearchParams(location.search);

    if (type === "start") {
      setStartDate(date);
      if (date) {
        params.set("startDate", date.format("YYYY-MM-DD"));
      } else {
        params.delete("startDate");
      }
    } else if (type === "end") {
      setEndDate(date);
      if (date) {
        params.set("endDate", date.format("YYYY-MM-DD"));
      } else {
        params.delete("endDate");
      }
    }

    params.set("page", "1");
    navigate(`?${params.toString()}`);
  };

  const updateStateData = (res) => {
    let bookings = res[dataKey] || [];

    if (startDate || endDate) {
      bookings = bookings.filter((booking) => {
        const checkInDate = dayjs(booking.checkInDate);
        const checkOutDate = dayjs(booking.checkOutDate);

        if (startDate && endDate) {
          return (
            (checkInDate.isAfter(startDate) || checkInDate.isSame(startDate)) &&
            (checkOutDate.isBefore(endDate) || checkOutDate.isSame(endDate))
          );
        } else if (startDate) {
          return (
            checkInDate.isAfter(startDate) || checkInDate.isSame(startDate)
          );
        } else if (endDate) {
          return checkOutDate.isBefore(endDate) || checkOutDate.isSame(endDate);
        }
        return true;
      });
    }

    const sortedBookings = sortBookingsByCheckInDate(bookings);
    setDataBookings(sortedBookings);
    setDataTotalBookings(res[totalKey]);
    setOpenOptions(
      sortedBookings.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const sortBookingsByCheckInDate = (bookings) => {
    return [...bookings].sort((a, b) => {
      const dateA = new Date(a.checkInDate);
      const dateB = new Date(b.checkInDate);
      return dateB - dateA;
    });
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
    if (editing.data?.status === ORDER_STATUS.COMPLETED) {
      toast.info("Đơn đặt phòng này đã được thanh toán rồi!!!");
      handleReset();
      return;
    }

    if (editing.data?.status === ORDER_STATUS.CANCELLED) {
      toast.error("Đơn đặt phòng này đã bị hủy!!!");
      handleReset();
      return;
    }

    const updateData = {
      status: ORDER_STATUS.COMPLETED,
    };

    toast
      .promise(updateDataFn(editing.data?._id, updateData), {
        pending: "Đang thanh toán...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Thanh toán thành công!!!");
          handleAfterCUDNewData();
        }
        handleReset();
      });
  };

  const onDeleting = async () => {
    toast
      .promise(deleteDataFn(deleting.id), {
        pending: "Đang xóa đơn đặt phòng...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa đơn đặt phòng thành công!!!");
          handleAfterCUDNewData();
        }
      });

    handleReset();
  };

  const handleAfterCUDNewData = () => {
    fetchDataFn(location.search).then(updateStateData);
  };

  useEffect(() => {
    if (queryStartDate && !startDate) {
      setStartDate(dayjs(queryStartDate));
    }
    if (queryEndDate && !endDate) {
      setEndDate(dayjs(queryEndDate));
    }
  }, [queryStartDate, queryEndDate]);

  useEffect(() => {
    setLoading(true);
    fetchDataFn(location.search)
      .then(updateStateData)
      .finally(() => setLoading(false));
  }, [location.search]);

  return {
    dataBookings,
    dataTotalBookings,
    loading,
    editing,
    deleting,
    openOptions,
    openModal,
    currentPage,
    totalPages,
    startDate,
    endDate,
    navigate,
    handlePageChange,
    handleToggle,
    handleReset,
    onUpdating,
    onDeleting,
    handleDateChange,
  };
};

export default useBookingTable;
