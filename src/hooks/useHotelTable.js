/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE, UTILITIES_LIST } from "~/utils/constants";
import { singleFileValidator } from "~/utils/validators";

const useHotelTable = ({
  fetchDataFn,
  createDataFn,
  updateDataFn,
  deleteDataFn,
  uploadImageFn,
  currentImagesFormData,
  dataKey = "hotels",
  totalKey = "totalHotels",
  imageKey = "hotel-images",
  resetFn,
}) => {
  const [dataHotels, setDataHotels] = useState([]);
  const [totalDataHotels, setTotalDataHotels] = useState(0);
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
  const [images, setImages] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || "1", 10);
  const totalPages = Math.ceil(totalDataHotels / DEFAULT_ITEMS_PER_PAGE);

  const reqDataRef = useRef(null);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage);
      navigate(`${params.toString()}`);
    }
  };

  const updateStateData = (res) => {
    setDataHotels(res[dataKey] || []);
    setTotalDataHotels(res[totalKey] || 0);
    setOpenOptions(
      res[dataKey]?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target?.files || []);
    const errors = [];

    if (files.length > 3) {
      toast.error("Bạn chỉ được chọn tối đa 3 ảnh!!");
      return;
    }

    if (files.length < 3) {
      toast.error("Bạn phải chọn 3 ảnh!!");
      return;
    }

    // handle errors validate file image type
    const validFiles = files.filter((file) => {
      const error = singleFileValidator(file);
      if (error) errors.push(error);
      return !error;
    });

    if (errors.length) {
      toast.error(errors.join(", "));
      return;
    }

    // handle the preview image for the file input
    const previews = [];
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === validFiles.length) {
          setImages(previews);
        }
      };
      reader.readAsDataURL(file);
    });

    // change avatar logic
    const formData = new FormData();
    validFiles.forEach((file) => {
      formData.append(imageKey, file);
    });

    reqDataRef.current = formData;
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
    setOpenOptions((prevOptions) =>
      prevOptions.map((item) => ({
        ...item,
        open: false,
      }))
    );
    setOpenModal(false);
  };

  const onDeleting = async () => {
    toast
      .promise(deleteDataFn(deleting.id), {
        pending: "Đang xóa phòng...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa phòng thành công!!!");
          handleAfterCUDNewData();
        }
      });

    handleReset();
  };

  const onSubmit = async (data) => {
    if (!images.length) {
      toast.error("Vui lòng chọn ảnh trước khi tạo!!!");
      return;
    }

    const formData = reqDataRef.current;
    if (!formData && !editing.edit) {
      toast.error("Dữ liệu ảnh không hợp lệ!!!");
      return;
    }

    let imagesList = [];
    if (formData)
      imagesList = await toast.promise(uploadImageFn(formData), {
        pending: "Đang tải ảnh lên...",
        success: "Tải ảnh thành công!!!",
        error: "Tải ảnh thất bại!",
      });

    if (imagesList?.length || currentImagesFormData.length) {
      const utilitiesList = UTILITIES_LIST.map((utility, index) => ({
        type: utility,
        value: data.utilities.split(", ")[index],
      }));

      const apiData = {
        ...data,
        utilities: utilitiesList,
        images: imagesList?.length
          ? imagesList?.map((image) => image.secure_url)
          : currentImagesFormData,
      };

      toast
        .promise(
          editing.edit
            ? updateDataFn(editing.data._id, apiData)
            : createDataFn(apiData),
          {
            pending: editing.edit
              ? "Đang chỉnh sửa khách sạn..."
              : "Đang tạo khách sạn mới...",
          }
        )
        .then((res) => {
          if (!res.error) {
            toast.success(
              editing.edit
                ? "Chỉnh sửa thành công"
                : "Tạo khách sạn mới thành công!!!"
            );
            handleAfterCUDNewData();
          }

          handleReset();
          setImages([]);
          resetFn();
          reqDataRef.current = null;
        });
    }
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
    dataHotels,
    totalDataHotels,
    loading,
    editing,
    deleting,
    openOptions,
    openModal,
    images,
    currentPage,
    totalPages,
    handlePageChange,
    handleToggle,
    handleReset,
    onDeleting,
    onSubmit,
    handleImageChange,
    toggleOpenModal,
    setImages,
  };
};

export default useHotelTable;
