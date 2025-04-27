import { format } from "date-fns";

export const capitalizeWords = (str) => {
  return str
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatVND = (price = 0) => {
  return price.toLocaleString("vi-VN");
};

export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
};

export const toVNISOString = (date, time) => {
  const fullDate = new Date(date);
  const year = fullDate.getFullYear();
  const month = String(fullDate.getMonth() + 1).padStart(2, "0");
  const day = String(fullDate.getDate()).padStart(2, "0");

  const combinedDate = new Date(`${year}-${month}-${day}T${time}:00+07:00`);
  return format(combinedDate, "yyyy-MM-dd'T'HH:mm:ssXXX");
};

export const interceptorLoadingElements = (calling) => {
  const elements = document.querySelectorAll(".interceptor-loading");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.opacity = calling ? "0.5" : "initial";
    elements[i].style.pointerEvents = calling ? "none" : "initial";
  }
};
