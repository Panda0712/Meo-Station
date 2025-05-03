import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createNewContactAPI } from "~/apis";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PHONE_RULE,
  PHONE_RULE_MESSAGE,
} from "~/utils/validators";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    toast
      .promise(createNewContactAPI(data), {
        pending: "Đang gửi liên hệ...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Gửi liên hệ thành công!!!");
          reset();
        }
      });
  };

  return (
    <section className="lg:px-24 md:px-12 sm:px-8 px-4 py-16">
      <h3
        className="lg:text-[32px] md:text-[28px] sm:text-[24px] 
      text-[20px] text-[#152c5b] font-semibold mb-12"
      >
        Hãy cho chúng tôi biết thêm về bạn
      </h3>

      <div className="flex lg:flex-nowrap flex-wrap justify-between lg:gap-5 gap-12">
        <div className="relative">
          <h4
            className="lg:text-[24px] md:text-[22px] sm:text-[20px] 
          text-[18px] text-[#152c5b] font-medium mb-8"
          >
            Bạn muốn liên hệ chúng tôi vì điều gì?
          </h4>
          <form
            className="flex flex-col gap-[8px] relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              name="name"
              content="Nhập họ tên"
              {...register("name", {
                required: FIELD_REQUIRED_MESSAGE,
                minLength: {
                  value: 5,
                  message: "Tên tối thiểu 5 ký tự!",
                },
                maxLength: {
                  value: 50,
                  message: "Tên tối đa 50 ký tự!",
                },
              })}
              error={errors?.name}
              style="w-[90%]!"
            />
            <Input
              name="email"
              type="email"
              content="Nhập email"
              {...register("email", {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE,
                },
              })}
              error={errors?.email}
              style="w-[90%]!"
            />
            <Input
              name="phone"
              content="Nhập số điện thoại"
              {...register("phone", {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PHONE_RULE,
                  message: PHONE_RULE_MESSAGE,
                },
              })}
              error={errors?.phone}
              style="w-[90%]!"
            />
            <Input
              name="message"
              type="textarea"
              content="Nhập nội dung"
              {...register("message", {
                required: FIELD_REQUIRED_MESSAGE,
                minLength: {
                  value: 10,
                  message: "Nội dung tối thiểu 10 ký tự!",
                },
                maxLength: {
                  value: 200,
                  message: "Nội dung tối đa 200 ký tự!!!",
                },
              })}
              error={errors?.message}
              style="pt-3 w-[90%]!"
            />
            <div className="flex justify-start mt-1">
              <Button title="Gửi" type="submit" />
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-wrap items-start gap-[32px]">
            <p className="min-w-[180px] text-[24px] font-semibold">
              Đặt phòng:
            </p>
            <div className="text-[18px] text-[#181a18]">
              <h6>meostation@gmail.com</h6>
              <h6>0369332842</h6>
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-[32px]">
            <p className="min-w-[180px] text-[24px] font-semibold">Hotline:</p>
            <div className="text-[18px] text-[#181a18]">
              <h6>meohotline@gmail.com</h6>
              <h6>0903997865</h6>
            </div>
          </div>
          <div className="flex flex-wrap items-start gap-[32px]">
            <p className="min-w-[180px] text-[24px] font-semibold">
              Hỗ trợ dịch vụ:
            </p>
            <div className="text-[18px] text-[#181a18]">
              <h6>meoservice@gmail.com</h6>
              <h6>0903997864</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
