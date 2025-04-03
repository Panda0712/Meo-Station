// import hotelImg from "~/assets/images/roomExample.png";

// const hotelInfo = {
//   title: "Anggana",
//   location: "Bogor, Indonesia",
//   image: hotelImg,
//   pricePerNight: 300,
// };

const HotelCard = ({
  title,
  location,
  image,
  //   pricePerNight,
  popular = false,
  //   expand = false,
  //   primary = false,
}) => {
  return (
    <section className="relative basis-[calc(25%-12px)] transition transform hover:opacity-95 hover:translate-y-[-5px] cursor-pointer rounded-[18px]">
      {popular && (
        <div className="absolute right-0 top-0 bg-[#FF498B] px-4 py-2 rounded-tr-[18px] rounded-bl-[18px]">
          <p className="text-white text-[14px]">
            <span className="font-semibold">Được Chọn</span> Nhiều Nhất
          </p>
        </div>
      )}
      <img src={image} className="w-full min-h-[180px] object-cover" alt="" />
      <h4 className="text-[18px] text-[#152C5B] mt-2">{title}</h4>
      <p className="text-[14px] text-[#B0B0B0]">{location}</p>
    </section>
  );
};

export default HotelCard;
