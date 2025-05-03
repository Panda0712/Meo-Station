const BookingHeading = ({ heading, subHeading }) => {
  return (
    <>
      <h2
        className="lg:text-[36px] md:text-[32px] sm:text-[28px] text-[24px]
       text-[#152c5b] font-semibold text-center mb-1"
      >
        {heading}
      </h2>
      <p className="lg:text-[18px] md:text-[16px] text-[14px] font-light text-[#b0b0b0] text-center">
        {subHeading}
      </p>
    </>
  );
};

export default BookingHeading;
