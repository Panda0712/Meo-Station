/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createNewBlogAPI,
  getBlogDetailAPI,
  updateBlogAPI,
  uploadBlogImageAPI,
} from "~/apis";
import Button from "~/components/Button/Button";
import Input from "~/components/Input/Input";
import TinyEditor from "~/components/TinyEditor/TinyEditor";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";
import {
  FIELD_REQUIRED_MESSAGE,
  singleFileValidator,
} from "~/utils/validators";

const BlogFormPage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const { blogId } = useParams();
  const isEditMode = !!blogId;

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const reqDataRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      tags: "",
      coverImage: "",
    },
  });

  useEffect(() => {
    if (isEditMode) {
      fetchBlogData();
    }
  }, [blogId, isEditMode]);

  const fetchBlogData = async () => {
    setLoading(true);
    const blog = await getBlogDetailAPI(blogId);

    reset({
      title: blog[0].title,
      summary: blog[0].summary,
      content: blog[0].content,
      tags: blog[0].tags.join(", "),
      coverImage: blog[0].coverImage,
    });

    setPreviewImage(blog[0].coverImage);
    setLoading(false);
  };

  const handleContentChange = (content) => {
    setValue("content", content);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = singleFileValidator(file);
    if (error) {
      toast.error(error);
      return;
    }

    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);

    // Create FormData
    const formData = new FormData();
    formData.append("blog-covers", file);

    reqDataRef.current = formData;
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = reqDataRef.current;
    if (!previewImage && !formData) {
      toast.error("Vui lòng chọn ảnh!!!");
      setLoading(false);
      return;
    }

    const currentImageFormData = getValues("coverImage") || null;
    let imagePath = null;
    if (formData)
      imagePath = await toast.promise(uploadBlogImageAPI(formData), {
        pending: "Đang tải ảnh lên...",
        success: "Tải ảnh thành công!!!",
        error: "Tải ảnh thất bại!",
      });

    const tagsArray = data.tags
      ? data.tags
          .split(", ")
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      : [];

    const blogData = {
      title: data.title,
      summary: data.summary,
      content: data.content,
      tags: tagsArray,
      coverImage: data.coverImage,
      author: currentUser.displayName,
    };

    if (imagePath || currentImageFormData) {
      blogData.coverImage = imagePath
        ? imagePath.secure_url
        : currentImageFormData;
    }

    await toast.promise(
      isEditMode ? updateBlogAPI(blogId, blogData) : createNewBlogAPI(blogData),
      {
        pending: isEditMode
          ? "Đang chỉnh sửa bài viết..."
          : "Đang tạo bài viết...",
        success: isEditMode
          ? "Chỉnh sửa thành công!"
          : "Tạo bài viết mới thành công!",
      }
    );

    navigate("/admin/blogs");
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[20px] font-medium mb-8">
        {isEditMode ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tiêu đề *
          </label>
          <Input
            name="title"
            content="Nhập tiêu đề"
            {...register("title", {
              required: FIELD_REQUIRED_MESSAGE,
              minLength: {
                value: 5,
                message: "Tiêu đề tối thiểu 5 ký tự",
              },
              maxLength: {
                value: 100,
                message: "Tiêu đề tối đa 100 ký tự",
              },
            })}
            error={errors?.title}
          />
        </div>

        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tóm tắt *
          </label>
          <Input
            name="summary"
            content="Nhập tóm tắt"
            type="textarea"
            style="pt-3"
            {...register("summary", {
              required: FIELD_REQUIRED_MESSAGE,
              minLength: {
                value: 10,
                message: "Tóm tắt tối thiểu 10 ký tự",
              },
              maxLength: {
                value: 300,
                message: "Tóm tắt tối đa 300 ký tự",
              },
            })}
            error={errors?.summary}
          />
        </div>

        <div>
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ảnh bìa *
          </label>
          <Input
            type="file"
            image={previewImage}
            handleImageChange={handleImageUpload}
            style="sm:w-[400px] w-[350px]"
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tags (cách bởi dấu phẩy)
          </label>
          <Input
            name="tags"
            content="Nhập tags"
            placeholder="travel, hotel, vacation"
            {...register("tags")}
            error={errors?.tags}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nội dung *
          </label>
          <div className="min-h-[400px]">
            <TinyEditor
              value={getValues("content")}
              onChange={handleContentChange}
              className="h-80"
            />
            {errors?.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            title="Trở lại"
            type="cancel"
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/blogs");
            }}
          />
          <Button
            title={
              loading
                ? "Đang lưu..."
                : isEditMode
                ? "Cập nhật bài viết"
                : "Tạo bài viết"
            }
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default BlogFormPage;
