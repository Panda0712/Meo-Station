import { useNavigate } from "react-router-dom";
import DoorIcon from "~/assets/door.svg?react";
import BannerImg from "~/assets/images/banner.png";
import LocationIcon from "~/assets/location.svg?react";
import SuitcaseIcon from "~/assets/suitcase.svg?react";
import Button from "~/components/Button/Button";
import { capitalizeWords } from "~/utils/formatters";

const Heading = () => {
  const navigate = useNavigate();

  const boxStyle =
    "flex flex-col items-center gap-2 sm:min-w-[120px] min-w-[100px]";
  const iconStyle =
    "w-6 h-6 cursor-pointer transition hover:opacity-70 fill-[#3252DF]";
  const textStyle = "max-w-[120px] text-center";

  return (
    <>
      <div>
        <h1
          className="lg:text-[40px] md:text-[36px] sm:text-[32px] 
        text-[28px] text-[#152C5B] font-semibold sm:max-w-md 
        max-w-[80%] lg:mx-0 mx-auto mb-3 lg:text-start text-center"
        >
          {capitalizeWords("Nơi nghỉ chân lý tưởng trong những chuyến đi")}
        </h1>
        <p className="sm:max-w-md max-w-[80%] lg:mx-0 mx-auto text-[#B0B0B0] mb-7 lg:text-start text-center">
          Chúng tôi có đầy đủ tiện nghi và dịch vụ để quý khách trải nghiệm và
          tận hưởng những giây phút tuyệt vời tại{" "}
          <span className="text-blue-600 font-medium">Meo</span>
          <span className="font-medium text-black">Station</span>
        </p>
        <div className="flex lg:justify-start justify-center">
          <Button
            onClick={() => navigate("/hotels")}
            title="Khám phá"
            style="mb-12"
          />
        </div>
        <div className="flex lg:justify-start justify-center items-start gap-4">
          <div className={boxStyle}>
            <SuitcaseIcon
              className={`${iconStyle} hover:opacity-100 cursor-none`}
            />
            <p className={textStyle}>20.000 lượt khách</p>
          </div>
          <div className={boxStyle}>
            <DoorIcon
              className={`${iconStyle} hover:opacity-100 cursor-none`}
            />
            <p className={textStyle}>Hơn 15 phòng đa dạng</p>
          </div>
          <div className={boxStyle}>
            <LocationIcon
              className={`${iconStyle} hover:opacity-100 cursor-none`}
            />
            <p className={textStyle}>3 cơ sở</p>
          </div>
        </div>
      </div>

      <img src={BannerImg} alt="banner img" />
    </>
  );
};

export default Heading;
