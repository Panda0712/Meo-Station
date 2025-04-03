import { useNavigate } from "react-router-dom";
import DoorIcon from "~/assets/door.svg?react";
import BannerImg from "~/assets/images/banner.png";
import LocationIcon from "~/assets/location.svg?react";
import SuitcaseIcon from "~/assets/suitcase.svg?react";
import Button from "~/components/Button/Button";
import { capitalizeWords } from "~/utils/formatters";

const Heading = () => {
  const navigate = useNavigate();

  const boxStyle = "flex flex-col items-center gap-2";
  const iconStyle =
    "w-6 h-6 cursor-pointer transition hover:opacity-70 fill-[#3252DF]";
  const textStyle = "max-w-[120px] text-center";

  return (
    <>
      <div>
        <h1 className="text-[40px] text-[#152C5B] font-semibold max-w-md mb-3">
          {capitalizeWords(
            "Nơi nghỉ chân lý tưởng sau những chuyến đi dài mỏi mệt"
          )}
        </h1>
        <p className="max-w-md text-[#B0B0B0] mb-7">
          Chúng tôi có đầy đủ tiện nghi và dịch vụ để quý khách trải nghiệm và
          tận hưởng những giây phút tuyệt vời tại{" "}
          <span className="text-blue-600 font-medium">Meo</span>
          <span className="font-medium text-black">Station</span>
        </p>
        <Button
          onClick={() => navigate("/hotels")}
          title="Khám phá"
          style="mb-12"
        />
        <div className="flex items-start gap-4">
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
