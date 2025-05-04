/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";

const useVoucherTable = ({
  setValue,
  countValue,
  reset,
  fetchDataFn,
  getDataFn,
  createDataFn,
  updateDataFn,
  deleteDataFn,
  dataKey = "vouchers",
  totalKey = "totalVouchers",
}) => {
  const [dataHotels, setDataHotels] = useState([]);
  const [dataVouchers, setDataVouchers] = useState([]);
  const [dataTotalVouchers, setDataTotalVouchers] = useState(0);
  const [dataListHotelFields, setDataListHotelFields] = useState([]);
  const [currentSelectIndex, setCurrentSelectIndex] = useState(0);
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

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || 1);
  const totalPages = Math.ceil(dataTotalVouchers / DEFAULT_ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const handleChangeListHotelFields = (e) => {
    const newListHotelFields = [...dataListHotelFields];
    const checked = newListHotelFields.includes(e.target.value);
    if (!checked) {
      newListHotelFields.push(e.target.value);
      setDataListHotelFields(newListHotelFields);
      setCurrentSelectIndex(e.target.index);
      setValue("hotelIds", newListHotelFields);
    } else {
      newListHotelFields.splice(newListHotelFields.indexOf(e.target.value), 1);
      setDataListHotelFields(newListHotelFields);
      setCurrentSelectIndex(e.target.index);
      setValue("hotelIds", newListHotelFields);
    }
  };

  const updateStateData = (res) => {
    setDataVouchers(res[dataKey] || []);
    setDataTotalVouchers(res[totalKey] || 0);
    setOpenOptions(
      res[dataKey]?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const toggleOpenModal = () => setOpenModal(!openModal);

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
    setCurrentSelectIndex(0);
    setDataListHotelFields([]);
    setOpenOptions((prevOptions) =>
      prevOptions.map((item) => ({
        ...item,
        open: false,
      }))
    );
    setOpenModal(false);
  };

  const onSubmit = async (data) => {
    console.log(data);

    const apiData = {
      ...data,
      discount: Number(data.discount),
      usedCount: editing.edit ? countValue : 0,
      hotelIds: dataListHotelFields,
      expiredAt: new Date(data.expiredAt).getTime(),
    };

    toast
      .promise(
        editing.edit
          ? updateDataFn(editing.data._id, apiData)
          : createDataFn(apiData),
        {
          pending: editing.edit
            ? "Đang chỉnh sửa voucher..."
            : "Đang tạo voucher mới...",
        }
      )
      .then((res) => {
        if (!res.error) {
          toast.success(
            editing.edit
              ? "Chỉnh sửa thành công"
              : "Tạo voucher mới thành công!!!"
          );
          handleAfterCUDNewData();
        }

        handleReset();
        reset();
      });
  };

  const onDeleting = async () => {
    toast
      .promise(deleteDataFn(deleting.id), {
        pending: "Đang xóa voucher...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa voucher thành công!!!");
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
    fetchDataFn(location.search).then(updateStateData);
    getDataFn(location.search)
      .then((res) => {
        setDataHotels(res || []);
      })
      .finally(() => setLoading(false));
  }, [location.search]);

  return {
    dataHotels,
    dataVouchers,
    currentSelectIndex,
    openOptions,
    openModal,
    loading,
    currentPage,
    totalPages,
    editing,
    deleting,
    dataListHotelFields,
    handleReset,
    handlePageChange,
    handleChangeListHotelFields,
    handleToggle,
    toggleOpenModal,
    onDeleting,
    onSubmit,
  };
};

export default useVoucherTable;
