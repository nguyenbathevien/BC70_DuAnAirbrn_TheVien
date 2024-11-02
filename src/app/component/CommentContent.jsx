"use client";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { getCookie, http, USER_LOGIN } from "../setting/setting";
import { Button, Dropdown, Menu, message, Modal, Rate } from "antd";
import { useFormik } from "formik";

const CommentContent = (props) => {
  
  const { idRoom } = props;
  const [userProfile, setUserProfile] = useState(null);
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null); 
  const formRef = useRef(null);
  const getAllComment = async () => {
    try {
      const res = await http.get(`/api/binh-luan`);
      return res.data.content.map((item) => ({
        id: item.id,
        maNguoiBinhLuan: item.maNguoiBinhLuan,
        ...item,
      }));
    } catch (error) {
      console.error("Không thể tải tất cả các bình luận:", error);
      return [];
    }
  };
  const getCommentByRoom = async () => {
    try {
      const allComments = await getAllComment();
      const res = await http.get(`/api/binh-luan/lay-binh-luan-theo-phong/${idRoom}`);

      const commentsWithAuthor = res.data.content.map(comment => {
        const fullComment = allComments.find((c) => c.id === comment.id);
        return fullComment ? { ...comment, maNguoiBinhLuan: fullComment.maNguoiBinhLuan } : comment;
      });

      setComments(commentsWithAuthor);
    } catch (error) {
      console.error("Không thể tải bình luận cho phòng:", error);
    }
  };
  const handleClick = async (key, idComment) => {
    if (key === "1") {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const commentToEdit = comments.find(comment => comment.id === idComment);
      setEditingComment(commentToEdit);
      frm_comments.setFieldValue("comment", commentToEdit.noiDung); 
      frm_comments.setFieldValue("saoBinhLuan", commentToEdit.saoBinhLuan);
    } else {
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn xóa bình luận này không?',
        content: 'Hành động này không thể hoàn tác.',
        okText: 'Xóa',
        cancelText: 'Hủy',
        onOk: async () => {
          try {
            const res = await http.delete(`/api/binh-luan/${idComment}`);
            message.success('Đã xóa bình luận thành công!');
            getCommentByRoom();
          } catch (error) {
            message.error('Xóa bình luận thất bại. Vui lòng thử lại.');
          }
        },
      });
    }
  };
  const frm_comments = useFormik({
    initialValues: {
      saoBinhLuan: 0,
      comment: "",
    },
    onSubmit: async (values) => {
      try {
        const newComment = {
          id: editingComment ? editingComment.id : 0,
          maPhong: idRoom,
          maNguoiBinhLuan: userProfile.id,
          ngayBinhLuan: new Date().toLocaleString(),
          noiDung: values.comment,
          saoBinhLuan: values.saoBinhLuan,
        };

        if (editingComment) {
          await http.put(`/api/binh-luan/${editingComment.id}`, newComment);
          message.success("Cập nhật bình luận thành công")
          setEditingComment(null); 
        } else {
          await http.post(`/api/binh-luan`, newComment);
          message.success("Thêm bình luận thành công")
        }

        getCommentByRoom();
        frm_comments.resetForm();
      } catch (error) {
        console.error("Không thể đăng bình luận:", error);
      }
    },
  });
  useEffect(() => {
    const user = JSON.parse(getCookie(USER_LOGIN)) || null;
    setUserProfile(user);
    getCommentByRoom();
  }, [idRoom]);
  return (
    <div>
      {userProfile ? (
        <img
          src={userProfile.avatar}
          alt="avatar"
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            marginRight: 8,
          }}
        />
      ) : (
        <UserOutlined
          style={{
            fontSize: 30,
            marginRight: 8,
            color: "white",
            background: "black",
            borderRadius: "50%",
          }}
        />
      )}
      <span>{userProfile ? userProfile.name : "Tên người Dùng"}</span>
      <br />
      <form onSubmit={frm_comments.handleSubmit} ref={formRef}>
        <Rate
          className="text-warning"
          style={{ fontSize: 16 }}
          value={frm_comments.values.saoBinhLuan}
          onChange={(value) => frm_comments.setFieldValue("saoBinhLuan", value)}
        />
        <div className="my-3">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Write something..."
            name="comment"
            value={frm_comments.values.comment}
            onChange={frm_comments.handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-danger" style={{ background: "#ff6b6b" }}>
          {editingComment ? "Cập nhật" : "Đánh giá"}
        </button>
      </form>
      <hr />
      <h3>Bình Luận</h3>
      {comments?.length > 0 ? (
        <div className="row">
          {comments.map((comment, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className="d-flex align-items-start">
                <div>
                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt="avatar"
                      className="rounded-circle me-4"
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    <UserOutlined
                      className="rounded-circle me-4"
                      style={{
                        fontSize: 60,
                        marginRight: 8,
                        color: "white",
                        background: "black",
                        width: 50,
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  )}
                </div>
                <div style={{ minHeight: '100px', flex: 1 }}>
                  <div className="d-flex align-items-center me-3">
                    <strong className="me-2">{comment.tenNguoiBinhLuan}</strong>
                    <Rate
                      disabled
                      value={comment.saoBinhLuan}
                      className="text-warning"
                      style={{ fontSize: 16 }}
                    />
                    {userProfile.id === comment.maNguoiBinhLuan && (
                      <Dropdown
                        menu={{
                          items: [
                            { key: '1', label: 'Sửa' },
                            { key: '2', label: 'Xóa' },
                          ],
                          onClick: ({ key }) => handleClick(key, comment.id),
                        }}
                        placement="bottomRight"
                        arrow
                      >
                        <Button type="link">
                          <DownOutlined />
                        </Button>
                      </Dropdown>
                    )}
                  </div>
                  <p style={{ marginBottom: 0 }}>{comment.noiDung}</p>
                  <small>{comment.ngayBinhLuan}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có bình luận nào!</p>
      )}
    </div>
  );
};

export default CommentContent;

