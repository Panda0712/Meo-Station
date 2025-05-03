import HotelCard from "~/components/HotelCard/HotelCard";
import { capitalizeWords } from "~/utils/formatters";

const Introduce = ({ title, filterList }) => {
  return (
    <>
      <h3 className="lg:text-[24px] md:text-[20px] text-[18px] text-[#152C5B] font-semibold mb-8">
        {capitalizeWords(title)}
      </h3>
      <div className="flex lg:flex-nowrap flex-wrap lg:gap-6 gap-4 basis-[100%]">
        {filterList?.slice(0, 4)?.map((hotel) => (
          <HotelCard
            key={hotel?._id}
            // popular
            id={hotel?._id}
            title={hotel?.title}
            location={hotel?.location}
            image={hotel?.images?.[0]}
          />
        ))}
      </div>
    </>
  );
};

export default Introduce;
