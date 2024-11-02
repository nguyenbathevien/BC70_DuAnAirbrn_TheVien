"use client"
import React, { useEffect, useState } from 'react'
import { http } from '../setting/setting';

const CardPayRoom = (props) => {
    const {roomDetail,idRoom} = props
    const [comments, setComments] = useState([]);
      
      
      const getCommentByRoom = async () => {
        try {
          const res = await http.get(`/api/binh-luan/lay-binh-luan-theo-phong/${idRoom}`);
          setComments(res.data.content);
        } catch (error) {
          console.error("Không thể tải bình luận cho phòng:", error);
        }
      };
      const calculateAverageRating = (comments) => {
        if (comments.length === 0) return 0;
      
        const totalRating = comments.reduce((sum, comment) => sum + comment.saoBinhLuan, 0);
        return (totalRating / comments.length).toFixed(1); 
      };
      
      const averageRating = calculateAverageRating(comments);
      useEffect(() => {
        getCommentByRoom();
      }, [idRoom]);
  return (
    <div>
        <div className="card p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong>{roomDetail.giaTien}$</strong> / night
                </div>
                <div>
                  <span className="text-danger">★</span> {averageRating}(<a href="#">{comments.length} đánh giá</a>)
                </div>
              </div>

              <div className="border rounded p-3 mb-3">
                <div className="d-flex justify-content-between mb-2 border-bottom">
                  <div className="w-50 text-center p-2">
                    <div>Nhận phòng</div>
                    <div>31-10-2024</div>
                  </div>
                  <div className="w-50 text-center p-2 border-start">
                    <div>Trả phòng</div>
                    <div>07-11-2024</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div>Khách</div>
                  <div className="d-flex mt-3 justify-content-between align-items-center">
                    <button className="btn btn-outline-danger btn-sm">-</button>
                    <span className="mx-2">1 khách</span>
                    <button className="btn btn-outline-danger btn-sm">+</button>
                  </div>
                </div>
              </div>

              <button className="btn btn-danger w-100 mb-3">Đặt phòng</button>
              <div className="text-center text-muted mb-3">Bạn vẫn chưa bị trừ tiền</div>

              <div className="mb-2 d-flex justify-content-between">
                <div>{roomDetail.giaTien}$ X 7 nights</div>
                <div>$196</div>
              </div>
              <div className="mb-2 d-flex justify-content-between">
                <div>Cleaning fee</div>
                <div>$8</div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total before taxes</strong>
                <strong>204</strong>
              </div>
            </div>
    </div>
  )
}

export default CardPayRoom