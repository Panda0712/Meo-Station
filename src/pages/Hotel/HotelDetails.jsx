import { useState } from "react";
import bathroom from "~/assets/images/bathroom.png";
import bedroom from "~/assets/images/bedroom.png";
import coldMachine from "~/assets/images/coldMachine.png";
import diningRoom from "~/assets/images/diningRoom.png";
import internet from "~/assets/images/internet.png";
import livingRoom from "~/assets/images/livingRoom.png";
import refrigerator from "~/assets/images/refrigerator.png";
import TV from "~/assets/images/TV.png";
import Button from "~/components/Button/Button";
import DateRangePicker from "~/components/DatePicker/DatePicker";
import NightSelector from "~/components/NightSelector/NightSelector";
import Introduce from "~/pages/Homepage/Introduce/Introduce";

const imagesMap = {
  bedroom,
  livingRoom,
  bathroom,
  diningRoom,
  internet,
  coldMachine,
  refrigerator,
  TV,
};

const hotelDetails = {
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
};

const HotelDetails = () => {
  const [range, setRange] = useState({ from: null, to: null });
  const [isOpen, setIsOpen] = useState(false);
  const [nights, setNights] = useState(2);

  const handleChangeNight = (value) => setNights(value);

  const handleSelect = (selectedRange) => {
    setRange(selectedRange);
    setIsOpen(false);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  const imageStyle =
    "object-cover rounded-[15px] basis-[calc(100%-5px)] h-[calc(50%-5px)]";
  const hoverImageStyle = "transition transform hover:translate-y-[-5px]";

  return (
    <section className="px-24 py-16 relative w-full">
      <h2 className="absolute left-[96px]">
        Trang chủ /
        <span className="text-[#152C5B] font-semibold">Chi tiết phòng</span>
      </h2>
      <div className="mx-auto mb-12">
        <h4 className="text-center font-semibold text-[36px] text-[#152C5B]">
          {hotelDetails.name}
        </h4>
        <p className="text-center text-[18px] font-light text-[#b0b0b0]">
          {hotelDetails.location}
        </p>
      </div>

      <div className="flex gap-[10px]">
        <div className="max-h-[500px] basis-[calc(60%-5px)]">
          <img
            className={`object-cover w-full h-full rounded-[15px] ${hoverImageStyle}`}
            src={hotelDetails.images[0]}
            alt=""
          />
        </div>
        <div className="max-h-[500px] gap-[10px] flex flex-wrap basis-[calc(40%-5px)]">
          <img
            className={`${imageStyle} ${hoverImageStyle}`}
            src={hotelDetails.images[1]}
            alt=""
          />
          <img
            className={`${imageStyle} ${hoverImageStyle}`}
            src={hotelDetails.images[2]}
            alt=""
          />
        </div>
      </div>

      <div className="mt-12 flex gap-16">
        <div className="basis-[calc(65%-32px)]">
          <h5 className="text-[#152C5B] font-medium text-[20px] mb-3">
            Giới thiệu phòng
          </h5>
          <p className="max-w-[600px] text-[16px] font-light text-[#b0b0b0]">
            Minimal techno is a minimalist subgenre of techno music. It is
            characterized by a stripped-down aesthetic that exploits the use of
            repetition and understated development. Minimal techno is thought to
            have been originally developed in the early 1990s by Detroit-based
            producers Robert Hood and Daniel Bell.
          </p>

          <div className="grid grid-cols-4 gap-4 mt-8">
            {hotelDetails.utilities.map((item) => (
              <div key={item.type} className="flex flex-col gap-1">
                <img
                  className="w-[38px] h-[38px]"
                  src={imagesMap[item.type]}
                  alt={item.type}
                />
                <p className="text-[16px]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="basis-[calc(35%-32px)] flex items-center justify-center min-h-[550px] rounded-xl border-[2px] border-gray-200">
          <div>
            <h5 className="text-[#152C5B] font-medium text-[20px] mb-3">
              Tiến hành đặt phòng
            </h5>
            <p className="text-[36px]">
              <span className="text-[#1ABC9C] font-medium">
                {hotelDetails.pricePerNight}.000đ
              </span>
              <span className="text-[#b0b0b0] font-[300]"> mỗi đêm</span>
            </p>

            <div className="mb-7 mt-5">
              <h6 className="text-[16px] text-[#152C5B] mb-3">
                Bạn sẽ ở trong bao lâu?
              </h6>
              <NightSelector
                nights={nights}
                handleChangeNight={handleChangeNight}
              />
            </div>

            <div>
              <h6 className="text-[16px] text-[#152C5B] mb-3">Chọn ngày</h6>
              <DateRangePicker
                toggleOpen={toggleOpen}
                range={range}
                isOpen={isOpen}
                handleSelect={handleSelect}
              />
            </div>

            <p className="text-[16px] mt-4 font-light text-[#b0b0b0]">
              Bạn sẽ trả{" "}
              <span className="font-medium text-[#152c5b]">
                {hotelDetails.pricePerNight}.000đ
              </span>{" "}
              cho <span className="font-medium text-[#152c5b]">2 đêm</span>
            </p>

            <Button
              title="Tiếp tục đặt phòng"
              style="w-full mt-12 text-[18px] py-3 font-medium shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="mt-24 mb-20">
        <Introduce title="Lựa chọn hot" />
      </div>
    </section>
  );
};

export default HotelDetails;
