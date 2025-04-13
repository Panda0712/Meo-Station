import { Ban, CircleCheckBig, CircleDot, Ellipsis } from "lucide-react";
import { useState } from "react";
import { ORDER_STATUS } from "~/utils/constants";

const listBookings = [
  {
    hotelId: 1,
    customerId: 2,
    hotelName: "LoveBox 05",
    hotelImage:
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    customerName: "Panda",
    checkInDate: "13/04/2025",
    checkOutDate: "15/04/2025",
    discount: 20,
    totalPrice: 500,
    status: ORDER_STATUS.CANCELLED,
  },
  {
    hotelId: 1,
    customerId: 2,
    hotelName: "LoveBox 05",
    hotelImage:
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    customerName: "Panda",
    checkInDate: "13/04/2025",
    checkOutDate: "15/04/2025",
    discount: 20,
    totalPrice: 500,
    status: ORDER_STATUS.PENDING,
  },
  {
    hotelId: 1,
    customerId: 2,
    hotelName: "LoveBox 05",
    hotelImage:
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    customerName: "Panda",
    checkInDate: "13/04/2025",
    checkOutDate: "15/04/2025",
    discount: 20,
    totalPrice: 500,
    status: ORDER_STATUS.COMPLETED,
  },
];

const BookingManagement = () => {
  const [openOptions, setOpenOptions] = useState(
    listBookings?.map((_, index) => ({
      index,
      open: false,
    }))
  );

  const handleToggleOptions = (currentIndex) =>
    setOpenOptions((prevOptions) =>
      prevOptions.map((item, index) =>
        index === currentIndex
          ? {
              ...item,
              open: !item.open,
            }
          : {
              ...item,
              open: false,
            }
      )
    );

  const tHeadStyle = "font-medium border border-gray-200 px-4 py-2 text-[18px]";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  return (
    <div className="flex flex-col">
      <h3 className="text-[20px] font-medium">Quản lý đặt phòng</h3>

      <table className="table-fixed w-full border border-gray-200 bg-white rounded-md shadow-sm my-8">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className={`${tHeadStyle} w-[200px]`}>Ảnh phòng</th>
            <th className={`${tHeadStyle}`}>Khách</th>
            <th className={`${tHeadStyle}`}>Tên phòng</th>
            <th className={`${tHeadStyle} w-[150px]`}>Thời gian</th>
            <th className={`${tHeadStyle}`}>Trạng thái</th>
            <th className={`${tHeadStyle}`}>Giá</th>
            <th className={`${tHeadStyle} w-[100px]`}></th>
          </tr>
        </thead>
        <tbody>
          {listBookings?.map((booking, index) => (
            <tr key={index} className="text-center">
              <td className={`${tHeadStyle}`}>
                <img
                  src={booking?.hotelImage}
                  className="object-cover w-[200px] h-[150px] mx-auto rounded-sm"
                  alt=""
                />
              </td>
              <td className={`${tHeadStyle}`}>{booking?.customerName}</td>
              <td className={`${tHeadStyle}`}>{booking?.hotelName}</td>
              <td className={`${tHeadStyle}`}>
                {booking?.checkInDate + "-" + booking?.checkOutDate}
              </td>
              <td className={`${tHeadStyle}`}>
                <div className="flex items-center justify-center gap-2 rounded-xl w-[120px] mx-auto bg-[#f5f5f5] py-1 shadow-sm">
                  {booking?.status === ORDER_STATUS.COMPLETED && (
                    <CircleCheckBig size={14} color="#1ABC9C" />
                  )}
                  {booking?.status === ORDER_STATUS.CANCELLED && (
                    <Ban size={14} color="red" />
                  )}
                  {booking?.status === ORDER_STATUS.PENDING && (
                    <CircleDot size={14} color="blue" />
                  )}
                  <span
                    className={`text-[14px] 
          ${
            booking?.status === ORDER_STATUS.COMPLETED
              ? "text-[#1abc9c]"
              : booking?.status === ORDER_STATUS.CANCELLED
              ? "text-red-500"
              : booking?.status === ORDER_STATUS.PENDING
              ? "text-blue-500"
              : "text-[#152c5b]"
          } font-medium`}
                  >
                    {booking?.status}
                  </span>
                </div>
              </td>
              <td className={`${tHeadStyle}`}>{booking?.totalPrice}.000đ</td>
              <td className={`${tHeadStyle} relative`}>
                <Ellipsis
                  size={18}
                  className="cursor-pointer mx-auto"
                  onClick={() => handleToggleOptions(index)}
                />

                {openOptions[index]?.open && (
                  <ul
                    className="w-[150px] bg-white shadow-md z-100
                  border border-slate-100 rounded-sm absolute bottom-[-75px] text-[14px] right-0"
                  >
                    <li className={`${optionStyle} border-b border-slate-200`}>
                      Xem thông tin
                    </li>
                    <li className={`${optionStyle} border-b border-slate-200 `}>
                      Thanh toán
                    </li>
                    <li className={`${optionStyle}`}>Xóa đặt phòng</li>
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
