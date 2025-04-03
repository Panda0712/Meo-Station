import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import MeoLogo from "/panda-logo.png";
import { toast } from "react-toastify";
import { registerUserAPI } from "~/apis";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { username, email, password } = data;
    toast
      .promise(registerUserAPI({ username, email, password }), {
        pending: "Đang đăng ký tài khoản...",
      })
      .then((user) => {
        navigate(`/login?registeredEmail=${user.email}`);
        reset();
      });
  };

  return (
    <form className="pt-12 pb-16" onSubmit={handleSubmit(onSubmit)}>
      <img src={MeoLogo} className="w-28 h-28 mx-auto" alt="" />
      <h2 className="font-bold text-[36px] text-center">
        Đăng ký tài khoản <span className="text-blue-600">Meo</span>Station.
      </h2>

      <div className="flex flex-col mt-8 mb-10 items-center text-right">
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
        <Input
          name="username"
          content="Tên người dùng"
          {...register("username", {
            required: FIELD_REQUIRED_MESSAGE,
            minLength: {
              value: 5,
              message: "Tên người dùng tối thiểu 5 ký tự",
            },
            maxLength: {
              value: 50,
              message: "Tên người dùng tối đa 50 ký tự",
            },
          })}
          error={errors?.username}
        />
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
        <Input
          name="password"
          content="Mật khẩu"
          type="password"
          {...register("password", {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: PASSWORD_RULE,
              message: PASSWORD_RULE_MESSAGE,
            },
          })}
          error={errors?.password}
        />
        <Input
          name="confirm_password"
          content="Nhập lại mật khẩu"
          type="password"
          {...register("confirm_password", {
            validate: (value) => {
              if (value === watch("password")) return true;
              return PASSWORD_CONFIRMATION_MESSAGE;
            },
          })}
          error={errors?.confirm_password}
        />

        <p className="text-right mt-2">
          Đã có tài khoản?
          <Link to="/login">
            <span className="ml-2 transition hover:underline hover:opacity-90 hover:text-black-300">
              Đăng nhập ngay
            </span>
          </Link>
        </p>
      </div>

      <div className="flex justify-center">
        <Button title="Đăng ký" type="submit" />
      </div>
    </form>
  );
};

export default Register;
