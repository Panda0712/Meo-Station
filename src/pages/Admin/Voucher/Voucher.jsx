import { Spin } from "antd";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createNewVoucherAPI,
  deleteVoucherAPI,
  getListVouchersAPI,
  updateVoucherAPI,
} from "~/apis";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import Modal from "~/components/Modal/Modal";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";
import { formatDateV2 } from "~/utils/formatters";
import { FIELD_REQUIRED_MESSAGE } from "~/utils/validators";

const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [totalVouchers, setTotalVouchers] = useState(null);
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

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || 1);
  const totalPages = Math.ceil(totalVouchers / DEFAULT_ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const updateStateData = (res) => {
    setVouchers(res.vouchers || []);
    setTotalVouchers(res.totalVouchers || 0);
    setOpenOptions(
      res.vouchers?.map((_, index) => ({
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
      usedCount: editing.edit ? getValues("usedCount") : 0,
      expiredAt: new Date(data.expiredAt).getTime(),
    };

    toast
      .promise(
        editing.edit
          ? updateVoucherAPI(editing.data._id, apiData)
          : createNewVoucherAPI(apiData),
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
          handleAfterCUDNewVoucher();
        }

        handleReset();
        reset();
      });
  };

  const onDeleting = async () => {
    toast
      .promise(deleteVoucherAPI(deleting.id), {
        pending: "Đang xóa voucher...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa voucher thành công!!!");
          handleAfterCUDNewVoucher();
        }
      });

    handleReset();
  };

  const handleAfterCUDNewVoucher = () => {
    getListVouchersAPI(location.search).then(updateStateData);
  };

  useEffect(() => {
    setLoading(true);
    getListVouchersAPI(location.search)
      .then(updateStateData)
      .finally(() => setLoading(false));
  }, [location.search]);

  useEffect(() => {
    if (editing.edit && editing.data) {
      reset({
        name: editing.data.name || "",
        discount: editing.data.discount || 0,
        hotelIds: editing.data.hotelIds || null,
        code: editing.data.code || "",
        usageLimit: editing.data.usageLimit || 1,
        usedCount: editing.data.usedCount || 0,
        minOrderValue: editing.data.minOrderValue || 0,
        expiredAt: formatDateV2(editing.data.expiredAt) || null,
      });
    } else {
      reset({
        name: "",
        discount: 0,
        hotelIds: null,
        code: "",
        usageLimit: 1,
        usedCount: 0,
        minOrderValue: 0,
        expiredAt: null,
      });
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
              ? "Chỉnh sửa voucher"
              : !deleting.delete
              ? "Thêm voucher mới"
              : "Xóa voucher"
          }
          handleCloseModal={() => handleReset()}
          modalStyle="w-[450px]"
        >
          {deleting.delete ? (
            <div className="mt-6 relative">
              <p className="text-black">
                Bạn có chắc chắn muốn xóa voucher không? Sau khi xóa không thể
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
                    title="Xóa voucher"
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
                  Tên voucher
                </label>
                <Input
                  name="name"
                  content="Nhập tên voucher"
                  {...register("name", {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 5,
                      message: "Voucher tối thiểu 5 ký tự",
                    },
                    maxLength: {
                      value: 50,
                      message: "Voucher tối đa 50 ký tự",
                    },
                  })}
                  error={errors?.name}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="discount" className="font-medium">
                  Giảm giá (%)
                </label>
                <Input
                  name="discount"
                  type="number"
                  content="Nhập giảm giá"
                  {...register("discount", {
                    required: FIELD_REQUIRED_MESSAGE,
                    min: {
                      value: 0,
                      message: "Giảm giá không được âm",
                    },
                    max: {
                      value: 100,
                      message: "Giảm giá không được quá 100%",
                    },
                  })}
                  error={errors?.discount}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="hotelIds" className="font-medium">
                  Áp dụng cho các phòng
                </label>
                <Input
                  name="hotelIds"
                  content="Nhập danh sách phòng"
                  type="textarea"
                  style="pt-3"
                  {...register("hotelIds", {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 24,
                      message: "Danh sách tối thiểu 24 ký tự",
                    },
                    maxLength: {
                      value: 350,
                      message: "Mô tả tối đa 350 ký tự",
                    },
                  })}
                  error={errors?.hotelIds}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="code" className="font-medium">
                  Mã voucher
                </label>
                <Input
                  name="code"
                  content="Nhập mã voucher"
                  type="textarea"
                  style="pt-3"
                  {...register("code", {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: {
                      value: 5,
                      message: "Voucher tối thiểu 5 ký tự",
                    },
                    maxLength: {
                      value: 10,
                      message: "Voucher tối đa 10 ký tự",
                    },
                  })}
                  error={errors?.code}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="usageLimit" className="font-medium">
                  Giới hạn sử dụng
                </label>
                <Input
                  name="usageLimit"
                  content="Nhập giới hạn sử dụng"
                  type="number"
                  {...register("usageLimit", {
                    required: FIELD_REQUIRED_MESSAGE,
                    min: {
                      value: 1,
                      message: "Giới hạn sử dụng không được âm",
                    },
                  })}
                  error={errors?.usageLimit}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="minOrderValue" className="font-medium">
                  Giá áp dụng tối thiểu
                </label>
                <Input
                  name="minOrderValue"
                  content="Nhập giá áp dụng tối thiểu"
                  type="number"
                  {...register("minOrderValue", {
                    required: FIELD_REQUIRED_MESSAGE,
                    min: {
                      value: 0,
                      message: "Giá áp dụng tối thiểu không được âm",
                    },
                  })}
                  error={errors?.minOrderValue}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="expiredAt" className="font-medium">
                  Thời hạn
                </label>
                <Input
                  name="expiredAt"
                  content="Nhập thời hạn"
                  type="date"
                  {...register("expiredAt", {
                    required: FIELD_REQUIRED_MESSAGE,
                    min: {
                      value: new Date(),
                      message: "Thời hạn không được quá hiện tại",
                    },
                  })}
                  error={errors?.expiredAt}
                />
              </div>

              <div className="flex justify-end mt-5">
                <Button title={editing.edit ? "Chỉnh sửa" : "Thêm voucher"} />
              </div>
            </form>
          )}
        </Modal>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-medium">Quản lý voucher</h3>
        <Button title="Thêm voucher mới" onClick={toggleOpenModal} />
      </div>

      <table className="table-fixed w-full border border-gray-200 bg-white rounded-md shadow-sm my-8">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className={`${tHeadStyle} w-[150px]`}>Tên</th>
            <th className={`${tHeadStyle}`}>Khuyến mãi</th>
            <th className={`${tHeadStyle}`}>Mã voucher</th>
            <th className={`${tHeadStyle}`}>Giới hạn</th>
            <th className={`${tHeadStyle}`}>Đã sử dụng</th>
            <th className={`${tHeadStyle}`}>Giá tối thiểu</th>
            <th className={`${tHeadStyle}`}>Thời hạn</th>
            <th className={`${tHeadStyle} w-[100px]`}></th>
          </tr>
        </thead>
        <tbody>
          {vouchers?.map((voucher, index) => (
            <tr key={index} className="text-center">
              <td className={`${tHeadStyle}`}>{voucher?.name}</td>
              <td className={`${tHeadStyle}`}>{voucher?.discount}</td>
              <td className={`${tHeadStyle}`}>{voucher?.code}</td>
              <td className={`${tHeadStyle}`}>{voucher?.usageLimit}</td>
              <td className={`${tHeadStyle}`}>{voucher?.usedCount}</td>
              <td className={`${tHeadStyle}`}>{voucher?.minOrderValue}</td>
              <td className={`${tHeadStyle}`}>
                {formatDateV2(voucher?.expiredAt)}
              </td>
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
                        onClick={() => handleToggle("edit", voucher)}
                      >
                        Chỉnh sửa
                      </li>
                      <li
                        className={`${optionStyle}`}
                        onClick={() => handleToggle("delete", voucher?._id)}
                      >
                        Xóa voucher
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

export default VoucherManagement;
