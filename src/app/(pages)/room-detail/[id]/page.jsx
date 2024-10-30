
import { getRoomByIDAction } from '@/app/actions/service/roomApi'
import { CarOutlined, TranslationOutlined, UserOutlined, WifiOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HomeOutlined, StarOutlined, TrophyOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faParking, faSnowflake, faSoap, faSwimmer, faTShirt, faTv, faUtensils, faWifi } from '@fortawesome/free-solid-svg-icons'
import { getProfileAction, getUserIdFromCookie } from '@/app/actions/service/userApi'


const Detail = async (props) => {
  
  const { params } = props
  const roomDetail = await getRoomByIDAction(params.id)
  const userProfile =await getProfileAction()
  console.log(userProfile)


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

  const availableFeatures = features.filter(feature => feature.condition);
  return (
    <>
      <div className="container my-5">
        <h3 className='fw-bold'>{roomDetail.tenPhong}</h3>
        <span>Chủ nhà siêu cấp</span>
        <Link href="#">{roomDetail.maViTri}</Link>
        <Image src={roomDetail.hinhAnh} style={{ width: '100%', height: '300px' }} alt="..." width={500} height={300} crossOrigin="anonymous" />
        <div className="row mt-3">
          <div className="col-md-7">
            <div className="d-flex me-2 justify-content-between">
              <div className="mota">
                <h3 className='fw-bold'>
                  Toàn Bộ Căn Hộ, Chủ nhà VienDaiCa
                </h3>
                {roomDetail.khach !== 0 && <span className='me-2'>Khách: {roomDetail.khach}</span>}
                {roomDetail.phongNgu !== 0 && <span className='me-2'>Phòng ngủ: {roomDetail.phongNgu}</span>}
                {roomDetail.giuong !== 0 && <span className='me-2'>Giường: {roomDetail.giuong}</span>}
                {roomDetail.phongTam !== 0 && <span className='me-2'>Phòng tắm: {roomDetail.phongTam}</span>}
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
              <div className='ms-3'>
                <h5 className="fw-bold" style={{ fontSize: '16px' }}>Toàn bộ nhà</h5>
                <p className="text-muted mb-0" style={{ fontSize: '16px' }}>Bạn sẽ có chung cư cao cấp cho riêng mình.</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <StarOutlined style={{ fontSize: '24px !important', marginRight: '10px' }} />
              <div className='ms-3'>
                <h5 className="fw-bold" style={{ fontSize: '16px' }}>Vệ sinh tăng cường</h5>
                <p className="text-muted mb-0" style={{ fontSize: '16px' }}>
                  Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước của Airbnb.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <TrophyOutlined style={{ fontSize: '24px !important', marginRight: '10px' }} />
              <div className='ms-3'>
                <h5 className="fw-bold" style={{ fontSize: '16px' }}>Phong là Chủ nhà siêu cấp</h5>
                <p className="text-muted mb-0" style={{ fontSize: '16px' }}>
                  Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết
                  mang lại quãng thời gian ở tuyệt vời cho khách.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <ScheduleOutlined style={{ fontSize: '24px !important', marginRight: '10px' }} />
              <div className='ms-3'>
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
              <p className='mt-4 text-justify' >Chào mừng bạn đến với Botanicahome! Chúng tôi hân hạnh mời bạn trải nghiệm ngôi nhà của gia đình chúng tôi. Chúng tôi muốn tạo ra một không gian nơi mọi người cảm thấy hoàn toàn thoải mái và như ở nhà. Căn hộ studio nằm trong tòa nhà nhỏ gần khu phố cổ và trung tâm thành phố. Tòa nhà này được xây dựng và được vận hành bởi chính gia đình. Chúng tôi sẽ cố gắng tính toán từng chi tiết, lớn nhỏ để làm bạn hài lòng và mang đến cho bạn một môi trường gọn gàng, sạch sẽ, an toàn, giá cả phải chăng và ấm cúng.</p>
            </div>
            <hr />
            <h3 className="fw-bold my-4">Các tiện ích đi kèm</h3>
            <div className="row">
              {availableFeatures.map((feature, index) => (
                <div className="col-6 mb-3" key={index}>
                  <FontAwesomeIcon className="w-5 h-5" style={{ fontSize: "20px" }} icon={feature.icon} />
                  <span className=" mb-5">{feature.label}</span>
                </div>
              ))}
            </div>


          </div>
          <div className="col-md-5"></div>
        </div>
        <hr />
      </div>
        
    </>
  )
}

export default Detail