export const color = {
  primary: "#152C5B",
  secondary: "#B0B0B0",
  button: "#3252DF",
  red: "#FF498B",
  mail: "#3e65cf",
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
