import { useLocation } from "react-router-dom";
import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";

const Auth = () => {
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <div
      className="px-24 h-screen flex justify-center items-center 
    bg-[url('https://images5.alphacoders.com/134/1344548.png')] bg-cover bg-center"
    >
      {isLogin && <Login />}
      {isRegister && <Register />}
    </div>
  );
};

export default Auth;
