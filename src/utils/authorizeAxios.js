/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import { refreshTokenAPI } from "~/apis";
import { logoutUserAPI } from "~/redux/activeUser/activeUserSlice";
import { interceptorLoadingElements } from "~/utils/formatters";

let axiosReduxStore;

export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore;
};

let authorizedAxiosInstance = axios.create();

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

authorizedAxiosInstance.defaults.withCredentials = true;

authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshTokenPromise = null;

authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false);

    return response;
  },
  (error) => {
    interceptorLoadingElements(false);

    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false));
    }

    const originalRequests = error.config;
    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true;

      // handle get new accessToken
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => data?.accessToken)
          .catch((error) => {
            axiosReduxStore.dispatch(logoutUserAPI(false));
            return Promise.reject(error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then((accessToken) => {
        return authorizedAxiosInstance(originalRequests);
      });
    }

    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    if (error.response?.status !== 410) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
