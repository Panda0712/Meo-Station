import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { menuList } from "~/components/Navbar/constants";
import UserProfile from "~/components/UserProfile/UserProfile";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";
import MeoLogo from "/panda-logo.png";

const Navbar = () => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);

  return (
    <nav className="flex text-xl items-center justify-between px-24 py-6 border border-t-0 border-r-0 border-l-0 border-bottom-1 border-gray-300">
      <Link to="/">
        <div className="flex items-center gap-2">
          <img src={MeoLogo} className="object-cover w-8 h-8" alt="" />
          <h1 className="font-medium text-[20px]">
            <span className="text-blue-600">Meo</span>Station.
          </h1>
        </div>
      </Link>
      <ul className="flex text-[16px] text-lg items-center justify-between gap-5">
        {menuList.map((menu) => (
          <Link key={menu.name} to={menu.path}>
            <li
              className={`${
                location.pathname === menu.path ? "text-blue-600" : ""
              } cursor-pointer font-normal transition hover:opacity-70`}
            >
              {currentUser && menu.name === "Đăng nhập" ? null : menu.name}
            </li>
          </Link>
        ))}
        {currentUser && <UserProfile currentUser={currentUser} />}
      </ul>
    </nav>
  );
};

export default Navbar;
