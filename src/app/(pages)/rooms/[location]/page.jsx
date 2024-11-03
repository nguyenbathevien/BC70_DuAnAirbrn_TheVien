import { getApiRoomByIdLocationAction } from '@/app/actions/service/roomApi';
import FooterComponent from '@/app/component/FooterComponent';
import HeaderMenu from '@/app/component/HomePage/HeaderMenu';
import { Card, Carousel } from 'antd';
import Link from 'next/link';
import React from 'react';

const capitalizeWords = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
const formatDate = (dateString) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('-');
  return `${day}/${month}/${year}`;
};
const Location = async ({ params, searchParams }) => {
  const idLocation = params.location;
  const selectedDate = searchParams.date ? JSON.parse(decodeURIComponent(searchParams.date)) : null;

  const locationSlug = searchParams.location ? decodeURIComponent(searchParams.location) : '';
  const locationName = capitalizeWords(locationSlug);
  
  const ApiRoomLocation = await getApiRoomByIdLocationAction(idLocation);
  const renderAllRoomLocation = () => {
    return ApiRoomLocation.map((item, index) => (
      <div key={index}>
        <Link href={`/room-detail/${item.id}`} style={{ textDecoration: 'none' }}>
          <div className="card m-3" style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <div className="row g-0">
              <div className="col-md-6">
                <Carousel dots={false} arrows>
                  <div>
                    <img
                      alt="example"
                      src={item.hinhAnh}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <img
                      alt="example"
                      src={item.hinhAnh}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  </div>
                </Carousel>
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-between p-2">
                <div>
                  <p
                    className="text-muted"
                    title={`Toàn bộ căn hộ dịch vụ tại ${locationName}`}
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis', 
                    }}
                  >
                    Toàn bộ căn hộ dịch vụ tại {locationName}
                  </p>
                  <h5
                    className="mt-2"
                    title={item.tenPhong}
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.tenPhong}
                  </h5>
                  <hr />
                  <p
                    className="text-muted mb-1"
                    title={
                      `${item.khach !== 0 ? `Khách: ${item.khach} ` : ''}` +
                      `${item.phongNgu !== 0 ? `| Phòng ngủ: ${item.phongNgu} ` : ''}` +
                      `${item.giuong !== 0 ? `| Giường: ${item.giuong} ` : ''}` +
                      `${item.phongTam !== 0 ? `| Phòng tắm: ${item.phongTam}` : ''}`
                    }
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      fontSize: '14px'
                    }}
                  >
                    {item.khach !== 0 && `Khách: ${item.khach} `}
                    {item.phongNgu !== 0 && `| Phòng ngủ: ${item.phongNgu} `}
                    {item.giuong !== 0 && `| Giường: ${item.giuong} `}
                    {item.phongTam !== 0 && `| Phòng tắm: ${item.phongTam}`}
                  </p>
                    <p style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      fontSize: '14px'
                    }} className="text-muted mb-1" title = {
                      `${item.mayGiat ? "Máy giặt ": ""}` +
                      `${item.banLa ? " Bàn là ": ""}` +
                      `${item.tivi ? " TiVi ": ""}` +
                      `${item.dieuHoa ? " Điều hòa ": ""}` +
                      `${item.wifi ? " Wifi ": ""}` +
                      `${item.bep ? " Bếp ": ""}` +
                      `${item.doXe ? " Đỗ xe ": ""}` +
                      `${item.hoBoi ? " Hồ bơi ": ""}` 
                    }>
                    {item.mayGiat && "| Máy giặt "}
                    {item.banLa && "| Bàn là "}
                    {item.tivi && "| TiVi "}
                    {item.dieuHoa && "| Điều hòa "}
                    {item.wifi && "| Wifi "}
                    {item.bep && "| Bếp "}
                    {item.doXe && "| Đỗ xe "}
                    {item.hoBoi && "| Hồ bơi "}
                    </p>
                </div>
              </div>
            </div>
          </div>
        </Link>


      </div>
    ));
  };
  
  return (
    <div >
      <HeaderMenu/>
    <div className="container my-5 py-3">
      <p>Có {ApiRoomLocation.length} chỗ ở tại {locationName}</p>
      {selectedDate && selectedDate.length > 0 ? `Từ ${formatDate(selectedDate[0])} Đến ${formatDate(selectedDate[1])}` : ""}
      <h1>Danh sách phòng khu vực bạn đã chọn </h1>
      <div className="row">
        <div className="col-md-6">
          {renderAllRoomLocation()}
        </div>
        <div className="col-md-6">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d984200.3130039243!2d107.31521886875078!3d15.509560292807175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420dd4e1353a7b%3A0xe49cabb166747679!2zUXXhuqNuZyBOYW0sIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1730561726170!5m2!1svi!2s" width="100%" height="100%" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
    <FooterComponent/>
    </div>
  );
};

export default Location;