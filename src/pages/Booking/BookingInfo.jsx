import Button from "~/components/Button/Button";

const BookingInfo = () => {
  return (
    <div className="mt-12">
      <h2 className="text-[36px] text-[#152c5b] font-semibold text-center mb-1">
        Thông tin đặt phòng
      </h2>
      <p className="text-[18px] font-light text-[#b0b0b0] text-center">
        Vui lòng điền đầy đủ thông tin
      </p>

      <div></div>

      <div className="flex flex-col gap-3 items-center mt-12">
        <Button title="Tiếp tục đặt phòng" style="w-[300px] p-6" />
        <Button
          title="Trở lại"
          style="w-[300px] font-medium"
          type="cancel-secondary"
        />
      </div>
    </div>
  );
};

export default BookingInfo;
