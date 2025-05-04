/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";

const useBlogTable = ({
  fetchDataFn,
  deleteDataFn,
  dataKey = "blogs",
  totalKey = "totalBlogs",
}) => {
  const [dataBlogs, setDataBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openOptions, setOpenOptions] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || 1);
  const totalPages = Math.ceil(totalBlogs / DEFAULT_ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const handleAfterGetDatas = (res) => {
    setDataBlogs(res[dataKey] || []);
    setTotalBlogs(res[totalKey] || 0);
    setOpenOptions(
      (res[dataKey] || []).map((_, index) => ({
        index,
        open: false,
      }))
    );
    setError(null);
  };

  const handleReset = () => {
    setOpenModal(false);
    setCurrentId(null);
    setOpenOptions(
      dataBlogs?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const handleToggleOptions = (currentIndex) =>
    setOpenOptions((prevOptions) =>
      prevOptions.map((item, index) =>
        index === currentIndex
          ? { ...item, open: !item.open }
          : { ...item, open: false }
      )
    );

  const handleDeleteBlog = () => {
    toast
      .promise(deleteDataFn(currentId), {
        pending: "Đang xóa bài viết...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa bài viết thành công!!!");
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
      .catch(() => setError("Lỗi khi lấy dữ liệu bài viết"))
      .finally(() => setLoading(false));
  }, [location.search]);

  return {
    dataBlogs,
    totalBlogs,
    loading,
    error,
    openModal,
    currentId,
    openOptions,
    currentPage,
    totalPages,
    handlePageChange,
    handleReset,
    handleToggleOptions,
    handleDeleteBlog,
    setCurrentId,
    setOpenModal,
  };
};

export default useBlogTable;
