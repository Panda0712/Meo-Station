export const color = {
  primary: "#152C5B",
  secondary: "#B0B0B0",
  button: "#3252DF",
  red: "#FF498B",
  mail: "#3e65cf",
};

export const TIME_SLOTS = [
  {
    label: "8h - 11h",
    startTime: "08:00",
    endTime: "11:00",
  },
  {
    label: "12h - 15h",
    startTime: "12:00",
    endTime: "15:00",
  },
  {
    label: "16h - 19h",
    startTime: "16:00",
    endTime: "19:00",
  },
  {
    label: "20h - 23h",
    startTime: "20:00",
    endTime: "23:00",
  },
];

export const BOOKING_MODE = {
  night: "in-nights",
  day: "in-day",
};

export const UTILITIES_LIST = [
  "bedroom",
  "livingRoom",
  "bathroom",
  "diningRoom",
  "internet",
  "coldMachine",
  "refrigerator",
  "TV",
];

export const PAYMENT_METHODS = {
  MOMO: "MOMO",
  ZALOPAY: "ZALOPAY",
  CASH: "CASH",
};

export const ORDER_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const ACCOUNT_ROLES = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
};

let apiRoot = "http://localhost:8017";
// if (process.env.BUILD_MODE === "dev") {
//   apiRoot = "http://localhost:8017";
// }
// if (process.env.BUILD_MODE === "production") {
//   apiRoot = "https://trello-backend-wkjl.onrender.com";
// }
export const API_ROOT = apiRoot;
