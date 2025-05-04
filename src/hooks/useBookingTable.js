/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE, ORDER_STATUS } from "~/utils/constants";

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

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || 1);
  const totalPages = Math.ceil(dataTotalBookings / DEFAULT_ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const updateStateData = (res) => {
    setDataBookings(res[dataKey]?.reverse() || []);
    setDataTotalBookings(res[totalKey] || 0);
    setOpenOptions(
      res[dataKey]?.map((_, index) => ({
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
    navigate,
    handlePageChange,
    handleToggle,
    handleReset,
    onUpdating,
    onDeleting,
  };
};

export default useBookingTable;
