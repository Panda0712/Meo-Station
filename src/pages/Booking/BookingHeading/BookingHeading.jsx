const BookingHeading = ({ heading, subHeading }) => {
  return (
    <>
      <h2 className="text-[36px] text-[#152c5b] font-semibold text-center mb-1">
        {heading}
      </h2>
      <p className="text-[18px] font-light text-[#b0b0b0] text-center">
        {subHeading}
      </p>
    </>
  );
};

export default BookingHeading;
