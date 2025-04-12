import Button from "~/components/Button/Button";
import HotelResultCard from "~/pages/Hotel/HotelResultCard/HotelResultCard";

const hotelResults = [
  {
    name: "CineBox 03",
    location: "25A, 3/2, HCM",
    description: "BlissHome Number 1",
    images: [
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/1-20241130121516-twsr-.jpg",
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    ],
    utilities: [
      {
        type: "bedroom",
        value: "5 phòng ngủ",
      },
      {
        type: "livingRoom",
        value: "1 phòng khách",
      },
      {
        type: "bathroom",
        value: "3 phòng tắm",
      },
      {
        type: "diningRoom",
        value: "1 phòng ăn",
      },
      {
        type: "internet",
        value: "10 mbp/s",
      },
      {
        type: "coldMachine",
        value: "7 máy lạnh",
      },
      {
        type: "refrigerator",
        value: "2 tủ lạnh",
      },
      {
        type: "TV",
        value: "4 tivi",
      },
    ],
    pricePerNight: 300,
    priceFirstHour: 80,
    priceEachHour: 100,
    discount: 20,
  },
  {
    name: "CineBox 03",
    location: "25A, 3/2, HCM",
    description: "BlissHome Number 1",
    images: [
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/1-20241130121516-twsr-.jpg",
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/2-20241130121516-3oai-.jpg",
      "https://w.ladicdn.com/s900x900/66091ab391c96600122e593a/3-20241130121515-r082r.jpg",
    ],
    utilities: [
      {
        type: "bedroom",
        value: "5 phòng ngủ",
      },
      {
        type: "livingRoom",
        value: "1 phòng khách",
      },
      {
        type: "bathroom",
        value: "3 phòng tắm",
      },
      {
        type: "diningRoom",
        value: "1 phòng ăn",
      },
      {
        type: "internet",
        value: "10 mbp/s",
      },
      {
        type: "coldMachine",
        value: "7 máy lạnh",
      },
      {
        type: "refrigerator",
        value: "2 tủ lạnh",
      },
      {
        type: "TV",
        value: "4 tivi",
      },
    ],
    pricePerNight: 300,
    priceFirstHour: 80,
    priceEachHour: 100,
    discount: 20,
  },
];

const HotelResults = () => {
  return (
    <div className="mt-[20px]">
      <div className="max-w-[80%] mx-auto mb-[36px]">
        <h3 className="text-[18px] text-[#181a18] font-semibold">
          52 kết quả <span className="font-normal">cho phòng 30m2</span>
        </h3>
      </div>

      <div className="flex items-start justify-between gap-12">
        <div className="flex flex-col gap-[20px] basis-[calc(70%-24px)]">
          {hotelResults?.map((hotel, index) => (
            <HotelResultCard key={index} hotel={hotel} />
          ))}
          <div className="flex justify-center mt-12">
            <Button title="Hiện thêm phòng" type="search" />
          </div>
        </div>
        <div className="flex justify-center mb-12 basis-[calc(30%-24px)]">
          <iframe
            className="rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15677.598579955422!2d106.6401792!3d10.780672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1728490781938!5m2!1svi!2s"
            width={"100%"}
            height={796}
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HotelResults;
