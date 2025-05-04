/* eslint-disable react-hooks/exhaustive-deps */
import { Spin } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createNewHotelAPI,
  deleteHotelAPI,
  fetchHotelsAPI,
  updateHotelAPI,
  uploadHotelImagesAPI,
} from "~/apis";
import AdminTable from "~/components/AdminTable/AdminTable";
import Button from "~/components/Button/Button";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal/DeleteConfirmationModal";
import FormModal from "~/components/FormModal/FormModal";
import Input from "~/components/Input/Input";
import Pagination from "~/components/Pagination/Pagination";
import useHotelTable from "~/hooks/useHotelTable";
import { FIELD_REQUIRED_MESSAGE } from "~/utils/validators";

const HotelsManagement = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const {
    dataHotels: hotels,
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
  } = useHotelTable({
    fetchDataFn: fetchHotelsAPI,
    createDataFn: createNewHotelAPI,
    updateDataFn: updateHotelAPI,
    deleteDataFn: deleteHotelAPI,
    uploadImageFn: uploadHotelImagesAPI,
    currentImagesFormData: getValues("images") || [],
    dataKey: "hotels",
    totalKey: "totalHotels",
    imageKey: "hotel-images",
    resetFn: reset,
  });

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

  const headerList = [
    {
      label: "Hình ảnh",
      width: "w-[200px]",
    },
    {
      label: "Tên",
    },
    {
      label: "Địa chỉ",
    },
    {
      label: "Giá mỗi đêm",
      width: "w-[150px]",
    },
    {
      label: "",
      width: "w-[100px]",
    },
  ];

  const tHeadStyle =
    "font-medium border border-gray-200 px-4 py-2 md:text-[18px] sm:text-[16px] text-[14px] break-words whitespace-normal";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex flex-col max-md:overflow-auto min-h-screen">
      <DeleteConfirmationModal
        isOpen={openModal}
        onClose={handleReset}
        onConfirm={onDeleting}
        title="Xóa phòng"
        message="Bạn có chắc chắn muốn xóa phòng không? Sau khi xóa không thể hoàn tác!"
        confirmButtonText="Xóa"
        cancelButtonText="Trở lại"
        modalStyle="w-[450px]"
      />

      <FormModal
        isOpen={openModal && !deleting.delete}
        onClose={handleReset}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        title={editing.edit ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
        submitButtonText={editing.edit ? "Chỉnh sửa" : "Thêm phòng"}
        modalStyle="w-[450px]"
      >
        <div
          className="sm:max-w-[400px] sm:w-[400px] w-[300px] 
              flex flex-col gap-1"
        >
          <label htmlFor="title" className="font-medium">
            Tên phòng
          </label>
          <Input
            name="title"
            style="w-[90%]!"
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

        <div className="sm:max-w-[400px] sm:w-[400px] w-[300px] flex flex-col gap-1">
          <label htmlFor="location" className="font-medium">
            Địa chỉ
          </label>
          <Input
            name="location"
            style="w-[90%]!"
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

        <div
          className="sm:max-w-[400px] sm:w-[400px] w-[300px] 
              flex flex-col gap-1"
        >
          <label htmlFor="description" className="font-medium">
            Mô tả
          </label>
          <Input
            name="description"
            content="Nhập mô tả"
            type="textarea"
            style="pt-3 w-[90%]!"
            {...register("description", {
              required: FIELD_REQUIRED_MESSAGE,
              minLength: {
                value: 5,
                message: "Mô tả tối thiểu 5 ký tự",
              },
              maxLength: {
                value: 350,
                message: "Mô tả tối đa 350 ký tự",
              },
            })}
            error={errors?.description}
          />
        </div>

        <div
          className="sm:max-w-[400px] sm:w-[400px] w-[300px] 
              flex flex-col gap-1"
        >
          <label htmlFor="utilities" className="font-medium max-w-sm">
            Tiện ích (Nhập theo thứ tự: số phòng ngủ, phòng khách, phòng tắm,
            phòng ăn, tốc độ internet, số máy lạnh, số tủ lạnh, TV) * Lưu ý:
            Nhập cách nhau bởi dấu phẩy và khoảng trắng
          </label>
          <Input
            name="utilities"
            content="Nhập tiện ích"
            type="textarea"
            style="pt-3 w-[90%]!"
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

        <div
          className="sm:max-w-[400px] sm:w-[400px] w-[300px] 
              flex flex-col gap-1"
        >
          <label htmlFor="maxGuest" className="font-medium">
            Số khách tối đa
          </label>
          <Input
            name="maxGuest"
            style="w-[90%]!"
            content="Nhập số khách tối đa"
            type="number"
            {...register("maxGuest", {
              required: FIELD_REQUIRED_MESSAGE,
            })}
            error={errors?.maxGuest}
          />
        </div>

        <div
          className="sm:max-w-[400px] sm:w-[400px] w-[300px] 
              flex flex-col gap-1"
        >
          <label htmlFor="pricePerNight" className="font-medium">
            Giá mỗi đêm
          </label>
          <Input
            name="pricePerNight"
            style="w-[90%]!"
            content="Nhập giá mỗi đêm"
            type="number"
            {...register("pricePerNight", {
              required: FIELD_REQUIRED_MESSAGE,
            })}
            error={errors?.pricePerNight}
          />
        </div>

        <div
          className="sm:max-w-[400px] sm:w-[400px] w-[300px] 
              flex flex-col gap-1"
        >
          <label htmlFor="priceFirstHour" className="font-medium">
            Giá giờ đầu
          </label>
          <Input
            name="priceFirstHour"
            style="w-[90%]!"
            content="Nhập giá giờ đầu"
            type="number"
            {...register("priceFirstHour", {
              required: FIELD_REQUIRED_MESSAGE,
            })}
            error={errors?.priceFirstHour}
          />
        </div>

        <div
          className="sm:max-w-[400px] sm:w-[400px] w-[300px] 
              flex flex-col gap-1"
        >
          <label htmlFor="priceEachHour" className="font-medium">
            Giá gốc
          </label>
          <Input
            name="priceEachHour"
            style="w-[90%]!"
            content="Nhập giá gốc"
            type="number"
            {...register("priceEachHour", {
              required: FIELD_REQUIRED_MESSAGE,
            })}
            error={errors?.priceEachHour}
          />
        </div>

        <div
          className="sm:max-w-[400px] sm:w-[400px] w-[300px] 
              flex flex-col gap-1"
        >
          <label htmlFor="discount" className="font-medium">
            Khuyến mãi
          </label>
          <Input
            name="discount"
            style="w-[90%]!"
            content="Nhập khuyến mãi"
            type="number"
            {...register("discount", {
              required: FIELD_REQUIRED_MESSAGE,
            })}
            error={errors?.discount}
          />
        </div>
      </FormModal>

      <div className="flex md:flex-nowrap flex-wrap gap-5 items-center justify-between">
        <h3
          className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]
         font-medium"
        >
          Quản lý phòng
        </h3>
        <Button
          title="Thêm phòng mới"
          style="md:text-[16px] text-[14px]"
          onClick={toggleOpenModal}
        />
      </div>

      <AdminTable
        headers={headerList}
        data={hotels}
        renderRow={(hotel) => (
          <>
            <td className={`${tHeadStyle}`}>
              <img
                src={hotel?.images[0]}
                className="object-cover md:w-[200px] md:h-[150px] sm:w-[150px] sm:h-[100px] 
                  w-[120px] h-[80px] mx-auto rounded-sm"
                alt=""
              />
            </td>
            <td className={`${tHeadStyle}`}>{hotel?.title}</td>
            <td className={`${tHeadStyle}`}>{hotel?.location}</td>
            <td className={`${tHeadStyle}`}>{hotel?.pricePerNight}</td>
          </>
        )}
        openOptions={openOptions}
        handleToggleOptions={(idx) => handleToggle("options", idx)}
        optionItems={[
          {
            label: "Xem thông tin",
            onClick: () => {},
          },
          {
            label: "Chỉnh sửa",
            onClick: (hotel) => handleToggle("edit", hotel),
          },
          {
            label: "Xóa phòng",
            onClick: (hotel) => handleToggle("delete", hotel?._id),
          },
        ]}
        tHeadStyle={tHeadStyle}
        optionStyle={optionStyle}
        responsiveStyle="max-md:min-w-[800px]"
      />

      {totalPages > 1 && (
        <Pagination
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default HotelsManagement;
