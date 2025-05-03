import { useNavigate } from "react-router-dom";
import bathroom from "~/assets/images/bathroom.png";
import bedroom from "~/assets/images/bedroom.png";
import internet from "~/assets/images/internet.png";
import { formatDateV2 } from "~/utils/formatters";

const imagesMap = {
  bedroom,
  bathroom,
  internet,
};

const hotelUtilities = ["bedroom", "bathroom", "internet"];

const HotelResultCard = ({ hotel }) => {
  const hotelFilterUtilities = hotel?.utilities.filter((h) =>
    hotelUtilities.includes(h.type)
  );

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/hotels/${hotel?._id}`)}
      className="bg-[#f2f0f2] flex sm:flex-row flex-col items-center sm:gap-5 gap-2 
    relative rounded-tl-[60px] rounded-bl-[15px] rounded-tr-[70px] 
    rounded-br-[70px] overflow-hidden cursor-pointer 
    transition transform hover:translate-y-[-5px] sm:max-h-[250px] sm:w-auto w-full h-full"
    >
      <div className="relative sm:basis-[calc(40%-10px)] basis-[100%] sm:w-auto w-full">
        <img
          src={hotel?.images[0]}
          className="w-full sm:h-full h-[180px] object-cover"
          alt=""
        />
      </div>
      <div className="p-[32px] basis-[calc(60%-10px)] sm:w-auto w-full">
        <h3 className="text-[18px] font-bold text-[#152c5b] mb-3">
          {hotel?.title}
        </h3>
        <div className="flex flex-wrap items-center gap-5">
          {hotelFilterUtilities?.map((utility) => (
            <div className="flex items-center gap-2" key={utility.type}>
              <img
                className="w-[20px] h-[20px]"
                src={imagesMap[utility.type]}
                alt=""
              />
              <span className="text-[14px] mt-[1.5px] font-medium text-[#181a18]">
                {utility?.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">
          <div className="bg-[#49735a] rounded-[30px] sm:w-auto w-full px-[20px] py-[4px] flex items-center justify-center text-white">
            <p className="md:text-[16px] sm:text-[14px] text-[12px] font-medium">
              Còn trống {formatDateV2(Date.now())}
            </p>
          </div>
          <p className="text-[16px]">
            Từ <span className="font-semibold">{hotel?.pricePerNight}đ</span>
            /đêm
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelResultCard;
