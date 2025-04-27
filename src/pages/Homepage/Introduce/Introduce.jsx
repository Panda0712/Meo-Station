import HotelCard from "~/components/HotelCard/HotelCard";
import { capitalizeWords } from "~/utils/formatters";

const Introduce = ({ title, filterList }) => {
  return (
    <>
      <h3 className="text-[24px] text-[#152C5B] font-semibold mb-8">
        {capitalizeWords(title)}
      </h3>
      <div className="flex gap-6 basis-[100%]">
        {filterList?.slice(0, 4)?.map((hotel) => (
          <HotelCard
            key={hotel?._id}
            // popular
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
