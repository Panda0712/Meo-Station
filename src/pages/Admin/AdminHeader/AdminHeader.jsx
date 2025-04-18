import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AvatarImg from "~/assets/images/avatar.png";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";
import {
  logoutUserAPI,
  selectCurrentUser,
} from "~/redux/activeUser/activeUserSlice";
import { capitalizeWords } from "~/utils/formatters";

const AdminHeader = () => {
  const [openAdminProfile, setOpenAdminProfile] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleToggleOpenAdminProfile = () =>
    setOpenAdminProfile(!openAdminProfile);

  const handleLogout = () => {
    toast
      .promise(dispatch(logoutUserAPI(true)), {
        pending: "Đang đăng xuất",
      })
      .then(() => setOpenModal(false));
  };

  const handleCloseModal = () => setOpenModal(false);

  const profileItemStyle =
    "cursor-pointer transition text-center hover:opacity-75 text-[16px] border border-b-1 border-gray-300 border-x-0 py-1 border-t-0";

  return (
    <div className="flex items-center justify-between p-[24px] bg-white shadow-sm">
      <h1 className="font-medium text-[24px]">
        Quản trị <span className="text-blue-600">Meo</span>Station.
      </h1>
      <div
        onClick={handleToggleOpenAdminProfile}
        className="relative flex items-center gap-2 cursor-pointer transition hover:bg-slate-200 p-2 rounded-sm"
      >
        <img
          src={AvatarImg}
          className="w-[45px] h-[45px] object-cover"
          alt=""
        />

        <div className="relative text-[18px] font-semibold text-[#555555]">
          <p>{capitalizeWords(currentUser?.displayName)}</p>
          <h6 className="text-[14px] font-medium text-[#6f767e]">
            Super {currentUser?.role}
          </h6>
        </div>

        {openAdminProfile && (
          <ul className="absolute z-99 shadow-sm bottom-[-100px] rounded-lg bg-gray-200 left-0 py-3 px-4 w-[180px]">
            <Link to="/admin/profile">
              <li className={profileItemStyle}>Thông tin cá nhân</li>
            </Link>
            <li
              onClick={() => setOpenModal(true)}
              className={`${profileItemStyle} border-b-0`}
            >
              Đăng xuất
            </li>
          </ul>
        )}

        {openModal && (
          <Modal handleCloseModal={handleCloseModal} title="Xác nhận">
            <div className="mt-6 relative">
              <p className="text-black">
                Bạn có chắc chắn muốn đăng xuất không?
              </p>

              <div className="flex justify-end">
                <div className="flex items-center gap-2 mt-8">
                  <Button
                    title="Trở lại"
                    type="cancel"
                    onClick={handleCloseModal}
                  />
                  <Button
                    title="Đăng xuất"
                    type="warning"
                    onClick={handleLogout}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
