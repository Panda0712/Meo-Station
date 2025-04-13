import { useSelector } from "react-redux";
import AvatarImg from "~/assets/images/avatar.png";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";
import { capitalizeWords } from "~/utils/formatters";

const AdminHeader = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="flex items-center justify-between p-[24px] bg-white shadow-sm">
      <h1 className="font-medium text-[24px]">
        Quản trị <span className="text-blue-600">Meo</span>Station.
      </h1>
      <div className="flex items-center gap-2 cursor-pointer transition hover:bg-slate-200 p-2 rounded-sm">
        <img
          src={AvatarImg}
          className="w-[45px] h-[45px] object-cover"
          alt=""
        />

        <div className="text-[18px] font-semibold text-[#555555]">
          <p>{capitalizeWords(currentUser?.displayName)}</p>
          <h6 className="text-[14px] font-medium text-[#6f767e]">
            Super {currentUser?.role}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
