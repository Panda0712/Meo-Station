import { toast } from "react-toastify";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

// Handle refresh token
export const refreshTokenAPI = async () => {
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/users/refresh_token`
  );
  return res.data;
};

// Handle register new user
export const registerUserAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/users/register`,
    data
  );
  return res.data;
};

// Handle verify new email
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

// Get list hotels
export const fetchHotelsAPI = async (searchPath) => {
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/hotels${searchPath}`
  );
  return res.data;
};

// Create new hotel
export const createNewHotelAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/hotels`, data);
  return res.data;
};

// Update hotel
export const updateHotelAPI = async (hotelId, data) => {
  const res = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/hotels/${hotelId}`,
    data
  );
  return res.data;
};

// Delete hotel
export const deleteHotelAPI = async (hotelId) => {
  const res = await authorizedAxiosInstance.delete(
    `${API_ROOT}/v1/hotels/${hotelId}`
  );
  return res.data;
};

// Upload hotel images
export const uploadHotelImagesAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/hotels/uploads`,
    data
  );
  return res.data;
};

// Get list contacts
export const getListContactsAPI = async (searchPath) => {
  const res = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/contacts${searchPath}`
  );
  return res.data;
};

// Create new contact
export const createNewContactAPI = async (data) => {
  const res = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/contacts`,
    data
  );
  return res.data;
};

// Delete contact
export const deleteContactAPI = async (contactId) => {
  const res = await authorizedAxiosInstance.delete(
    `${API_ROOT}/v1/contacts/${contactId}`
  );
  return res.data;
};
