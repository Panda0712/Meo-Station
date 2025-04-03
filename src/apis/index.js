import { toast } from "react-toastify";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

// Authentication
export const refreshTokenAPI = async () => {
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/users/refresh_token`
  );
  return res.data;
};

export const registerUserAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/users/register`,
    data
  );
  return res.data;
};

export const verifyUserAPI = async (data) => {
  const res = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/users/verify`,
    data
  );
  toast.success(
    "Xác minh tài khoản thành công!! Bây giờ đã có thể đăng nhập!!",
    { theme: "colored" }
  );
  return res.data;
};
