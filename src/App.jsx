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
import BlogManagement from "~/pages/Admin/Blog/Blog";
import BlogDetailsManagement from "~/pages/Admin/Blog/BlogDetails";
import BlogFormPage from "~/pages/Admin/Blog/BlogFormPage";
import BookingManagement from "~/pages/Admin/Booking/Booking";
import BookingDetailsManagement from "~/pages/Admin/Booking/BookingDetailsManagement";
import ContactManagement from "~/pages/Admin/Contact/Contact";
import Dashboard from "~/pages/Admin/Dashboard/Dashboard";
import HotelDetailsManagement from "~/pages/Admin/Hotels/HotelDetails";
import HotelsManagement from "~/pages/Admin/Hotels/Hotels";
import NotificationManagement from "~/pages/Admin/Notification/Notification";
import AdminProfile from "~/pages/Admin/Profile/AdminProfile";
import VoucherManagement from "~/pages/Admin/Voucher/Voucher";
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

  if (user?.role === ACCOUNT_ROLES.ADMIN)
    return <Navigate to="/admin" replace={true} />;

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
            <Route index element={<Dashboard />} />
            <Route path="hotels" element={<HotelsManagement />} />
            <Route
              path="hotels/:hotelId"
              element={<HotelDetailsManagement />}
            />
            <Route path="contact" element={<ContactManagement />} />
            <Route path="vouchers" element={<VoucherManagement />} />
            <Route path="booking" element={<BookingManagement />} />
            <Route
              path="booking/:bookingId"
              element={<BookingDetailsManagement />}
            />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="blogs/:blogId" element={<BlogDetailsManagement />} />
            <Route path="blogs/create" element={<BlogFormPage />} />
            <Route path="blogs/create/:blogId" element={<BlogFormPage />} />
            <Route path="notification" element={<NotificationManagement />} />
            <Route path="profile" element={<AdminProfile />} />
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
            <Route path="/blog/:blogId" element={<BlogDetailsManagement />} />

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
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/account/verification" element={<Verification />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
