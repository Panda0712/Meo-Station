import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import {
  selectCurrentUser,
  updateUserAPI,
} from "~/redux/activeUser/activeUserSlice";
import NoUser from "/none-user.webp";

const General = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [newDisplayName, setNewDisplayName] = useState(
    currentUser?.displayName
  );

  const handleUpdateDisplayName = () => {
    if (newDisplayName === currentUser?.displayName) return;

    toast
      .promise(dispatch(updateUserAPI({ displayName: newDisplayName })), {
        pending: "Đang cập nhật thông tin...",
      })
      .then(() => {
        toast.success("Cập nhật thông tin thành công");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <img
        src={currentUser?.avatar || NoUser}
        className="w-24 h-24 rounded-full border-[2px] border-blue-400"
        alt=""
      />
      <Input type="file" />

      <div className="mt-5">
        <div className="flex flex-col mb-5">
          <p>Email</p>
          <Input
            content={currentUser?.email}
            name="email"
            type="email"
            disabled
          />
        </div>
        <div className="flex flex-col mb-5">
          <p>Tên người dùng</p>
          <Input content={currentUser?.username} name="username" disabled />
        </div>
        <div className="flex flex-col mb-5">
          <p>Tên hiển thị</p>
          <Input
            content={currentUser?.displayName}
            name="displayName"
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
