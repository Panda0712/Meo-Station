import BookingHistoryCard from "~/pages/Booking/BookingHistoryCard/BookingHistoryCard";
import { ORDER_STATUS, PAYMENT_METHODS } from "~/utils/constants";

const orderHistory = [
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

const BookingHistory = () => {
  return (
    <div className="pt-5 pb-16">
      <h5 className="text-[36px] font-semibold text-[#152c5b] text-center">
        Lịch sử đặt phòng
      </h5>

      <div className="flex flex-col gap-8 mt-10">
        {orderHistory.map((order) => (
          <BookingHistoryCard key={order?.orderId} order={order} />
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
