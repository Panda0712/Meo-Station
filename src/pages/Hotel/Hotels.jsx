import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSearchHotelsAPI } from "~/apis";
import HotelFilter from "~/pages/Hotel/HotelFilter/HotelFilter";
import HotelResults from "~/pages/Hotel/HotelResults/HotelResults";
import HotelSearch from "~/pages/Hotel/HotelSearch/HotelSearch";
import { toVNISOString } from "~/utils/formatters";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [filterField, setFilterField] = useState("title");
  const [sortType, setSortType] = useState("ascending");
  const [date, setDate] = useState({
    checkIn: {
      date: "",
      open: false,
    },
    checkOut: {
      date: "",
      open: false,
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmitFilter = (e) => {
    e.preventDefault();

    const filterHotels = [...hotels].sort((a, b) => {
      if (
        typeof a[filterField] === "number" &&
        typeof b[filterField] === "number"
      ) {
        return sortType === "ascending"
          ? a[filterField] - b[filterField]
          : b[filterField] - a[filterField];
      }
      return sortType === "ascending"
        ? String(a[filterField]).localeCompare(String(b[filterField]))
        : String(b[filterField]).localeCompare(String(a[filterField]));
    });
    setHotels(filterHotels);
  };

  const handleChangeSortType = (e) => setSortType(e.target.value);

  const handleFilterChange = (e) => setFilterField(e.target.value);

  const handleChangeDateValue = (type, value) => {
    setDate((date) => ({
      ...date,
      [type]: {
        ...date[type],
        ...value,
      },
    }));
  };

  const handleToggleDatePicker = (type) => {
    setDate((date) => ({
      ...date,
      [type]: {
        ...date[type],
        open: !date[type].open,
      },
    }));
  };

  const handleIncrementGuestCount = () => {
    if (guestCount >= 8) return;

    setGuestCount(guestCount + 1);
  };

  const handleDecrementGuestCount = () => {
    if (guestCount <= 1) return;

    setGuestCount(guestCount - 1);
  };

  const handleSearchSubmit = () => {
    if (!guestCount) {
      toast.error("Vui lòng chọn số khách!!");
      return;
    }

    if (!date["checkIn"].date || !date["checkOut"].date) {
      toast.error("Vui lòng chọn ngày check-in và check-out!!");
      return;
    }

    if (date["checkIn"].date.getTime() === date["checkOut"].date.getTime()) {
      toast.error("Vui lòng chọn 2 ngày khác nhau!!!");
      return;
    }

    if (date["checkIn"].date.getTime() > date["checkOut"].date.getTime()) {
      toast.error("Vui lòng chọn thời gian hợp lệ!!!");
      return;
    }

    const params = new URLSearchParams(location.search);
    params.set(
      "checkInDate",
      toVNISOString(date["checkIn"].date.toString(), "20:00")
    );
    params.set(
      "checkOutDate",
      toVNISOString(date["checkOut"].date.toString(), "12:00")
    );
    params.set("guest", guestCount.toString());
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    setLoading(true);
    getSearchHotelsAPI(location.search)
      .then((res) => {
        setHotels(res || []);
      })
      .finally(() => setLoading(false));
  }, [location.search]);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <section className="px-24 py-16">
      <HotelSearch
        guestCount={guestCount}
        date={date}
        handleIncrementGuestCount={handleIncrementGuestCount}
        handleDecrementGuestCount={handleDecrementGuestCount}
        handleChangeDateValue={handleChangeDateValue}
        handleToggleDatePicker={handleToggleDatePicker}
        handleSubmit={handleSearchSubmit}
      />
      <HotelFilter
        filterField={filterField}
        sortType={sortType}
        handleFilterChange={handleFilterChange}
        handleChangeSortType={handleChangeSortType}
        handleSubmitFilter={handleSubmitFilter}
      />
      <HotelResults
        hotels={hotels}
        guestCount={guestCount}
        checkIn={date["checkIn"].date}
        checkOut={date["checkOut"].date}
      />
    </section>
  );
};

export default Hotels;
