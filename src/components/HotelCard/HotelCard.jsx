import { useNavigate } from "react-router-dom";

const HotelCard = ({ id, title, location, image, popular = false }) => {
  const navigate = useNavigate();

  return (
    <section
      onClick={() => navigate(`/hotels/${id}`)}
      className="relative md:basis-[calc(25%-12px)] basis-[calc(50%-12px)] transition transform hover:opacity-95 hover:translate-y-[-5px] cursor-pointer rounded-[18px]"
    >
      {popular && (
        <div className="absolute right-0 top-0 bg-[#FF498B] px-4 py-2 rounded-tr-[18px] rounded-bl-[18px]">
          <p className="text-white text-[14px]">
            <span className="font-semibold">Được Chọn</span> Nhiều Nhất
          </p>
        </div>
      )}
      <img
        src={image}
        className="w-full lg:min-h-[180px] md:min-h-[230px] md:max-h-[230px] min-h-[170px] 
        max-h-[170px] object-cover rounded-[18px]"
        alt=""
      />
      <h4 className="lg:text-[18px] md:text-[16px] text-[14px] text-[#152C5B] mt-2">
        {title}
      </h4>
      <p className="lg:text-[14px] text-[12px] text-[#B0B0B0]">{location}</p>
    </section>
  );
};

export default HotelCard;
