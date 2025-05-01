import { Spin } from "antd";
import { Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createNewNotificationAPI,
  uploadHotelNotificationImageAPI,
} from "~/apis";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import Modal from "~/components/Modal/Modal";
import {
  addNotifications,
  deleteNotificationAPI,
  fetchNotificationsAPI,
  selectCurrentNotifications,
  selectTotalNotifications,
  updateNotificationAPI,
} from "~/redux/notifications/notificationsSlice";
import { socketIoInstance } from "~/socketClient";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";
import {
  FIELD_REQUIRED_MESSAGE,
  singleFileValidator,
} from "~/utils/validators";

const NotificationManagement = () => {
  const currentNotifications = useSelector(selectCurrentNotifications);
  const totalNotifications = useSelector(selectTotalNotifications);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState({
    edit: false,
    data: null,
  });
  const [deleting, setDeleting] = useState({
    delete: false,
    id: null,
  });
  const [openModal, setOpenModal] = useState(false);
  const [openOptions, setOpenOptions] = useState([]);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || 1);
  const totalPages = Math.ceil(totalNotifications / DEFAULT_ITEMS_PER_PAGE);

  const reqDataRef = useRef(null);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const handleAfterGetNotifications = (res) => {
    setOpenOptions(
      res.payload.notifications?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const handleImageChange = (event) => {
    const error = singleFileValidator(event.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }

    // handle the preview image for the file input
    const file = event.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }

    // change avatar logic
    const formData = new FormData();
    formData.append("hotel-notifications", event.target?.files[0]);

    reqDataRef.current = formData;

    // for (const [key, value] of form.entries()) {
    //   console.log(`${key}: `, value);
    // }
    // console.log("files length: ", files.length);
    // how to console log formData values
    // for (const value of reqData.values()) {
    //   console.log(value);
    // }
  };

  const toggleModal = () => setOpenModal(!openModal);

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
    setOpenModal(false);
    setEditing({
      edit: false,
      data: null,
    });
    setDeleting({
      delete: false,
      id: null,
    });
    setOpenOptions(
      currentNotifications?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const onSubmit = async (data) => {
    if (!image) {
      toast.error("Vui lòng chọn hình ảnh!!!");
      return;
    }

    const formData = reqDataRef.current;
    if (!formData && !editing.edit) {
      toast.error("Dữ liệu ảnh không hợp lệ!!!");
      return;
    }

    const currentImageFormData = getValues("images") || null;
    let imagePath = null;
    if (formData)
      imagePath = await toast.promise(
        uploadHotelNotificationImageAPI(formData),
        {
          pending: "Đang tải ảnh lên...",
          success: "Tải ảnh thành công!!!",
          error: "Tải ảnh thất bại!",
        }
      );

    if (imagePath || currentImageFormData) {
      const createData = {
        ...data,
        images: imagePath ? imagePath.secure_url : currentImageFormData,
      };

      toast
        .promise(
          editing.edit
            ? dispatch(
                updateNotificationAPI({
                  notificationId: editing.data._id,
                  updateData: createData,
                })
              )
            : createNewNotificationAPI(createData),
          {
            pending: editing.edit
              ? "Đang chỉnh sửa thông báo..."
              : "Đang tạo thông báo mới...",
          }
        )
        .then((res) => {
          if (!res.error) {
            if (!editing.edit) {
              dispatch(addNotifications(res));
              socketIoInstance.emit("FE_SEND_NOTIFICATION", res);
            } else
              socketIoInstance.emit("FE_SEND_NOTIFICATION", {
                ...res,
                updated: true,
              });

            toast.success(
              editing.edit
                ? "Chỉnh sửa thành công"
                : "Tạo thông báo mới thành công!!!"
            );
          }

          handleReset();
          setImage(null);
          reset();
          reqDataRef.current = null;
        });
    }
  };

  const onDeleting = async () => {
    toast
      .promise(dispatch(deleteNotificationAPI(deleting.id)), {
        pending: "Đang xóa thông báo...",
      })
      .then((res) => {
        if (!res.error) {
          console.log("deleted: ", res);
          socketIoInstance.emit("FE_SEND_NOTIFICATION", res.meta.arg);
          toast.success("Xóa thông báo thành công!!!");
        }

        handleReset();
      });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchNotificationsAPI(location.search))
      .then(handleAfterGetNotifications)
      .finally(() => setLoading(false));
  }, [dispatch, location.search]);

  useEffect(() => {
    if (editing.edit && editing.data) {
      reset({
        name: editing.data.name || "",
        images: editing.data.images || null,
        message: editing.data.message || "",
      });

      setImage(editing.data.images || null);
    } else {
      reset({
        name: "",
        images: "",
        message: "",
      });

      setImage(null);
    }
  }, [editing, reset]);

  const tHeadStyle =
    "font-medium border border-gray-200 px-4 py-2 text-[18px] break-words whitespace-normal";
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
            editing.edit
              ? "Chỉnh sửa thông báo"
              : !deleting.delete
              ? "Thêm thông báo mới"
              : "Xóa thông báo"
          }
          handleCloseModal={() => handleReset()}
          modalStyle="w-[450px]"
        >
          {deleting.delete ? (
            <div className="mt-6 relative">
              <p className="text-black">
                Bạn có chắc chắn muốn xóa thông báo không? Sau khi xóa không thể
                hoàn tác!
              </p>

              <div className="flex justify-end">
                <div className="flex items-center gap-2 mt-8">
                  <Button
                    title="Trở lại"
                    type="cancel"
                    onClick={() => handleReset()}
                  />
                  <Button
                    title="Xóa thông báo"
                    type="warning"
                    onClick={onDeleting}
                  />
                </div>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-5 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="font-medium">
                  Tên phòng
                </label>
                <Input
                  name="name"
                  content="Nhập tên phòng"
                  {...register("name", {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 5,
                      message: "Tên tối thiểu 5 ký tự",
                    },
                    maxLength: {
                      value: 50,
                      message: "Tên tối đa 50 ký tự",
                    },
                  })}
                  error={errors?.name}
                />
              </div>

              <Input
                type="file"
                image={image}
                handleImageChange={handleImageChange}
                style="sm:w-[400px] w-[350px]"
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="font-medium">
                  Nội dung
                </label>
                <Input
                  name="message"
                  content="Nhập nội dung"
                  type="textarea"
                  style="pt-3"
                  {...register("message", {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 5,
                      message: "Nội dung tối thiểu 5 ký tự",
                    },
                    maxLength: {
                      value: 150,
                      message: "Nội dung tối đa 150 ký tự",
                    },
                  })}
                  error={errors?.message}
                />
              </div>

              <div className="flex justify-end mt-5">
                <Button
                  title={editing.edit ? "Chỉnh sửa" : "Thêm thông báo"}
                  type="submit"
                />
              </div>
            </form>
          )}
        </Modal>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-medium">Quản lý thông báo</h3>
        <Button title="Thêm thông báo mới" onClick={toggleModal} />
      </div>

      <table className="table-fixed w-full border border-gray-200 bg-white rounded-md shadow-sm my-8">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className={`${tHeadStyle} w-[200px]`}>Hình ảnh</th>
            <th className={`${tHeadStyle}`}>Tên phòng</th>
            <th className={`${tHeadStyle}`}>Nội dung</th>
            <th className={`${tHeadStyle} w-[100px]`}></th>
          </tr>
        </thead>
        <tbody>
          {currentNotifications?.map((notify, index) => (
            <tr key={index} className="text-center">
              <td className={`${tHeadStyle}`}>
                <img
                  src={notify?.images}
                  className="object-cover w-[200px] h-[150px] mx-auto rounded-sm"
                  alt=""
                />
              </td>
              <td className={`${tHeadStyle}`}>{notify?.name}</td>
              <td className={`${tHeadStyle}`}>{notify?.message}</td>
              <td className={`${tHeadStyle} relative`}>
                <div className="relative">
                  <Ellipsis
                    size={18}
                    className="cursor-pointer mx-auto"
                    onClick={() => handleToggle("options", index)}
                  />

                  {openOptions?.[index]?.open && (
                    <ul
                      className="w-[150px] bg-white shadow-md z-100
                  border border-slate-100 rounded-sm absolute bottom-[-calc(50%)] text-[14px] right-0"
                    >
                      <li
                        className={`${optionStyle} border-b border-slate-200 `}
                        onClick={() => handleToggle("edit", notify)}
                      >
                        Chỉnh sửa
                      </li>
                      <li
                        className={`${optionStyle}`}
                        onClick={() => handleToggle("delete", notify?._id)}
                      >
                        Xóa thông báo
                      </li>
                    </ul>
                  )}
                </div>
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

export default NotificationManagement;
