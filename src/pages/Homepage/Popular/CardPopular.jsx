import { useNavigate } from "react-router-dom";
import { formatVND } from "~/utils/formatters";

const CardPopular = ({ expand = false, childCard = false, hotel }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/hotels/${hotel?._id}`)}
      className={`relative ${childCard ? "basis-[calc(50%-12px)]" : "w-full"} ${
        expand ? "h-[460px]" : "h-[215px]"
      } rounded-[18px] transition transform hover:translate-y-[-5px] hover:opacity-95 cursor-pointer z-100`}
    >
      <img
        src={hotel?.images?.[0]}
        className="object-cover rounded-[18px] w-full h-full"
        alt=""
      />
      <div className="absolute px-4 py-2 bg-[#FF498B] right-0 top-0 rounded-bl-[18px] rounded-tr-[18px]">
        <p className="text-white text-[14px] font-light">
          <span className="font-semibold">
            {formatVND(hotel?.pricePerNight)}
          </span>{" "}
          mỗi đêm
        </p>
      </div>
      <div className="absolute left-[18px] bottom-[20px] backdrop-blur-[1px] bg-black/0.25">
        <h4 className="text-[16px] text-white font-normal">{hotel?.title}</h4>
        <p className="text-[12px] text-white font-light">{hotel?.location}</p>
      </div>
    </div>
  );
};

export default CardPopular;
