import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import Button from "~/components/Button/Button";

const listHotels = [
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

const HotelsManagement = () => {
  const [openOptions, setOpenOptions] = useState(
    listHotels?.map((_, index) => ({
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
        <h3 className="text-[20px] font-medium">Quản lý phòng</h3>
        <Button title="Thêm phòng mới" />
      </div>

      <table className="table-fixed w-full border border-gray-200 bg-white rounded-md shadow-sm my-8">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className={`${tHeadStyle} w-[200px]`}>Hình ảnh</th>
            <th className={`${tHeadStyle}`}>Tên</th>
            <th className={`${tHeadStyle}`}>Địa chỉ</th>
            <th className={`${tHeadStyle} w-[150px]`}>Giá mỗi đêm</th>
            <th className={`${tHeadStyle} w-[100px]`}></th>
          </tr>
        </thead>
        <tbody>
          {listHotels?.map((hotel, index) => (
            <tr key={index} className="text-center">
              <td className={`${tHeadStyle}`}>
                <img
                  src={hotel?.images[0]}
                  className="object-cover w-[200px] h-[150px] mx-auto rounded-sm"
                  alt=""
                />
              </td>
              <td className={`${tHeadStyle}`}>{hotel?.name}</td>
              <td className={`${tHeadStyle}`}>{hotel?.location}</td>
              <td className={`${tHeadStyle}`}>{hotel?.pricePerNight}</td>
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
                      Chỉnh sửa
                    </li>
                    <li className={`${optionStyle}`}>Xóa phòng</li>
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

export default HotelsManagement;
