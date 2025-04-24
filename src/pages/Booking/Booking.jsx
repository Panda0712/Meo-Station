import { useLocation } from "react-router-dom";
import Stepper from "~/components/Stepper/Stepper";
import BookingComplete from "~/pages/Booking/BookingComplete";
import BookingInfo from "~/pages/Booking/BookingInfo";
import BookingPayment from "~/pages/Booking/BookingPayment";
import BookingHistory from "~/pages/Booking/BookingHistory";

const Booking = () => {
  const location = useLocation();

  const isBookingInfo = location.pathname === "/booking/info";
  const isBookingPayment = location.pathname === "/booking/payment";
  const isBookingComplete = location.pathname === "/booking/complete";
  const isBookingHistory = location.pathname === "/booking/history";

  return (
    <section className="px-24 py-16">
      {!isBookingHistory && (
        <Stepper currentStep={isBookingInfo ? 1 : isBookingPayment ? 2 : 3} />
      )}
      {isBookingInfo && <BookingInfo />}{" "}
      {isBookingPayment && <BookingPayment />}
      {isBookingComplete && <BookingComplete />}
      {isBookingHistory && <BookingHistory />}
    </section>
  );
};

export default Booking;
