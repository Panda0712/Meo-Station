import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";
import { ACCOUNT_ROLES } from "~/utils/constants";
import { formatDate } from "~/utils/formatters";

const BlogCard = ({ blog, userUi = false }) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div
      className={`${
        userUi && "lg:min-w-sm md:w-[300px] w-full"
      } bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden
       transition-transform duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      <Link
        to={`${
          currentUser.role === ACCOUNT_ROLES.ADMIN
            ? `/admin/blogs/${blog._id}`
            : `/blog/${blog._id}`
        }`}
      >
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-5">
        <div
          className="flex flex-wrap lg:flex-row flex-col 
        justify-center lg:justify-normal items-start lg:items-center gap-4 mb-3"
        >
          <span className="text-xs text-gray-500">
            {formatDate(blog.createdAt)}
          </span>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex gap-1">
              {blog.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {blog.tags.length > 2 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                  +{blog.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
        <Link
          to={`${
            currentUser.role === ACCOUNT_ROLES.ADMIN
              ? `/admin/blogs/${blog._id}`
              : `/blog/${blog._id}`
          }`}
        >
          <h3
            className="lg:text-xl md:text-lg text-[16px] 
          font-semibold md:min-h-[60px] min-h-[40px] mb-2 hover:text-blue-600 transition-colors"
          >
            {blog.title?.length > 40
              ? blog.title.slice(0, 40) + "..."
              : blog.title}
          </h3>
        </Link>
        <p className="text-gray-600 md:min-h-[60px] min-h-[40px] mb-2 text-sm line-clamp-3">
          {blog.summary?.length > 80
            ? blog.summary.slice(0, 80) + "..."
            : blog.summary}
        </p>
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 text-sm text-gray-700">{blog.author}</span>
          </div>
          <Link
            to={`${
              currentUser.role === ACCOUNT_ROLES.ADMIN
                ? `/admin/blogs/${blog._id}`
                : `/blog/${blog._id}`
            }`}
            className="ml-auto text-blue-600 text-sm hover:underline"
          >
            Đọc thêm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
