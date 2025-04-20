import { Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createNewHotelAPI,
  deleteHotelAPI,
  fetchHotelsAPI,
  updateHotelAPI,
  uploadHotelImagesAPI,
} from "~/apis";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import Modal from "~/components/Modal/Modal";
import { UTILITIES_LIST } from "~/utils/constants";
import {
  FIELD_REQUIRED_MESSAGE,
  singleFileValidator,
} from "~/utils/validators";

const HotelsManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(null);
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

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const location = useLocation();
  // const query = new URLSearchParams(location.search);

  // const page = parseInt(query.get("page") || "1", 10);

  const reqDataRef = useRef(null);

  const updateStateData = (res) => {
    setHotels(res.hotels || []);
    setTotalHotels(res.totalHotels || 0);
    setOpenOptions(
      res.hotels?.map((_, index) => ({
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
      formData.append("hotel-images", file);
    });

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
      .promise(deleteHotelAPI(deleting.id), {
        pending: "Đang xóa phòng...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa phòng thành công!!!");
          handleAfterCUDNewHotel();
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

    const currentImagesFormData = getValues("images") || [];
    let imagesList = [];
    if (formData)
      imagesList = await toast.promise(uploadHotelImagesAPI(formData), {
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
            ? updateHotelAPI(editing.data._id, apiData)
            : createNewHotelAPI(apiData),
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
            handleAfterCUDNewHotel();
          }

          handleReset();
          setImages([]);
          reset();
          reqDataRef.current = null;
        });
    }
  };

  const handleAfterCUDNewHotel = () => {
    fetchHotelsAPI(location.search).then(updateStateData);
  };

  useEffect(() => {
    fetchHotelsAPI(location.search).then(updateStateData);
  }, [location.search]);

  useEffect(() => {
    if (editing.edit && editing.data) {
      reset({
        title: editing.data.title || "",
        location: editing.data.location || "",
        description: editing.data.description || "",
        images: editing.data.images || [],
        utilities: editing.data.utilities?.map((u) => u.value).join(", ") || "",
        maxGuest: editing.data.maxGuest || "",
        pricePerNight: editing.data.pricePerNight || "",
        priceFirstHour: editing.data.priceFirstHour || "",
        priceEachHour: editing.data.priceEachHour || "",
        discount: editing.data.discount || "",
      });

      setImages(editing.data.images || []);
    } else {
      reset({
        title: "",
        location: "",
        description: "",
        images: [],
        utilities: "",
        maxGuest: "",
        pricePerNight: "",
        priceFirstHour: "",
        priceEachHour: "",
        discount: "",
      });

      setImages([]);
    }
  }, [editing, reset]);

  const tHeadStyle =
    "font-medium border border-gray-200 px-4 py-2 text-[18px] break-words whitespace-normal";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  return (
    <div className="flex flex-col">
      {openModal && (
        <Modal
          title={
            editing.edit
              ? "Chỉnh sửa phòng"
              : !deleting.delete
              ? "Thêm phòng mới"
              : "Xóa phòng"
          }
          handleCloseModal={() => handleReset()}
          modalStyle="w-[450px]"
        >
          {deleting.delete ? (
            <div className="mt-6 relative">
              <p className="text-black">
                Bạn có chắc chắn muốn xóa phòng không? Sau khi xóa không thể
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
                    title="Xóa phòng"
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
                <label htmlFor="title" className="font-medium">
                  Tên phòng
                </label>
                <Input
                  name="title"
                  content="Nhập tên phòng"
                  {...register("title", {
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
                  error={errors?.title}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="location" className="font-medium">
                  Địa chỉ
                </label>
                <Input
                  name="location"
                  content="Nhập địa chỉ"
                  {...register("location", {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 5,
                      message: "Địa chỉ tối thiểu 5 ký tự",
                    },
                    maxLength: {
                      value: 80,
                      message: "Địa chỉ tối đa 50 ký tự",
                    },
                  })}
                  error={errors?.location}
                />
              </div>

              <Input
                type="file"
                images={images}
                handleImageChange={handleImageChange}
                multiple
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="font-medium">
                  Mô tả
                </label>
                <Input
                  name="description"
                  content="Nhập mô tả"
                  type="textarea"
                  style="pt-3"
                  {...register("description", {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 5,
                      message: "Mô tả tối thiểu 5 ký tự",
                    },
                    maxLength: {
                      value: 150,
                      message: "Mô tả tối đa 150 ký tự",
                    },
                  })}
                  error={errors?.description}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="utilities" className="font-medium">
                  Tiện ích (Nhập theo thứ tự: số phòng ngủ, phòng khách, phòng
                  tắm, phòng ăn, tốc độ internet, số máy lạnh, số tủ lạnh, TV) *
                  Lưu ý: Nhập cách nhau bởi dấu phẩy và khoảng trắng
                </label>
                <Input
                  name="utilities"
                  content="Nhập tiện ích"
                  type="textarea"
                  style="pt-3"
                  {...register("utilities", {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 5,
                      message: "Tiện ích tối thiểu 5 ký tự",
                    },
                    maxLength: {
                      value: 150,
                      message: "Tiện ích tối đa 150 ký tự",
                    },
                  })}
                  error={errors?.utilities}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="maxGuest" className="font-medium">
                  Số khách tối đa
                </label>
                <Input
                  name="maxGuest"
                  content="Nhập số khách tối đa"
                  type="number"
                  {...register("maxGuest", {
                    required: FIELD_REQUIRED_MESSAGE,
                  })}
                  error={errors?.maxGuest}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="pricePerNight" className="font-medium">
                  Giá mỗi đêm
                </label>
                <Input
                  name="pricePerNight"
                  content="Nhập giá mỗi đêm"
                  type="number"
                  {...register("pricePerNight", {
                    required: FIELD_REQUIRED_MESSAGE,
                  })}
                  error={errors?.pricePerNight}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="priceFirstHour" className="font-medium">
                  Giá giờ đầu
                </label>
                <Input
                  name="priceFirstHour"
                  content="Nhập giá giờ đầu"
                  type="number"
                  {...register("priceFirstHour", {
                    required: FIELD_REQUIRED_MESSAGE,
                  })}
                  error={errors?.priceFirstHour}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="priceEachHour" className="font-medium">
                  Giá gốc
                </label>
                <Input
                  name="priceEachHour"
                  content="Nhập giá gốc"
                  type="number"
                  {...register("priceEachHour", {
                    required: FIELD_REQUIRED_MESSAGE,
                  })}
                  error={errors?.priceEachHour}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="discount" className="font-medium">
                  Khuyến mãi
                </label>
                <Input
                  name="discount"
                  content="Nhập khuyến mãi"
                  type="number"
                  {...register("discount", {
                    required: FIELD_REQUIRED_MESSAGE,
                  })}
                  error={errors?.discount}
                />
              </div>

              <div className="flex justify-end mt-5">
                <Button title={editing.edit ? "Chỉnh sửa" : "Thêm phòng"} />
              </div>
            </form>
          )}
        </Modal>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-medium">Quản lý phòng</h3>
        <Button title="Thêm phòng mới" onClick={toggleOpenModal} />
      </div>

      <table className="table-fixed w-full border border-gray-200 bg-white rounded-md shadow-sm my-8">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className={`${tHeadStyle} w-[200px]`}>Hình ảnh</th>
            <th className={`${tHeadStyle}`}>Tên</th>
            <th className={`${tHeadStyle}`}>Địa chỉ</th>
            <th className={`${tHeadStyle} w-[150px]`}>Giá mỗi đêm</th>
            <th className={`${tHeadStyle} w-[100px]`}></th>
          </tr>
        </thead>
        <tbody>
          {hotels?.map((hotel, index) => (
            <tr key={index} className="text-center">
              <td className={`${tHeadStyle}`}>
                <img
                  src={hotel?.images[0]}
                  className="object-cover w-[200px] h-[150px] mx-auto rounded-sm"
                  alt=""
                />
              </td>
              <td className={`${tHeadStyle}`}>{hotel?.title}</td>
              <td className={`${tHeadStyle}`}>{hotel?.location}</td>
              <td className={`${tHeadStyle}`}>{hotel?.pricePerNight}</td>
              <td className={`${tHeadStyle} relative`}>
                <div className="relative">
                  <Ellipsis
                    size={18}
                    className="cursor-pointer mx-auto"
                    onClick={() => handleToggle("options", index)}
                  />

                  {openOptions[index]?.open && (
                    <ul
                      className="w-[150px] bg-white shadow-md z-100
                  border border-slate-100 rounded-sm absolute bottom-[-calc(50%)] text-[14px] right-0"
                    >
                      <li
                        className={`${optionStyle} border-b border-slate-200`}
                      >
                        Xem thông tin
                      </li>
                      <li
                        className={`${optionStyle} border-b border-slate-200 `}
                        onClick={() => handleToggle("edit", hotel)}
                      >
                        Chỉnh sửa
                      </li>
                      <li
                        className={`${optionStyle}`}
                        onClick={() => handleToggle("delete", hotel?._id)}
                      >
                        Xóa phòng
                      </li>
                    </ul>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelsManagement;
