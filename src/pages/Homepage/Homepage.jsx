import { Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchHotelsAPI } from "~/apis";
import ExtraIntroduce from "~/pages/Homepage/ExtraIntroduce/ExtraIntroduce";
import Heading from "~/pages/Homepage/Heading/Heading";
import Introduce from "~/pages/Homepage/Introduce/Introduce";
import Popular from "~/pages/Homepage/Popular/Popular";

const Homepage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchHotelsAPI().then((res) => {
      setHotels(res.hotels || []);
      setLoading(false);
    });
  }, []);

  const hotelFilterRefrigerator = hotels.filter((hotel) =>
    hotel.utilities.map(
      (util) => util.type === "refrigerator" && Number(util.value > 1)
    )
  );
  const hotelFilterDiningRoom = hotels.filter((hotel) =>
    hotel.utilities.map(
      (util) => util.type === "diningRoom" && Number(util.value > 1)
    )
  );
  const hotelFilterLivingRoom = hotels.filter((hotel) =>
    hotel.utilities.map(
      (util) => util.type === "livingRoom" && Number(util.value > 1)
    )
  );

  return (
    <div className="px-24 py-16 mb-8">
      {loading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <section className="flex justify-between gap-5">
            <Heading />
          </section>

          <section className="mt-24 w-full">
            <Popular hotels={hotels} />
            <div className="h-12" />
            <Introduce
              title="Phòng có tủ lạnh"
              filterList={hotelFilterRefrigerator}
            />
            <div className="h-12" />
            <Introduce
              title="Phòng có phòng ăn"
              filterList={hotelFilterDiningRoom}
            />
            <div className="h-12" />
            <Introduce
              title="Phòng có phòng khách"
              filterList={hotelFilterLivingRoom}
            />
          </section>

          <section className="mt-24">
            <ExtraIntroduce />
          </section>
        </>
      )}
    </div>
  );
};

export default Homepage;
