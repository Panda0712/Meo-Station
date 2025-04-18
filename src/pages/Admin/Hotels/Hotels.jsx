import { Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createNewHotelAPI,
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

// const listHotels = [
//   {
//     name: "CineBox 03",
//     location: "25A, 3/2, HCM",
//     description: "BlissHome Number 1",
//     images: [
//       "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/1-20241130121516-twsr-.jpg",
//       "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
//       "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
//     ],
//     utilities: [
//       {
//         type: "bedroom",
//         value: "5 phòng ngủ",
//       },
//       {
//         type: "livingRoom",
//         value: "1 phòng khách",
//       },
//       {
//         type: "bathroom",
//         value: "3 phòng tắm",
//       },
//       {
//         type: "diningRoom",
//         value: "1 phòng ăn",
//       },
//       {
//         type: "internet",
//         value: "10 mbp/s",
//       },
//       {
//         type: "coldMachine",
//         value: "7 máy lạnh",
//       },
//       {
//         type: "refrigerator",
//         value: "2 tủ lạnh",
//       },
//       {
//         type: "TV",
//         value: "4 tivi",
//       },
//     ],
//     pricePerNight: 300,
//     priceFirstHour: 80,
//     priceEachHour: 100,
//     discount: 20,
//   },
// ];

const HotelsManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(null);
  const [editing, setEditing] = useState({
    edit: false,
    data: null,
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

  const handleToggleEditing = (data) => {
    setOpenModal(true);
    setEditing({
      edit: true,
      data,
    });
  };

  const handleResetEditing = () => {
    setEditing({
      edit: false,
      data: null,
    });
    setOpenModal(false);
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

  const onSubmit = async (data) => {
    if (!images.length) {
      toast.error("Vui lòng chọn ảnh trước khi tạo!!!");
      return;
    }

    // let isImagesListDifferent = false;
    // const currentImagesFormData = getValues("images") || [];
    // console.log("current Form Data: ", currentImagesFormData);

    // if (editing.data) {
    //   const checkHotel = hotels.find((i) => i._id === editing.data._id)?.images;
    //   console.log("check Hotel: ", checkHotel);

    //   isImagesListDifferent = checkHotel.some(
    //     (image, index) => image !== currentImagesFormData[index]
    //   );
    // }

    const formData = reqDataRef.current;
    if (!formData && !editing.edit) {
      toast.error("Dữ liệu ảnh không hợp lệ!!!");
      return;
    }

    const currentImagesFormData = getValues("images") || [];
    let imagesList = [];
    // console.log("is Image Different: ", isImagesListDifferent);
    if (formData)
      imagesList = await toast.promise(uploadHotelImagesAPI(formData), {
        pending: "Đang tải ảnh lên...",
        success: "Tải ảnh thành công!!!",
        error: "Tải ảnh thất bại!",
      });

    console.log("image List: ", imagesList);
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
            handleAfterCreateUpdateNewHotel();
          }

          if (editing.edit) handleResetEditing();
          setImages([]);
          reset();
          setOpenModal(false);
          reqDataRef.current = null;
        });
    }
  };

  const handleAfterCreateUpdateNewHotel = () => {
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
    }
  }, [editing, reset]);

  const tHeadStyle = "font-medium border border-gray-200 px-4 py-2 text-[18px]";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  return (
    <div className="flex flex-col">
      {openModal && (
        <Modal
          title={editing.edit ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
          handleCloseModal={() => setOpenModal(false)}
          modalStyle="w-[450px]"
        >
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
                <Ellipsis
                  size={18}
                  className="cursor-pointer mx-auto"
                  onClick={() => handleToggleOptions(index)}
                />

                {openOptions[index]?.open && (
                  <ul
                    className="w-[150px] bg-white shadow-md z-100
                  border border-slate-100 rounded-sm absolute bottom-[-75px] text-[14px] right-0"
                  >
                    <li className={`${optionStyle} border-b border-slate-200`}>
                      Xem thông tin
                    </li>
                    <li
                      className={`${optionStyle} border-b border-slate-200 `}
                      onClick={() => handleToggleEditing(hotel)}
                    >
                      Chỉnh sửa
                    </li>
                    <li className={`${optionStyle}`}>Xóa phòng</li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelsManagement;
