
import { getRoomByIDAction } from '@/app/actions/service/roomApi';
import { CarOutlined, TranslationOutlined, UserOutlined, WifiOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HomeOutlined, StarOutlined, TrophyOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faSnowflake, faSoap, faSwimmer, faTShirt, faTv, faUtensils, faWifi } from '@fortawesome/free-solid-svg-icons';
import CommentContent from '@/app/component/CommentContent';
import CardPayRoom from '@/app/component/CardPayRoom';
import HeaderMenu from '@/app/component/HomePage/HeaderMenu';
import FooterComponent from '@/app/component/FooterComponent';

const Detail = async (props) => {
  const roomDetail = await getRoomByIDAction(props.params.id);
  const features = [
    { condition: roomDetail.mayGiat, label: "Máy Giặt", icon: faSoap },
    { condition: roomDetail.banLa, label: "Bàn là", icon: faTShirt },
    { condition: roomDetail.tivi, label: "Tivi", icon: faTv },
    { condition: roomDetail.dieuHoa, label: "Điều hòa", icon: faSnowflake },
    { condition: roomDetail.wifi, label: "Wifi", icon: faWifi },
    { condition: roomDetail.bep, label: "Bếp", icon: faUtensils },
    { condition: roomDetail.doXe, label: "Đỗ Xe", icon: faParking },
    { condition: roomDetail.hoBoi, label: "Hồ bơi", icon: faSwimmer },
  ];

  const availableFeatures = features.filter((feature) => feature.condition);
  return (
    <>
    <HeaderMenu/>
      <div className="container py-3 my-5">
        <h3 className="fw-bold">{roomDetail.tenPhong}</h3>
        <span>Chủ nhà siêu cấp</span>
        <Link href="#">{roomDetail.maViTri}</Link>
        <Image src={roomDetail.hinhAnh} style={{ width: '100%', height: '400px' }} alt="..." width={500} height={300} crossOrigin="anonymous" priority />
        <div className="row mt-3">
          <div className="col-md-7">
            <div className="d-flex me-2 justify-content-between">
              <div className="mota">
                <h3 className="fw-bold">
                  Toàn Bộ Căn Hộ, Chủ nhà VienDaiCa
                </h3>
                {roomDetail.khach !== 0 && <span className="me-2">Khách: {roomDetail.khach}</span>}
                {roomDetail.phongNgu !== 0 && <span className="me-2">Phòng ngủ: {roomDetail.phongNgu}</span>}
                {roomDetail.giuong !== 0 && <span className="me-2">Giường: {roomDetail.giuong}</span>}
                {roomDetail.phongTam !== 0 && <span className="me-2">Phòng tắm: {roomDetail.phongTam}</span>}
              </div>
              <div className="avatar">
                <UserOutlined
                  style={{
                    fontSize: "50px",
                    color: "white",
                    backgroundColor: "black",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-start mb-3">
              <HomeOutlined style={{ fontSize: '24px !important', marginRight: '10px' }} />
              <div className="ms-3">
                <h5 className="fw-bold" style={{ fontSize: '16px' }}>Toàn bộ nhà</h5>
                <p className="text-muted mb-0" style={{ fontSize: '16px' }}>Bạn sẽ có chung cư cao cấp cho riêng mình.</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <StarOutlined style={{ fontSize: '24px !important', marginRight: '10px' }} />
              <div className="ms-3">
                <h5 className="fw-bold" style={{ fontSize: '16px' }}>Vệ sinh tăng cường</h5>
                <p className="text-muted mb-0" style={{ fontSize: '16px' }}>
                  Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước của Airbnb.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <TrophyOutlined style={{ fontSize: '24px !important', marginRight: '10px' }} />
              <div className="ms-3">
                <h5 className="fw-bold" style={{ fontSize: '16px' }}>Phong là Chủ nhà siêu cấp</h5>
                <p className="text-muted mb-0" style={{ fontSize: '16px' }}>
                  Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết
                  mang lại quãng thời gian ở tuyệt vời cho khách.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <ScheduleOutlined style={{ fontSize: '24px !important', marginRight: '10px' }} />
              <div className="ms-3">
                <h5 className="fw-bold" style={{ fontSize: '16px' }}>Miễn phí hủy trong 48 giờ</h5>
              </div>
            </div>
            <hr />
            <div className="w-100 mt-4">
              <Button
                className="w-100 text-black bg-white border-2 border-black rounded-lg py-3 hover:bg-gray-200 duration-300 flex justify-between items-center px-6"
                icon={<TranslationOutlined />}
              >
                Dịch sang tiếng Anh
              </Button>
              <p className="mt-4 text-justify">
              Tự nhận phòng Tự nhận phòng bằng khóa thông minh. Dinh Long là Chủ nhà siêu cấp Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.
              </p>
            </div>
            <hr />
            <h3 className="fw-bold my-4">Các tiện ích đi kèm</h3>
            <div className="row">
              {availableFeatures.map((feature, index) => (
                <div className="col-6 mb-3" key={index}>
                  {/* <FontAwesomeIcon className="w-5 h-5" style={{ fontSize: "20px" }} icon={feature.icon} /> */}
                  <span className=" mb-5">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5 ">
            <CardPayRoom roomDetail ={roomDetail} idRoom={props.params.id}/>
          </div>
        </div>
        <hr />
        <CommentContent idRoom={props.params.id}/>
      </div>
      <FooterComponent/>
    </>
  );
};

export default Detail;
