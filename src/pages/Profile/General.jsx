import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import {
  selectCurrentUser,
  updateUserAPI,
} from "~/redux/activeUser/activeUserSlice";
import { singleFileValidator } from "~/utils/validators";
import NoUser from "/none-user.webp";

const General = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [newDisplayName, setNewDisplayName] = useState(
    currentUser?.displayName
  );
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const error = singleFileValidator(event.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }

    // handle the preview image for the file input
    const file = event.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }

    // change avatar logic
    let reqData = new FormData();
    reqData.append("avatar", event.target?.files[0]);
    // how to console log formData values
    // for (const value of reqData.values()) {
    //   console.log(value);
    // }

    toast
      .promise(dispatch(updateUserAPI(reqData)), {
        pending: "Đang cập nhật hình ảnh...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Cập nhật hình ảnh thành công!!!");
        }

        event.target.value = "";
        setImage(null);
      });
  };

  const handleUpdateDisplayName = () => {
    if (newDisplayName === currentUser?.displayName || !newDisplayName) {
      toast.error("Tên không được để trống và phải khác tên cũ!!!");
      return;
    }

    toast
      .promise(dispatch(updateUserAPI({ displayName: newDisplayName })), {
        pending: "Đang cập nhật thông tin...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Cập nhật thông tin thành công");
        }
      });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <img
        src={currentUser?.avatar || NoUser}
        className="w-24 h-24 rounded-full border-[2px] border-blue-400"
        alt=""
      />
      <Input
        type="file"
        image={image}
        handleImageChange={handleImageChange}
        style="md:mx-auto mx-0 md:max-w-md w-full"
      />

      <div className="mt-5">
        <div className="relative sm:max-w-[400px] sm:w-[400px] w-[300px] flex flex-col mb-5">
          <p>Email</p>
          <Input
            content={currentUser?.email}
            name="email"
            type="email"
            style="w-full!"
            disabled
          />
        </div>
        <div className="flex flex-col mb-5">
          <p>Tên người dùng</p>
          <Input
            content={currentUser?.username}
            style="w-full!"
            name="username"
            disabled
          />
        </div>
        <div className="flex flex-col mb-5">
          <p>Tên hiển thị</p>
          <Input
            content={currentUser?.displayName}
            name="displayName"
            style="w-full!"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            title="Cập nhật thông tin"
            onClick={handleUpdateDisplayName}
          />
        </div>
      </div>
    </div>
  );
};

export default General;
