import { Link } from "react-router-dom";
import { formatDate } from "~/utils/formatters";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/admin/blogs/${blog._id}`}>
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center mb-3">
          <span className="text-xs text-gray-500">
            {formatDate(blog.createdAt)}
          </span>
          {blog.tags && blog.tags.length > 0 && (
            <div className="ml-auto flex gap-1">
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
        <Link to={`/admin/blogs/${blog._id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
            {blog.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {blog.summary}
        </p>
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 text-sm text-gray-700">{blog.author}</span>
          </div>
          <Link
            to={`/blogs/${blog._id}`}
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
