import React from 'react';
import { Card, Carousel, Rate } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { getAllApiRoomAction } from '@/app/actions/service/roomApi';
import Head from 'next/head';
import Link from 'next/link';
import HeaderMenu from '@/app/component/HomePage/HeaderMenu';
import FooterComponent from '@/app/component/FooterComponent';

const Rooms = async () => {
  const apiRoom = await getAllApiRoomAction();
  const renderAllRoom = () => {
    return apiRoom.map((item, index) => (
      <div className="col-md-4 my-3" key={index}>
        <Link href={`/room-detail/${item.id}`} style={{ textDecoration: 'none' }}>
          <Card
            hoverable
            style={{ width: 300, borderRadius: '10px', overflow: 'hidden' }}
            cover={
              <div style={{ position: 'relative',zIndex:100 }}>
                <span className="position-absolute top-0 start-0 m-2 bg-white px-2 py-1 rounded text-muted">
                  Guest favorite
                </span>
                <HeartOutlined
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    fontSize: '24px',
                    color: 'rgba(0,0,0,0.5)',
                  }}
                />
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
            }
          >
            <div className="mt-2">
              <h5
                className="mb-1"
                title={item.tenPhong}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {item.tenPhong}
              </h5>
              <p
                className="text-muted mb-1"
                title={item.moTa}
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {item.moTa}
              </p>
              <p className="fw-bold mb-1">
                $ {item.giaTien} <span className="text-muted">/ night</span>
              </p>
            </div>
          </Card>
        </Link>
      </div>
    ));
  };

  return (
    <>
      <Head>
        <title>Danh sách phòng - Airbnb</title>
        <meta name="description" content="Khám phá danh sách phòng tại Airbnb" />
      </Head>
      <HeaderMenu />
      <div className="container mt-5">
        <h3 className='mt-5 py-3'>Khu vực bạn đã chọn</h3>
        <div className="row">{renderAllRoom()}</div>
      </div>
      <FooterComponent/>
    </>
  );
};

export default Rooms;
