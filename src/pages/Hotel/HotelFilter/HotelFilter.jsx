import ArrowDownFill from "~/assets/images/arrow-down-fill.png";
import ArrowDownBrown from "~/assets/images/arrow-down-brown.png";

const HotelFilter = () => {
  return (
    <div className="flex items-center justify-between gap-5 mt-[20px] max-w-[80%] mx-auto">
      <div
        className="bg-[#064749] rounded-[40px] h-[48px] text-white p-[20px] 
      flex items-center justify-between gap-5 cursor-pointer transition hover:opacity-90"
      >
        <span>Lọc nhiều hơn</span>
        <img src={ArrowDownFill} alt="" />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[18px] font-semibold">Sắp xếp theo:</span>
        <div
          className="rounded-[40px] h-[48px] p-[20px] 
      flex items-center justify-between gap-5 cursor-pointer transition hover:opacity-90"
        >
          <span className="text-[18px] font-semibold text-[#49735a]">
            Độ phổ biến
          </span>
          <img src={ArrowDownBrown} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HotelFilter;
