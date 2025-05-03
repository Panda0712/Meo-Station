const BookingSeparate = ({ booking = false }) => {
  return (
    <div
      className={`w-[2px] h-[760px] ${
        booking && "lg:h-[760px]! h-[2px]! lg:w-[2px]! w-[500px]!"
      } bg-[#E5E5E5]`}
    />
  );
};

export default BookingSeparate;
