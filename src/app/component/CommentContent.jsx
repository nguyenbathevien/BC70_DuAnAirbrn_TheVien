"use client";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getCookie, http, USER_LOGIN } from "../setting/setting";
import { Rate } from "antd";
import { useFormik } from "formik";

const CommentContent = (props) => {
  const { idRoom } = props;
  const userProfile = JSON.parse(getCookie(USER_LOGIN)) || null;
  const [comments, setComments] = useState([]);

  const getCommentByRoom = async () => {
    try {
      const res = await http.get(`/api/binh-luan/lay-binh-luan-theo-phong/${idRoom}`);
      setComments(res.data.content);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
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
          id: 0,
          maPhong: idRoom,
          maNguoiBinhLuan: userProfile.id,
          ngayBinhLuan: new Date().toLocaleString(),
          noiDung: values.comment,
          saoBinhLuan: values.saoBinhLuan,
        };
        await http.post(`/api/binh-luan`, newComment);
        getCommentByRoom();
        frm_comments.resetForm();
      } catch (error) {
        console.error("Failed to submit comment:", error);
      }
    },
  });
  const parseDate = (dateString) => {
    if (dateString.includes('T')) {
      return new Date(dateString);
    }

    const parts = dateString.split(' ');
    if (parts.length === 2) {
      const time = parts[0];
      const date = parts[1].split('/');
      const formattedDate = `${date[2]}-${date[1]}-${date[0]}T${time}`;
      return new Date(formattedDate);
    }

    return null;
  };
  const timeSince = (dateString) => {
    const parsedDate = parseDate(dateString);
    if (!parsedDate || isNaN(parsedDate)) {
      return "Ngày không hợp lệ";
    }

    const seconds = Math.floor((new Date() - parsedDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} năm trước`;
    if (months > 0) return `${months} tháng trước`;
    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    if (minutes > 0) return `${minutes} phút trước`;
    return `${seconds} giây trước`;
  };


  useEffect(() => {
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
      <form onSubmit={frm_comments.handleSubmit}>
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
          Đánh giá
        </button>
      </form>
      <hr />
      <h3>Bình Luận</h3>
      {comments?.length > 0 ? (
  <div className="row">
    {comments.map((comment, index) => (
      <div key={index} className="col-md-6 mb-4">
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
                  justifyContent: "center"
                }}
              />
            )}
          </div>
          <div style={{ minHeight: '100px', flex: 1 }}> 
            <div className="d-flex align-items-center">
              <strong className="me-2">{comment.tenNguoiBinhLuan}</strong>
              <Rate
                disabled
                value={comment.saoBinhLuan}
                className="text-warning"
                style={{ fontSize: 16 }}
              />
            </div>
            <small className="text-muted">
              {comment.ngayBinhLuan ? timeSince(comment.ngayBinhLuan) : "Ngày không hợp lệ"}
            </small>

            <p className="mt-2 mb-0">{comment.noiDung}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>Chưa có bình luận nào.</p>
)}
 
    </div>
  );
};

export default CommentContent;
