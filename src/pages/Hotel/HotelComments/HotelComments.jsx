import { Comment } from "@ant-design/compatible";
import { Avatar, Button, Input, List, Modal, Rate, Spin, message } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "~/redux/activeUser/activeUserSlice";

import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import {
  createNewCommentAPI,
  deleteCommentAPI,
  getListCommentsAPI,
  updateCommentAPI,
} from "~/apis";

const { TextArea } = Input;

const HotelComments = ({ hotelId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [ratingValue, setRatingValue] = useState(5);

  const [editingCommentId, setEditingCommentId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    setLoading(true);
    getListCommentsAPI({ hotelId })
      .then((res) => setComments(res || []))
      .finally(() => setLoading(false));
  }, [hotelId]);

  const handleSubmit = async () => {
    if (!commentValue.trim()) {
      toast.error("Vui lòng nhập bình luận");
      return;
    }

    setSubmitting(true);

    const newComment = {
      hotelId,
      userName: currentUser?.displayName,
      avatar:
        currentUser?.avatar ||
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      rating: ratingValue,
      comment: commentValue,
    };

    toast
      .promise(createNewCommentAPI(newComment), {
        pending: "Đang tạo bình luận mới...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Thêm bình luận mới thành công!!!");
          setComments((prevComments) => [res, ...prevComments]);
        }
        setCommentValue("");
        setRatingValue(5);
        setSubmitting(false);
      });
  };

  const showDeleteModal = (comment) => {
    setSelectedComment(comment);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedComment) return;

    const commentId = selectedComment._id;
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );

    toast
      .promise(deleteCommentAPI(commentId), {
        pending: "Đang xóa bình luận...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa bình luận thành công!!!");
        } else {
          getListCommentsAPI({ hotelId }).then((res) => setComments(res || []));
        }
        setModalVisible(false);
      });
  };

  const isCommentOwner = useCallback(
    (comment) => {
      return currentUser && comment.userId === currentUser._id;
    },
    [currentUser]
  );

  const CommentItem = memo(({ comment }) => {
    const isOwner = isCommentOwner(comment);
    const isEditing = editingCommentId === comment._id;

    const [editCommentValue, setEditCommentValue] = useState(comment.comment);
    const [editRatingValue, setEditRatingValue] = useState(comment.rating);

    useEffect(() => {
      if (isEditing) {
        setEditCommentValue(comment.comment);
        setEditRatingValue(comment.rating);
      }
    }, [isEditing, comment]);

    const startEditing = () => {
      setEditingCommentId(comment._id);
    };

    const cancelEditing = () => {
      setEditingCommentId(null);
    };

    const saveEditedComment = async () => {
      if (!editCommentValue.trim()) {
        message.error("Vui lòng nhập bình luận");
        return;
      }

      const updatedData = {
        comment: editCommentValue,
        rating: editRatingValue,
        updatedAt: new Date().getTime(),
      };

      const updatedComment = { ...comment, ...updatedData };
      setComments((prevComments) =>
        prevComments.map((c) => (c._id === comment._id ? updatedComment : c))
      );

      toast
        .promise(updateCommentAPI(comment._id, updatedData), {
          pending: "Đang cập nhật bình luận...",
        })
        .then((res) => {
          if (!res.error) {
            toast.success("Cập nhật bình luận thành công!!!");
          } else {
            getListCommentsAPI({ hotelId }).then((res) =>
              setComments(res || [])
            );
          }
          setEditingCommentId(null);
        });
    };

    if (isEditing) {
      return (
        <Comment
          author={
            <span className="font-medium text-blue-600">
              {comment.userName}
            </span>
          }
          avatar={
            <Avatar
              src={comment.avatar}
              icon={<UserOutlined />}
              className="border-2 border-blue-100"
            />
          }
          content={
            <>
              <div className="mb-2">
                <Rate value={editRatingValue} onChange={setEditRatingValue} />
              </div>
              <TextArea
                rows={4}
                value={editCommentValue}
                onChange={(e) => setEditCommentValue(e.target.value)}
                className="mt-2 rounded-md border border-gray-300 p-2 w-full focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                autoFocus
              />

              <div className="mt-4 flex space-x-3">
                <Button
                  type="primary"
                  onClick={saveEditedComment}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium shadow-sm transition duration-150"
                >
                  Lưu
                </Button>
                <Button
                  onClick={cancelEditing}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium shadow-sm transition duration-150"
                >
                  Hủy
                </Button>
              </div>
            </>
          }
          datetime={
            <span className="text-gray-500 text-sm">
              {new Date(comment.commentedAt).toLocaleDateString()}
            </span>
          }
          className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition duration-150"
        />
      );
    }

    return (
      <Comment
        author={
          <span className="font-medium text-gray-800">{comment.userName}</span>
        }
        avatar={
          <Avatar
            src={comment.avatar}
            icon={<UserOutlined />}
            className="border-2 border-gray-100"
          />
        }
        content={
          <>
            <div className="mb-1">
              <Rate disabled value={comment.rating} />
            </div>
            <p className="text-gray-700 mt-2">{comment.comment}</p>
          </>
        }
        datetime={
          <span className="text-gray-500 text-sm">
            {new Date(comment.commentedAt).toLocaleDateString()}
          </span>
        }
        actions={
          isOwner
            ? [
                <Button
                  key="edit"
                  icon={<EditOutlined />}
                  size="small"
                  onClick={startEditing}
                  className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                >
                  Sửa
                </Button>,
                <Button
                  key="delete"
                  icon={<DeleteOutlined />}
                  danger
                  size="small"
                  onClick={() => showDeleteModal(comment)}
                  className="hover:bg-red-50"
                >
                  Xóa
                </Button>,
              ]
            : []
        }
        className="bg-white hover:bg-gray-50 p-4 rounded-lg border border-transparent hover:border-gray-200 transition duration-150"
      />
    );
  });

  return (
    <div className="hotel-comments p-6 bg-white shadow-md rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Bình luận</h2>
      {currentUser && (
        <div className="comment-form mb-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Thêm bình luận
          </h3>
          <div className="mb-4 flex items-center">
            <span className="mr-3 text-gray-700">Đánh giá của bạn: </span>
            <Rate value={ratingValue} onChange={setRatingValue} />
          </div>
          <TextArea
            rows={4}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            placeholder="Chia sẻ trải nghiệm của bạn..."
            className="mb-4 rounded-md border border-gray-300 p-3 w-full focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-150"
          />
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={submitting}
            disabled={!commentValue.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium shadow-sm transition duration-150"
          >
            Đăng
          </Button>
        </div>
      )}

      <div className="comments-list mt-8">
        {loading ? (
          <div className="text-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <span className="mr-2">{comments.length}</span>
              <span>{comments.length > 1 ? "Đánh giá" : "Đánh giá"}</span>
            </h3>
            {comments?.length > 0 ? (
              <List
                itemLayout="vertical"
                dataSource={comments}
                renderItem={(comment) => (
                  <List.Item
                    key={comment._id}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <CommentItem comment={comment} />
                  </List.Item>
                )}
                className="divide-y divide-gray-100"
              />
            ) : (
              <p className="text-gray-500 text-center italic py-8 bg-gray-50 rounded-lg">
                Chưa có đánh giá nào cho khách sạn này. Hãy là người đầu tiên
                đánh giá!
              </p>
            )}
          </>
        )}
      </div>
      <Modal
        title={<span className="text-red-500 font-medium">Xác nhận xóa</span>}
        open={modalVisible}
        onOk={handleDelete}
        onCancel={() => setModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ className: "bg-red-500 hover:bg-red-600" }}
      >
        <p className="text-gray-600 text-center py-3">
          Bạn có chắc chắn muốn xóa bình luận này? Hành động này không thể hoàn
          tác.
        </p>
      </Modal>
    </div>
  );
};

export default HotelComments;
