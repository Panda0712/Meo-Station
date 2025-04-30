import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteBlogAPI, getBlogDetailAPI } from "~/apis";
import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";
import { ACCOUNT_ROLES } from "~/utils/constants";
import { formatDate } from "~/utils/formatters";

const BlogDetailManagement = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const currentUser = useSelector(selectCurrentUser);

  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = () => {
      setLoading(true);
      getBlogDetailAPI(blogId)
        .then((res) => setBlog(res[0]))
        .finally(() => setLoading(false));
    };

    fetchBlog();
  }, [blogId]);

  const handleDelete = async () => {
    toast
      .promise(deleteBlogAPI(blogId), {
        pending: "Đang xóa bài viết...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa bài viết thành công!!!");
          navigate("/admin/blogs");
        }
      });
  };

  const handleReset = () => {
    setOpenModal(false);
    setDeleting(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {"Không tìm thấy bài viết"}
        </div>
        <Link
          to={`${
            currentUser.role === ACCOUNT_ROLES.ADMIN ? "/admin/blogs" : "/blog"
          }`}
          className="text-blue-600 hover:underline"
        >
          &larr; Trở về danh sách bài viết
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto ${
        currentUser.role === ACCOUNT_ROLES.ADMIN
          ? "px-4 py-8"
          : "px-24 pt-16 pb-24"
      }`}
    >
      {openModal && deleting && (
        <Modal
          title="Xóa bài viết"
          handleCloseModal={handleReset}
          modalStyle="w-[450px]"
        >
          <div className="mt-6 relative">
            <p className="text-black">
              Bạn có chắc chắn muốn xóa bài viết không? Sau khi xóa không thể
              hoàn tác!
            </p>

            <div className="flex justify-end">
              <div className="flex items-center gap-2 mt-8">
                <Button title="Trở lại" type="cancel" onClick={handleReset} />
                <Button
                  title="Xóa bài viết"
                  type="warning"
                  onClick={handleDelete}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      <Link
        to={`${
          currentUser.role === ACCOUNT_ROLES.ADMIN ? "/admin/blogs" : "/blog"
        }`}
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        &larr; Trở về danh sách bài viết
      </Link>

      <div className="w-full h-96 overflow-hidden rounded-xl mb-8">
        <img
          src={blog?.coverImage}
          alt={blog?.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog?.title}</h1>

        <div className="flex items-center text-gray-600 mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 mr-3">
              {blog?.author?.charAt(0).toUpperCase()}
            </div>
            <span>{blog?.author}</span>
          </div>
          <span className="mx-3">•</span>
          <span>{formatDate(blog.createdAt)}</span>
          {blog.updatedAt !== blog.createdAt && (
            <>
              <span className="mx-3">•</span>
              <span>
                Cập nhật: {formatDate(blog.updatedAt || blog.createdAt)}
              </span>
            </>
          )}
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {currentUser.role === ACCOUNT_ROLES.ADMIN && (
        <div className="flex gap-4 mb-8">
          <Link
            to={`/admin/blogs/create/${blogId}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Chỉnh sửa bài viết
          </Link>
          <button
            onClick={() => {
              setOpenModal(true);
              setDeleting(true);
            }}
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-md transition-colors"
          >
            Xóa bài viết
          </button>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  );
};

export default BlogDetailManagement;
