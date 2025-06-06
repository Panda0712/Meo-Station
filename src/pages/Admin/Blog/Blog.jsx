/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getListBlogsAPI } from "~/apis";
import BlogCard from "~/components/BlogCard/BlogCard";
import Pagination from "~/components/Pagination/Pagination";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterField, setFilterField] = useState("title");

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || "1", 10);
  const searchTerm = query.get("search") || "";
  const currentFilterField = query.get("filterField") || "title";

  const totalPages = Math.ceil(totalBlogs / DEFAULT_ITEMS_PER_PAGE);

  useEffect(() => {
    if (searchTerm) {
      setSearchQuery(searchTerm);
    }
    if (currentFilterField) {
      setFilterField(currentFilterField);
    }
  }, []);

  const handleAfterGetListBlogs = (res) => {
    setBlogs(res.blogs || []);
    setTotalBlogs(res.totalBlogs || 0);
    setError(null);
  };

  const fetchBlogs = () => {
    setLoading(true);
    getListBlogsAPI(location.search)
      .then(handleAfterGetListBlogs)
      .finally(() => setLoading(false));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("q", JSON.stringify({ [filterField]: searchQuery }));
    }

    params.set("page", "1");
    params.set("filterField", filterField);
    navigate(`?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const handleFilterFieldChange = (e) => {
    setFilterField(e.target.value);
  };

  useEffect(() => {
    fetchBlogs();
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex md:flex-nowrap flex-wrap gap-5 justify-between items-center mb-8">
        <h3 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
          Quản lý bài viết
        </h3>
        <Link
          to="/admin/blogs/create"
          className="bg-blue-600 hover:bg-blue-700 text-white md:text-[16px] text-[14px]
           px-4 py-2 rounded-md transition-colors"
        >
          Tạo bài viết mới
        </Link>
      </div>

      <div className="mb-8">
        <form
          onSubmit={handleSearch}
          className="flex md:flex-nowrap flex-wrap gap-2"
        >
          <select
            value={filterField}
            onChange={handleFilterFieldChange}
            className="px-4 py-2 border md:text-[16px] text-[14px]
             border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">Tiêu đề</option>
            <option value="content">Nội dung</option>
            <option value="author">Tác giả</option>
            <option value="tags">Thẻ</option>
            <option value="summary">Tóm tắt</option>
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 md:text-[16px] text-[14px] 
            border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 md:text-[16px] text-[14px]
             text-white px-4 py-2 rounded-md transition-colors"
          >
            Tìm
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600">
            Không tìm thấy bài viết nào!!!
          </h3>
          <p className="text-gray-500 mt-2">
            Vui lòng thử lại sau hoặc thêm bài viết mới!!!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BlogManagement;
