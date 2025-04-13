import { Ellipsis } from "lucide-react";
import { useState } from "react";
import Button from "~/components/Button/Button";

const listNotifications = [
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

const NotificationManagement = () => {
  const [openOptions, setOpenOptions] = useState(
    listNotifications?.map((_, index) => ({
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
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-medium">Quản lý thông báo</h3>
        <Button title="Thêm thông báo mới" />
      </div>

      <table className="table-fixed w-full border border-gray-200 bg-white rounded-md shadow-sm my-8">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className={`${tHeadStyle} w-[200px]`}>Hình ảnh</th>
            <th className={`${tHeadStyle}`}>Tên phòng</th>
            <th className={`${tHeadStyle}`}>Nội dung</th>
            <th className={`${tHeadStyle} w-[100px]`}></th>
          </tr>
        </thead>
        <tbody>
          {listNotifications?.map((notify, index) => (
            <tr key={index} className="text-center">
              <td className={`${tHeadStyle}`}>
                <img
                  src={notify?.images}
                  className="object-cover w-[200px] h-[150px] mx-auto rounded-sm"
                  alt=""
                />
              </td>
              <td className={`${tHeadStyle}`}>{notify?.name}</td>
              <td className={`${tHeadStyle}`}>{notify?.message}</td>
              <td className={`${tHeadStyle} relative`}>
                <Ellipsis
                  size={18}
                  className="cursor-pointer mx-auto"
                  onClick={() => handleToggleOptions(index)}
                />

                {openOptions[index]?.open && (
                  <ul
                    className="w-[150px] bg-white shadow-md z-100
                  border border-slate-100 rounded-sm absolute bottom-[-30px] text-[14px] right-0"
                  >
                    <li className={`${optionStyle} border-b border-slate-200 `}>
                      Chỉnh sửa
                    </li>
                    <li className={`${optionStyle}`}>Xóa thông báo</li>
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

export default NotificationManagement;
