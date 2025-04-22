import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import BookingCard from "~/pages/Booking/BookingCard/BookingCard";
import BookingHeading from "~/pages/Booking/BookingHeading/BookingHeading";
import BookingSeparate from "~/pages/Booking/BookingSeparate/BookingSeparate";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";
import { capitalizeWords } from "~/utils/formatters";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
} from "~/utils/validators";
import NoUser from "/none-user.webp";
import { useNavigate } from "react-router-dom";

const orderInfo = {
  roomImage:
    "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
  checkInDate: "2023-10-01",
  checkOutDate: "2023-10-05",
  guest: 1,
  totalPrice: 400,
};

const BookingInfo = () => {
  const currentUser = useSelector(selectCurrentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentUser?.username,
      email: currentUser?.email,
      phone: currentUser?.phone,
      note: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
  };

  const inputLabelStyle = "text-[16px] font-medium text-[#181A18]";

  return (
    <div className="mt-12">
      <BookingHeading
        heading="Thông tin đặt phòng"
        subHeading="Vui lòng điền đầy đủ thông tin"
      />

      <div className="flex gap-24 items-center justify-center relative">
        <BookingCard orderInfo={orderInfo} />
        <BookingSeparate />

        <form onSubmit={handleSubmit(onSubmit)}>
          <img
            src={currentUser?.avatar || NoUser}
            className="w-24 h-24 mx-auto rounded-full border-[2px] border-blue-400"
            alt=""
          />
          <div className="flex flex-col gap-5 mt-8 mb-10 items-center">
            <div className="flex flex-col gap-1">
              <h6 className={inputLabelStyle}>
                {capitalizeWords("Họ và tên")}
              </h6>
              <Input
                name="name"
                content="Họ và tên"
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

            <div className="flex flex-col gap-1">
              <h6 className={inputLabelStyle}>{capitalizeWords("Email")}</h6>
              <Input
                name="email"
                content="Email"
                type="email"
                {...register("email", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE,
                  },
                })}
                error={errors?.email}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h6 className={inputLabelStyle}>
                {capitalizeWords("Số điện thoại")}
              </h6>
              <Input
                name="phone"
                content="Số điện thoại"
                {...register("phone", {
                  required: FIELD_REQUIRED_MESSAGE,
                })}
                error={errors?.phone}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h6 className={inputLabelStyle}>
                {capitalizeWords("Ghi chú thêm (nếu có)")}
              </h6>
              <Input
                name="note"
                content="Nội dung ghi chú"
                {...register("note", {
                  required: FIELD_REQUIRED_MESSAGE,
                })}
                error={errors?.note}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-3 items-center mt-12">
        <Button
          onClick={() => navigate("/booking/payment")}
          title="Tiếp tục đặt phòng"
          style="w-[300px] p-6"
        />
        <Button
          onClick={() => navigate(-1)}
          title="Trở lại"
          style="w-[300px] font-medium"
          type="cancel-secondary"
        />
      </div>
    </div>
  );
};

export default BookingInfo;
