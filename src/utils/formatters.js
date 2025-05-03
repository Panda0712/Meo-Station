import { format } from "date-fns";

export const capitalizeWords = (str) => {
  return str
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const isSameDate = (dateStr1, dateStr2) => {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  return date1.getTime() === date2.getTime();
};

export const addMinusOneDayAtMidnight = (dateString, type) => {
  const date = new Date(dateString);

  date.setDate(type === "plus" ? date.getDate() + 1 : date.getDate() - 1);
  date.setHours(0, 0, 0, 0);

  return date;
};

export const formatHourMinute = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatVND = (price = 0) => {
  return price.toLocaleString("vi-VN");
};

export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
};

export const formatDateV2 = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  return date.toISOString().split("T")[0]; // dạng "YYYY-MM-DD"
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
