import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  PHONE_RULE,
  PHONE_RULE_MESSAGE,
} from "~/utils/validators";
import NoUser from "/none-user.webp";

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

  const bookingData = JSON.parse(localStorage.getItem("booking-data"));
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const bookingInfo = {
      ...bookingData,
      userName: data.name,
      userEmail: data.email,
      phone: data.phone,
      note: data.note,
    };
    localStorage.setItem("booking-data", JSON.stringify(bookingInfo));
    navigate("/booking/payment");
  };

  if (!bookingData) navigate("/");

  const inputLabelStyle =
    "md:text-[16px] text-[14px] font-medium text-[#181A18]";

  return (
    <div className="mt-12">
      <BookingHeading
        heading="Thông tin đặt phòng"
        subHeading="Vui lòng điền đầy đủ thông tin"
      />

      <div
        className="flex lg:flex-row flex-col 
      lg:gap-24 gap-12 items-center justify-center relative"
      >
        <BookingCard bookingData={bookingData} />
        <BookingSeparate booking />

        <form onSubmit={handleSubmit(onSubmit)}>
          <img
            src={currentUser?.avatar || NoUser}
            className="w-24 h-24 mx-auto rounded-full border-[2px] border-blue-400"
            alt=""
          />
          <div className="flex flex-col gap-5 mt-8 mb-10 items-center">
            <div className="sm:max-w-[400px] sm:w-[400px] w-[300px] flex flex-col gap-1">
              <h6 className={inputLabelStyle}>
                {capitalizeWords("Họ và tên")}
              </h6>
              <Input
                name="name"
                style="w-full!"
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

            <div className="sm:max-w-[400px] sm:w-[400px] w-[300px] flex flex-col gap-1">
              <h6 className={inputLabelStyle}>{capitalizeWords("Email")}</h6>
              <Input
                name="email"
                content="Email"
                style="w-full!"
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

            <div className="sm:max-w-[400px] sm:w-[400px] w-[300px] flex flex-col gap-1">
              <h6 className={inputLabelStyle}>
                {capitalizeWords("Số điện thoại")}
              </h6>
              <Input
                name="phone"
                style="w-full!"
                content="Số điện thoại"
                {...register("phone", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PHONE_RULE,
                    message: PHONE_RULE_MESSAGE,
                  },
                })}
                error={errors?.phone}
              />
            </div>

            <div className="sm:max-w-[400px] sm:w-[400px] w-[300px] flex flex-col gap-1">
              <h6 className={inputLabelStyle}>
                {capitalizeWords("Ghi chú thêm (nếu có)")}
              </h6>
              <Input
                style="w-full!"
                name="note"
                content="Nội dung ghi chú"
                {...register("note")}
                error={errors?.note}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center mt-12">
            <Button
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default BookingInfo;
