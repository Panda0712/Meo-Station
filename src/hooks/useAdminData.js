/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { singleFileValidator } from "~/utils/validators";

const useAdminData = ({
  fetchDataFn,
  createDataFn,
  updateDataFn,
  deleteDataFn,
  dataKey = "items",
  totalKey = "totalItems",
  uploadImageFn = null,
  onAfterCreate = null,
  onAfterUpdate = null,
  onAfterDelete = null,
}) => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
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
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const reqDataRef = useRef(null);

  const updateStateData = (res) => {
    setData(res[dataKey] || []);
    setTotalItems(res[totalKey] || 0);
    setOpenOptions(
      res[dataKey]?.map((_, index) => ({
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

  const handleToggleModal = () => setOpenModal(!openModal);

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
    else if (type === "options") handleToggleOptions(data);
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
      prevOptions?.map((item) => ({
        ...item,
        open: false,
      }))
    );
    setOpenModal(false);
    setImages([]);
    reqDataRef.current = null;
  };

  const handleDelete = async () => {
    if (!deleting.id) return;

    toast
      .promise(deleteDataFn(deleting.id), {
        pending: "Đang xóa...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa thành công!!!");
          if (onAfterDelete) {
            onAfterDelete(res);
          } else {
            fetchData();
          }
        }
        handleReset();
      });
  };

  const handleImageChange = (event, imageKey, multiple = false) => {
    if (multiple) {
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

      // Handle the preview image for the file input
      const previews = [];
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          previews.push(e.target.result);
          if (previews.length === files.length) {
            setImages(previews);
          }
        };
        reader.readAsDataURL(file);
      });

      // Create FormData
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(imageKey, file);
      });

      reqDataRef.current = formData;
    } else {
      const file = event.target?.files[0];

      // handle errors validate file image type
      const error = singleFileValidator(file);
      if (error) {
        toast.error(error);
        return;
      }

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImages([e.target.result]);
        reader.readAsDataURL(file);
      }

      // Create FormData
      const formData = new FormData();
      formData.append(imageKey, file);

      reqDataRef.current = formData;
    }
  };

  const handleSubmit = async (formData, getValues) => {
    // Image validation
    if (
      uploadImageFn &&
      !editing.edit &&
      (!images.length || !reqDataRef.current)
    ) {
      toast.error("Vui lòng chọn hình ảnh!!!");
      return;
    }

    if (!formData && !editing.edit) {
      toast.error("Dữ liệu ảnh không hợp lệ!!!");
      return;
    }

    // Upload images if needed
    let uploadedImages = null;
    if (uploadImageFn && reqDataRef.current) {
      uploadedImages = await toast.promise(uploadImageFn(reqDataRef.current), {
        pending: "Đang tải ảnh lên...",
        success: "Tải ảnh thành công!!!",
        error: "Tải ảnh thất bại!",
      });
    }

    // Prepare data with images
    const currentImages = getValues ? getValues("images") : null;
    const dataWithImages = {
      ...formData,
      images: uploadedImages || currentImages,
    };

    // Create or update data
    toast
      .promise(
        editing.edit
          ? updateDataFn(editing.data._id, dataWithImages)
          : createDataFn(dataWithImages),
        {
          pending: editing.edit ? "Đang chỉnh sửa..." : "Đang tạo mới...",
        }
      )
      .then((res) => {
        if (!res.error) {
          toast.success(
            editing.edit ? "Chỉnh sửa thành công" : "Tạo mới thành công!!!"
          );

          if (editing.edit && onAfterUpdate) {
            onAfterUpdate(res);
          } else if (!editing.edit && onAfterCreate) {
            onAfterCreate(res);
          } else {
            fetchData();
          }
        }

        handleReset();
      });
  };

  const fetchData = () => {
    setLoading(true);

    // Check if fetchDataFn returns a Promise or a Redux Thunk action
    const result = fetchDataFn(location.search);

    // If it's a Redux Thunk action (has dispatch method)
    if (typeof result === "function") {
      dispatch(fetchDataFn(location.search))
        .then(updateStateData)
        .finally(() => setLoading(false));
    }
    // If it's a regular Promise
    else if (result && typeof result.then === "function") {
      result.then(updateStateData).finally(() => setLoading(false));
    }
    // Fallback for other return types
    else {
      console.error(
        "fetchDataFn must return a Promise or a Redux Thunk action"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);

  console.log(data);

  return {
    data,
    totalItems,
    editing,
    deleting,
    openOptions,
    openModal,
    images,
    loading,
    reqDataRef,
    handleToggle,
    handleToggleModal,
    handleReset,
    handleDelete,
    handleImageChange,
    handleSubmit,
    fetchData,
    setImages,
  };
};

export default useAdminData;
