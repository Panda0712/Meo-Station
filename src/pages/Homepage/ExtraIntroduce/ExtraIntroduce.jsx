import { useNavigate } from "react-router-dom";
import bannerExtra from "~/assets/images/bannerExtra.png";

const ExtraIntroduce = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto md:h-auto h-[250px] relative">
      <img
        src={bannerExtra}
        alt="banner introduce"
        className="rounded-sm w-full h-full object-cover"
      />

      <div
        className="absolute md:left-[50px] md:right-0 right-[20px] left-[20px] 
      text-white top-[50px] md:top-1/2 transform md:-translate-y-1/2"
      >
        <h3
          className="lg:text-[36px] md:text-[32px] 
        sm:text-[28px] text-[24px] font-semibold"
        >
          Không gian sang trọng
        </h3>
        <p className="lg:text-[16px] md:text-[14px] text-[12px] mt-2 mb-8">
          Tất cả đều được thiết kế để có được trải nghiệm linh hoạt nhất
        </p>
        <button
          onClick={() => navigate("/hotels")}
          className="bg-[#064749] text-white rounded-[20px] md:text-[14px] 
          text-[12px] cursor-pointer transition hover:opacity-90 py-2 px-4"
        >
          Đặt phòng ngay
        </button>
      </div>
    </div>
  );
};

export default ExtraIntroduce;
