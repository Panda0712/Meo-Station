import { useLocation, useNavigate } from "react-router-dom";
import General from "~/pages/Profile/General";
import Security from "~/pages/Profile/Security";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSecurity = location.pathname === "/account/security";
  const isGeneral = location.pathname === "/account/general";

  const infoStyle =
    "flex items-center gap-1 p-3 rounded-md transition hover:bg-gray-200 cursor-pointer";

  return (
    <section className="px-24 py-16">
      <div className="flex items-center gap-5 text-[18px] font-semibold">
        <div
          onClick={() => navigate("/account/general")}
          className={`${infoStyle} ${isGeneral && "bg-gray-200"}`}
        >
          <span>ℹ️</span>
          <span>Thông tin chung</span>
        </div>
        <div
          onClick={() => navigate("/account/security")}
          className={`${infoStyle} ${isSecurity && "bg-gray-200"}`}
        >
          <span>🔐</span>
          <span>Bảo mật tài khoản</span>
        </div>
      </div>
      {isSecurity && <Security />}
      {isGeneral && <General />}
    </section>
  );
};

export default Profile;
