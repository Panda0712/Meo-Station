import { useSelector } from "react-redux";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";

const AdminProfile = () => {
  const currentUser = useSelector(selectCurrentUser);

  const boxStyle = "rounded-lg bg-white shadow-md p-8 flex gap-5 mb-10";

  return (
    <div className="relative">
      <h3 className="text-[20px] font-medium mb-10">Thông tin ADMIN</h3>

      <div className={`${boxStyle} items-center`}>
        <img
          className="w-32 h-32 object-cover border-2 border-blue-600 rounded-full"
          src="https://static1.personalitydatabase.net/2/pdb-images-prod/3fda573a/profile_images/fa6d2cd57fde44adaf9c8ffa0f161079.png"
          alt="maguire admin"
        />

        <div>
          <p className="text-[18px] font-semibold">
            {currentUser?.displayName}
          </p>
          <h5 className="text-[16px]">{currentUser?.role}</h5>
        </div>
      </div>

      <div className={`${boxStyle} flex-col`}>
        <div className="border-b border-slate-200 pb-4 w-full">
          <p className="text-[18px] font-semibold">Thông tin cá nhân</p>
        </div>

        <div className="flex items-center gap-16">
          <div className="relative">
            <p className="text-[18px] font-semibold">Tên</p>
            <h5 className="text-[16px]">{currentUser?.displayName}</h5>
          </div>
          <div className="relative">
            <p className="text-[18px] font-semibold">Email</p>
            <h5 className="text-[16px]">{currentUser?.email}</h5>
          </div>
          <div className="relative">
            <p className="text-[18px] font-semibold">Vai trò</p>
            <h5 className="text-[16px]">{currentUser?.role}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
