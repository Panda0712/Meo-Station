import hotelImg from "~/assets/images/roomExample.png";
import HotelCard from "~/components/HotelCard/HotelCard";
import { capitalizeWords } from "~/utils/formatters";

const Introduce = ({ title }) => {
  return (
    <>
      <h3 className="text-[24px] text-[#152C5B] font-semibold mb-8">
        {capitalizeWords(title)}
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
