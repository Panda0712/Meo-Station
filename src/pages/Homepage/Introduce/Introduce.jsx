import HotelCard from "~/components/HotelCard/HotelCard";
import { capitalizeWords } from "~/utils/formatters";
import hotelImg from "~/assets/images/roomExample.png";

const Introduce = () => {
  return (
    <>
      <h3 className="text-[24px] text-[#152C5B] font-semibold mb-8">
        {capitalizeWords("Phòng có sân vườn")}
      </h3>
      <div className="flex gap-6 basis-[100%]">
        <HotelCard
          popular
          title="Anggana"
          location="Bogor, Indonesia"
          image={hotelImg}
        />
        <HotelCard
          title="Anggana"
          location="Bogor, Indonesia"
          image={hotelImg}
        />
        <HotelCard
          title="Anggana"
          location="Bogor, Indonesia"
          image={hotelImg}
        />
        <HotelCard
          title="Anggana"
          location="Bogor, Indonesia"
          image={hotelImg}
        />
      </div>
    </>
  );
};

export default Introduce;
