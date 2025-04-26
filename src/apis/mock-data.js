import { ORDER_STATUS, PAYMENT_METHODS } from "~/utils/constants";

export const hotelResults = [
  {
    name: "CineBox 03",
    location: "25A, 3/2, HCM",
    description: "BlissHome Number 1",
    images: [
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/1-20241130121516-twsr-.jpg",
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    ],
    utilities: [
      {
        type: "bedroom",
        value: "5 phòng ngủ",
      },
      {
        type: "livingRoom",
        value: "1 phòng khách",
      },
      {
        type: "bathroom",
        value: "3 phòng tắm",
      },
      {
        type: "diningRoom",
        value: "1 phòng ăn",
      },
      {
        type: "internet",
        value: "10 mbp/s",
      },
      {
        type: "coldMachine",
        value: "7 máy lạnh",
      },
      {
        type: "refrigerator",
        value: "2 tủ lạnh",
      },
      {
        type: "TV",
        value: "4 tivi",
      },
    ],
    pricePerNight: 300,
    priceFirstHour: 80,
    priceEachHour: 100,
    discount: 20,
  },
  {
    name: "CineBox 03",
    location: "25A, 3/2, HCM",
    description: "BlissHome Number 1",
    images: [
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/1-20241130121516-twsr-.jpg",
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    ],
    utilities: [
      {
        type: "bedroom",
        value: "5 phòng ngủ",
      },
      {
        type: "livingRoom",
        value: "1 phòng khách",
      },
      {
        type: "bathroom",
        value: "3 phòng tắm",
      },
      {
        type: "diningRoom",
        value: "1 phòng ăn",
      },
      {
        type: "internet",
        value: "10 mbp/s",
      },
      {
        type: "coldMachine",
        value: "7 máy lạnh",
      },
      {
        type: "refrigerator",
        value: "2 tủ lạnh",
      },
      {
        type: "TV",
        value: "4 tivi",
      },
    ],
    pricePerNight: 300,
    priceFirstHour: 80,
    priceEachHour: 100,
    discount: 20,
  },
];

export const orderHistory = [
  {
    orderId: 1323232323,
    userId: 2,
    hotelId: 3,
    checkInDate: "2023-10-01",
    checkOutDate: "2023-10-05",
    paymentMethod: PAYMENT_METHODS.MOMO,
    totalPrice: 100000,
    status: ORDER_STATUS.COMPLETED,
    hotelDetails: {
      name: "CineBox 03",
      location: "25A, 3/2, HCM",
      pricePerNight: 200000,
      image:
        "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    },
  },
  {
    orderId: 1,
    userId: 2,
    hotelId: 3,
    checkInDate: "2023-10-01",
    checkOutDate: "2023-10-05",
    paymentMethod: PAYMENT_METHODS.MOMO,
    totalPrice: 100000,
    status: ORDER_STATUS.CANCELLED,
    hotelDetails: {
      name: "CineBox 03",
      location: "25A, 3/2, HCM",
      pricePerNight: 200000,
      image:
        "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    },
  },
  {
    orderId: 1,
    userId: 2,
    hotelId: 3,
    checkInDate: "2023-10-01",
    checkOutDate: "2023-10-05",
    paymentMethod: PAYMENT_METHODS.MOMO,
    totalPrice: 100000,
    status: ORDER_STATUS.PENDING,
    hotelDetails: {
      name: "CineBox 03",
      location: "25A, 3/2, HCM",
      pricePerNight: 200000,
      image:
        "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    },
  },
  {
    orderId: 1,
    userId: 2,
    hotelId: 3,
    checkInDate: "2023-10-01",
    checkOutDate: "2023-10-05",
    paymentMethod: PAYMENT_METHODS.MOMO,
    totalPrice: 100000,
    status: ORDER_STATUS.COMPLETED,
    hotelDetails: {
      name: "CineBox 03",
      location: "25A, 3/2, HCM",
      pricePerNight: 200000,
      image:
        "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    },
  },
  {
    orderId: 1,
    userId: 2,
    hotelId: 3,
    checkInDate: "2023-10-01",
    checkOutDate: "2023-10-05",
    paymentMethod: PAYMENT_METHODS.MOMO,
    totalPrice: 100000,
    status: ORDER_STATUS.COMPLETED,
    hotelDetails: {
      name: "CineBox 03",
      location: "25A, 3/2, HCM",
      pricePerNight: 200000,
      image:
        "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    },
  },
];

export const orderInfo = {
  roomImage:
    "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
  checkInDate: "2023-10-01",
  checkOutDate: "2023-10-05",
  guest: 1,
  totalPrice: 400,
};

export const listContact = [
  {
    name: "Panda",
    email: "tuanpn.it@gmail.com",
    phone: "0369332842",
    message: "Dịch vũ tốt vãi nho!!",
  },
  {
    name: "Panda",
    email: "tuanpn.it@gmail.com",
    phone: "0369332842",
    message: "Dịch vũ tốt vãi nho!!",
  },
  {
    name: "Panda",
    email: "tuanpn.it@gmail.com",
    phone: "0369332842",
    message: "Dịch vũ tốt vãi nho!!",
  },
  {
    name: "Panda",
    email: "tuanpn.it@gmail.com",
    phone: "0369332842",
    message: "Dịch vũ tốt vãi nho!!",
  },
];

export const listNotifications = [
  {
    name: "CineBox 3",
    images:
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
    message: "Giảm giá 50% nè! Đặt phòng liền tay đi!",
  },
  {
    name: "CineBox 3",
    images:
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
    message: "Giảm giá 50% nè! Đặt phòng liền tay đi!",
  },
  {
    name: "CineBox 3",
    images:
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
    message: "Giảm giá 50% nè! Đặt phòng liền tay đi!",
  },
  {
    name: "CineBox 3",
    images:
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
    message: "Giảm giá 50% nè! Đặt phòng liền tay đi!",
  },
  {
    name: "CineBox 3",
    images:
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
    message: "Giảm giá 50% nè! Đặt phòng liền tay đi!",
  },
];
