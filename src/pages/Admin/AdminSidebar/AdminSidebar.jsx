import { Bell, FileUser, House, LayoutDashboard, Sheet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { menuAdminList } from "~/pages/Admin/AdminSidebar/constants";
import MeoLogo from "/panda-logo.png";

const iconMap = {
  contact: <FileUser size={24} />,
  hotels: <House size={24} />,
  dashboard: <LayoutDashboard size={24} />,
  booking: <Sheet size={24} />,
  notification: <Bell size={24} />,
};

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="relative basis-[20%] h-screen bg-[#07275a] flex flex-col items-center py-[20px]">
      <Link to="/admin">
        <div className="flex items-center gap-2 mb-16">
          <img src={MeoLogo} className="object-cover w-12 h-12" alt="" />
          <h1 className="font-medium text-[24px] text-white">
            <span className="text-blue-600">Meo</span>Station.
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-6 text-white w-full">
        {menuAdminList.map((menu) => (
          <Link to={menu.path} key={menu?.name}>
            <div
              className={`${
                location.pathname === menu.path ? "bg-blue-400" : ""
              } border-y-[0.5px] border-slate-100 flex items-center justify-center gap-2 px-[16px] py-[24px] transition hover:bg-blue-400`}
            >
              {iconMap[menu.type]}
              <span className="text-[18px] font-medium">{menu.name}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-6">
        <p className="text-[18px] text-white">
          Bản quyền thuộc về{" "}
          <span className="text-blue-600 font-medium">Meo</span>Station.
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;
