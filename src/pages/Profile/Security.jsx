import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import Modal from "~/components/Modal/Modal";
import {
  logoutUserAPI,
  updateUserAPI,
} from "~/redux/activeUser/activeUserSlice";
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";

const Security = () => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const handleCloseModal = () => setOpenModal(false);

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleChangePassword = () => {
    const data = {
      current_password: watch("current_password"),
      new_password: watch("new_password"),
    };

    toast
      .promise(
        dispatch(
          updateUserAPI({
            current_password: data.current_password,
            new_password: data.new_password,
          })
        ),
        {
          pending: "Đang cập nhật thông tin...",
        }
      )
      .then((res) => {
        if (!res.error) {
          toast.success("Cập nhật thông tin thành công");
          reset();
          dispatch(logoutUserAPI(false));
        }
      });

    handleCloseModal();
  };

  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <form onSubmit={handleSubmit(handleModal)} className="mt-5">
        <div className="flex flex-col mb-5">
          <p>Mật khẩu cũ</p>
          <Input
            content="Nhập mật khẩu cũ"
            name="current_password"
            type="password"
            {...register("current_password", {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: PASSWORD_RULE,
                message: PASSWORD_RULE_MESSAGE,
              },
            })}
            error={errors?.current_password}
          />
        </div>
        <div className="flex flex-col mb-5">
          <p>Mật khẩu mới</p>
          <Input
            content="Nhập mật khẩu mới"
            name="new_password"
            type="password"
            {...register("new_password", {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: PASSWORD_RULE,
                message: PASSWORD_RULE_MESSAGE,
              },
            })}
            error={errors?.new_password}
          />
        </div>
        <div className="flex flex-col mb-5">
          <p>Nhập lại mật khẩu</p>
          <Input
            content="Nhập lại mật khẩu"
            name="confirm_password"
            type="password"
            {...register("confirm_password", {
              validate: (value) => {
                if (value === watch("new_password")) return true;
                return "Mật khẩu nhập lại chưa đúng!!!";
              },
            })}
            error={errors?.confirm_password}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" title="Cập nhật thông tin" />
        </div>
      </form>

      {openModal && (
        <Modal handleCloseModal={handleCloseModal} title="Xác nhận">
          <div className="mt-6 relative">
            <p className="text-black">
              Bạn có chắc chắn muốn đổi mật khẩu không?
            </p>
            <h6>Sau khi đổi phải đăng nhập lại</h6>

            <div className="flex justify-end">
              <div className="flex items-center gap-2 mt-8">
                <Button
                  title="Trở lại"
                  type="cancel"
                  onClick={handleCloseModal}
                />
                <Button
                  title="Đổi mật khẩu"
                  type="warning"
                  onClick={handleChangePassword}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Security;
