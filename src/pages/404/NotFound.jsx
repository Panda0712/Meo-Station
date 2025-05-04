import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div class="text-center animate-fadeIn py-16">
      <img
        src="https://yemca-services.net/404.png"
        alt="404 Illustration"
        class="mx-auto w-80 animate-[float_3s_infinite] shadow-xl rounded-lg"
      />
      <h1
        class="lg:text-7xl md:text-4xl sm:text-xl text-lg 
      font-extrabold text-blue-700 mt-6"
      >
        Có vẻ bạn đã lạc lối!
      </h1>
      <p
        class="md:text-xl sm:text-[18px] text-[16px]
       text-gray-700 mt-2"
      >
        Không thể tìm thấy trang này
      </p>
      <Link
        to="/"
        class="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-full 
        md:text-lg text-sm font-semibold shadow-lg transform transition hover:scale-105 hover:bg-blue-700"
      >
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
