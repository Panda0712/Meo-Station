import HotelFilter from "~/pages/Hotel/HotelFilter/HotelFilter";
import HotelResults from "~/pages/Hotel/HotelResults/HotelResults";
import HotelSearch from "~/pages/Hotel/HotelSearch/HotelSearch";

const Hotels = () => {
  return (
    <section className="px-24 py-16">
      <HotelSearch />
      <HotelFilter />
      <HotelResults />
    </section>
  );
};

export default Hotels;
