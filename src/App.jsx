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
import Admin from "~/pages/Admin/Admin";
import BookingManagement from "~/pages/Admin/Booking/Booking";
import ContactManagement from "~/pages/Admin/Contact/Contact";
import Dashboard from "~/pages/Admin/Dashboard/Dashboard";
import HotelsManagement from "~/pages/Admin/Hotels/Hotels";
import Auth from "~/pages/Auth/Auth";
import Verification from "~/pages/Auth/Verification";
import Blog from "~/pages/Blog/Blog";
import Booking from "~/pages/Booking/Booking";
import Contact from "~/pages/Contact/Contact";
import Homepage from "~/pages/Homepage/Homepage";
import HotelDetails from "~/pages/Hotel/HotelDetails";
import Hotels from "~/pages/Hotel/Hotels";
import Profile from "~/pages/Profile/Profile";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";
import { ACCOUNT_ROLES } from "~/utils/constants";

const ProtectedRoutes = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />;
  return <Outlet />;
};

const AdminRoutes = ({ user }) => {
  if (!user || user.role !== ACCOUNT_ROLES.ADMIN)
    return <Navigate to="/" replace={true} />;
  return <Outlet />;
};

const App = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route element={<AdminRoutes user={currentUser} />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Admin />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="hotels" element={<HotelsManagement />} />
            <Route path="contact" element={<ContactManagement />} />
            <Route path="booking" element={<BookingManagement />} />
          </Route>
        </Route>

        {/* User Routes */}
        <Route
          element={
            <div className="flex flex-col justify-between min-h-screen">
              <Navbar />
              <Outlet />
              <Footer />
            </div>
          }
        >
          <Route element={<ProtectedRoutes user={currentUser} />}>
            {/* Homepage */}
            <Route path="/" element={<Homepage />} />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Blog */}
            <Route path="/blog" element={<Blog />} />

            {/* Hotel */}
            <Route path="/hotels" element={<Hotels />} />
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
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
