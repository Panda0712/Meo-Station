import ArrowDownFill from "~/assets/images/arrow-down-fill.png";

const HotelFilter = ({
  filterField,
  sortType,
  handleFilterChange,
  handleChangeSortType,
  handleSubmitFilter,
}) => {
  return (
    <div
      className="flex md:flex-row flex-col flex-wrap items-center justify-center 
    md:justify-between gap-5 mt-[20px] lg:max-w-[80%] max-w-full mx-auto"
    >
      <div
        className="bg-[#064749] rounded-[40px] h-[48px] text-white p-[20px] 
      flex items-center justify-between gap-5 cursor-pointer transition hover:opacity-90"
      >
        <span>Lọc nhiều hơn</span>
        <img src={ArrowDownFill} alt="" />
      </div>

      <div className="flex max-[577px]:flex-col max-[577px]:justify-center items-center gap-2">
        <span className="text-[18px] font-semibold">Sắp xếp theo:</span>
        <div
          className="rounded-[40px] sm:h-[48px] h-full p-[20px] 
      flex items-center justify-between gap-5 cursor-pointer transition hover:opacity-90"
        >
          <form
            onSubmit={handleSubmitFilter}
            className="flex items-center sm:flex-nowrap flex-wrap gap-2"
          >
            <select
              value={filterField}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">Tiêu đề</option>
              <option value="maxGuest">Số khách tối đa</option>
              <option value="pricePerNight">Giá mỗi đêm</option>
              <option value="priceFirstHour">Giá giờ đầu</option>
            </select>

            <select
              value={sortType}
              onChange={handleChangeSortType}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ascending">Tăng dần</option>
              <option value="descending">Giảm dần</option>
            </select>

            <button
              type="submit"
              className="bg-[#064749] hover:opacity-90 text-white px-4 py-2 rounded-md cursor-pointer transition-colors"
            >
              Lọc
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelFilter;
