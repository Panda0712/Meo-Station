import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getListBlogsAPI } from "~/apis";
import BlogCard from "~/components/BlogCard/BlogCard";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || 1, 10);

  const totalPages = Math.ceil(totalBlogs / DEFAULT_ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 || newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const handleAfterGetBlogs = (res) => {
    setBlogs(res.blogs || []);
    setTotalBlogs(res.totalBlogs || 0);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getListBlogsAPI(location.search).then(handleAfterGetBlogs);
  }, [location.search]);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="md:px-4 px-16 mt-12 mb-24">
      <h2
        className="lg:text-[36px] md:text-[28px] 
      text-[20px] text-[#152c5b] font-semibold text-center mb-1"
      >
        Danh sách bài viết
      </h2>

      <div className="flex items-center justify-center gap-8 flex-wrap mt-12">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} userUi />
        ))}
      </div>

      <div className="flex items-center justify-center gap-5">
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 rounded-md ${
                  page === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                }`}
              >
                Trước
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 cursor-pointer rounded-md ${
                    page === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded-md ${
                  page === totalBlogs
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                }`}
              >
                Sau
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
