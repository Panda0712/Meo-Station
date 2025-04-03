import { useNavigate } from "react-router-dom";
import bannerExtra from "~/assets/images/bannerExtra.png";

const ExtraIntroduce = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto relative">
      <img
        src={bannerExtra}
        alt="banner introduce"
        className="rounded-sm object-cover"
      />

      <div className="absolute left-[50px] text-white top-1/2 transform -translate-y-1/2">
        <h3 className="text-[36px] font-semibold">Không gian sang trọng</h3>
        <p className="text-[16px] mt-2 mb-8">
          Tất cả đều được thiết kế để có được trải nghiệm linh hoạt nhất
        </p>
        <button
          onClick={() => navigate("/hotels")}
          className="bg-[#064749] text-white rounded-[20px] text-[14px] cursor-pointer transition hover:opacity-90 py-2 px-4"
        >
          Đặt phòng ngay
        </button>
      </div>
    </div>
  );
};

export default ExtraIntroduce;
