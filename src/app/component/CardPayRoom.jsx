"use client"
import React, { useEffect, useState } from 'react'
import { getCookie, http, USER_LOGIN } from '../setting/setting';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { datPhongActionAsync } from '../redux/reducer/bookreducer';

const CardPayRoom = (props) => {
  const { roomDetail, idRoom } = props
  console.log("room: ", roomDetail)
  const [comments, setComments] = useState([]);
  const [countGuest, setCountGuest] = useState(1)
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const dispatch = useDispatch()
  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      const differenceInTime = checkOut - checkIn;
      const differenceInNights = differenceInTime / (1000 * 3600 * 24);

      return differenceInNights;
    }
    return 0;
  };

  const night = calculateNights()
  const handleCheckInChange = (e) => {
    const selectedDate = e.target.value;
    setCheckInDate(selectedDate);
    if (checkOutDate && checkOutDate < selectedDate) {
      setCheckOutDate(selectedDate);
    }
  };
  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };
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
    const user = JSON.parse(getCookie(USER_LOGIN)) || null;
    setUserProfile(user);
    getCommentByRoom();
  }, [idRoom]);
  return (
    <div>
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <strong>{roomDetail.giaTien}$ </strong> / night

          </div>
          <div>
            <span className="text-danger">★</span> {averageRating}(<a href="#">{comments.length} đánh giá</a>)
          </div>
        </div>

        <div className="border rounded p-3 mb-3">
          <div className="d-flex justify-content-between mb-2 border-bottom">
            <div className="w-50 text-center p-2">
              <div>Nhận phòng</div>
              <input type="date" value={checkInDate}
                onChange={handleCheckInChange} />
            </div>
            <div className="w-50 text-center p-2 border-start">
              <div>Trả phòng</div>
              <input type="date" value={checkOutDate}
                min={checkInDate}
                onChange={handleCheckOutChange} />
            </div>
          </div>
          <div className="mt-4">
            <div>Khách tối đa: {roomDetail.khach}</div>
            <div className="d-flex mt-3 justify-content-between align-items-center">
              <button className="btn btn-outline-danger btn-sm" onClick={() => {
                if (countGuest > 1) {
                  setCountGuest(countGuest - 1);
                }
              }}>-</button>
              <span className="mx-2">{countGuest
              } khách</span>
              <button className="btn btn-outline-danger btn-sm" onClick={() => {
                if (countGuest < roomDetail.khach) {
                  setCountGuest(countGuest + 1);
                }
              }}>+</button>
            </div>
          </div>
        </div>

        <button className="btn btn-danger w-100 mb-3" onClick={async () => {
          try {
            console.log("Thông tin đặt phòng:", {
              checkInDate,
              checkOutDate,
              countGuest,
              maNguoiDung: roomDetail.maNguoiDung,
              userProfileId: userProfile ? userProfile.id : null
            });

            const action = datPhongActionAsync(0, roomDetail.id, checkInDate, checkOutDate, countGuest, userProfile ? userProfile.id : null);
            await dispatch(action);

            message.success("Đặt phòng thành công");
          } catch (err) {
            message.error("Đặt phòng thất bại");
            console.error("Lỗi đặt phòng:", err);
          }
        }}>Đặt phòng</button>


        <div className="mb-2 d-flex justify-content-between">
          <div>{roomDetail.giaTien}$ X {night} nights</div>
          <div>{roomDetail.giaTien * night}</div>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <div>Cleaning fee</div>
          <div>$8</div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <strong>Total before taxes</strong>
          <strong>{roomDetail.giaTien * night - 8}</strong>
        </div>
      </div>
    </div>
  )
}

export default CardPayRoom