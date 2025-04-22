import { toZonedTime } from "date-fns-tz";

export function capitalizeWords(str) {
  return str
    ?.split(" ") // Split string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(" "); // Join words back into a sentence
}

export const formatVND = (price) => {
  return price.toLocaleString("vi-VN");
};

export const toVNISOString = (date, time) => {
  const timeZone = "Asia/Ho_Chi_Minh";
  const fullDateString = `${date}T${time}:00`; // ví dụ: "2025-04-23T08:00:00"
  const dateObj = new Date(fullDateString);
  const zonedDate = toZonedTime(dateObj, timeZone);
  return zonedDate.toISOString();
};

export const interceptorLoadingElements = (calling) => {
  // DOM lấy ra toàn bộ phần tử trên page hiện tại có className là 'interceptor-loading'
  const elements = document.querySelectorAll(".interceptor-loading");
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      // Nếu đang trong thời gian chờ gọi API (calling === true) thì sẽ làm mờ phần tử và chặn click bằng css pointer-events
      elements[i].style.opacity = "0.5";
      elements[i].style.pointerEvents = "none";
    } else {
      // Ngược lại thì trả về như ban đầu, không làm gì cả
      elements[i].style.opacity = "initial";
      elements[i].style.pointerEvents = "initial";
    }
  }
};
