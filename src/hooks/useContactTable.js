/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";

const useContactTable = ({
  fetchDataFn,
  deleteDataFn,
  dataKey = "contacts",
  totalKey = "totalContacts",
}) => {
  const [dataContacts, setDataContacts] = useState([]);
  const [dataTotalContacts, setDataTotalContacts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openOptions, setOpenOptions] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || 1);
  const totalPages = Math.ceil(dataContacts / DEFAULT_ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const handleAfterGetDatas = (res) => {
    setDataContacts(res[dataKey] || []);
    setDataTotalContacts(res[totalKey] || 0);
    setOpenOptions(
      res[dataKey]?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const handleReset = () => {
    setOpenModal(false);
    setCurrentId(null);
    setOpenOptions(
      dataContacts?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const handleToggleOptions = (currentIndex) =>
    setOpenOptions((prevOptions) =>
      prevOptions.map((item, index) =>
        index === currentIndex
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

  const handleDeleteContact = () => {
    toast
      .promise(deleteDataFn(currentId), {
        pending: "Đang xóa liên hệ",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa liên hệ thành công!!!");
          handleAfterDeletedData();
        }
        handleReset();
      });
  };

  const handleAfterDeletedData = () => {
    fetchDataFn(location.search).then(handleAfterGetDatas);
  };

  useEffect(() => {
    setLoading(true);
    fetchDataFn(location.search)
      .then(handleAfterGetDatas)
      .finally(() => setLoading(false));
  }, [location.search]);

  return {
    dataContacts,
    dataTotalContacts,
    loading,
    openModal,
    currentId,
    openOptions,
    currentPage,
    totalPages,
    handlePageChange,
    handleReset,
    handleToggleOptions,
    handleDeleteContact,
    setCurrentId,
    setOpenModal,
  };
};

export default useContactTable;
