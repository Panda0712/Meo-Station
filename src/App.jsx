import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Footer from "~/components/Footer/Footer";
import Navbar from "~/components/Navbar/Navbar";
import NotFound from "~/pages/404/NotFound";
import Auth from "~/pages/Auth/Auth";
import Verification from "~/pages/Auth/Verification";
import Blog from "~/pages/Blog/Blog";
import Booking from "~/pages/Booking/Booking";
import Contact from "~/pages/Contact/Contact";
import Homepage from "~/pages/Homepage/Homepage";
import Hotel from "~/pages/Hotel/Hotel";
import HotelDetails from "~/pages/Hotel/HotelDetails";
import Profile from "~/pages/Profile/Profile";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";

const ProtectedRoutes = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />;
  return <Outlet />;
};

const App = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <BrowserRouter>
      <div className="flex flex-col justify-between min-h-screen">
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoutes user={currentUser} />}>
            {/* Homepage */}
            <Route path="/" element={<Homepage />} />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Blog */}
            <Route path="/blog" element={<Blog />} />

            {/* Hotel */}
            <Route path="/hotels" element={<Hotel />} />
            <Route path="/hotels/:hotelId" element={<HotelDetails />} />

            {/* Profile */}
            <Route path="/account/security" element={<Profile />} />
            <Route path="/account/general" element={<Profile />} />

            {/* Booking  */}
            <Route path="/booking/info" element={<Booking />} />
            <Route path="/booking/payment" element={<Booking />} />
            <Route path="/booking/complete" element={<Booking />} />
            <Route path="/booking/history" element={<Booking />} />
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/account/verification" element={<Verification />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
