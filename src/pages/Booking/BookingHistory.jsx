import { useEffect, useState } from "react";
import { getBookingsHistoryAPI } from "~/apis";
import BookingHistoryCard from "~/pages/Booking/BookingHistoryCard/BookingHistoryCard";

const BookingHistory = () => {
  const [bookingsHistory, setBookingsHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const bookingsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    getBookingsHistoryAPI().then((res) => {
      setBookingsHistory(res || []);
      setLoading(false);
    });
  }, []);

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookingsHistory.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(bookingsHistory.length / bookingsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pt-5 pb-16">
      <h5 className="text-[36px] font-semibold text-[#152c5b] text-center">
        Lịch sử đặt phòng
      </h5>

      {loading ? (
        <div className="flex justify-center mt-10">
          <p className="text-lg">Đang tải...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-8 mt-10">
            {currentBookings.length > 0 ? (
              currentBookings.map((booking) => (
                <BookingHistoryCard key={booking?._id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">
                  Không có lịch sử đặt phòng nào
                </p>
              </div>
            )}
          </div>

          {bookingsHistory.length > 0 && (
            <div className="flex justify-center mt-10">
              <div className="flex gap-2">
                <button
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Trước
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === number
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    currentPage < totalPages && paginate(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Tiếp
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookingHistory;
