import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import { loginUserAPI } from "~/redux/activeUser/activeUserSlice";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import MeoLogo from "/panda-logo.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchParams] = useSearchParams();
  const registeredEmail = searchParams.get("registeredEmail");
  const verifiedEmail = searchParams.get("verifiedEmail");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password } = data;
    toast
      .promise(dispatch(loginUserAPI({ email, password })), {
        pending: "Đang đăng nhập....",
      })
      .then((res) => {
        if (!res.error) {
          navigate("/");
          toast.success("Đăng nhập thành công!!!");
        }
      });
  };

  return (
    <form className="pt-12 pb-16" onSubmit={handleSubmit(onSubmit)}>
      <img src={MeoLogo} className="w-28 h-28 mx-auto" alt="" />
      <h2 className="font-bold text-[36px] text-center">
        Đăng nhập vào <span className="text-blue-600">Meo</span>Station.
      </h2>

      {verifiedEmail && (
        <p className="max-w-[300px] mt-4 mx-auto text-center">
          Email của bạn: <span className="text-green-500">{verifiedEmail}</span>{" "}
          đã được xác thực. Vui lòng đăng nhập để trải nghiệm dịch vụ
        </p>
      )}
      {registeredEmail && (
        <p className="max-w-[300px] mt-4 mx-auto text-center">
          Email xác thực đã được gửi tới:{" "}
          <span className="text-green-500">{registeredEmail}</span>. Vui lòng
          xác thực để trải nghiệm dịch vụ
        </p>
      )}

      <div className="flex flex-col mt-8 mb-10 items-center text-right">
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

        <p className="text-right mt-2">
          Chưa có tài khoản?
          <Link to="/register">
            <span className="ml-2 transition hover:underline hover:opacity-90 hover:text-black-300]">
              Đăng kí ngay
            </span>
          </Link>
        </p>
      </div>

      <div className="flex justify-center">
        <Button title="Đăng nhập" type="submit" />
      </div>
    </form>
  );
};

export default Login;
