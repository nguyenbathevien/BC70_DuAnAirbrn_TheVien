import React from 'react';
import { Card, Carousel, Rate, Spin } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { TOKEN_CYBERSOFT } from '@/app/setting/setting';
import { getAllApiRoomAction } from '@/app/actions/service/roomApi';

const Rooms = async () => {
  
  
  const apiRoom = await getAllApiRoomAction()
 
  const renderAllRoom = () => {
    return apiRoom.map((item, index) => (
      <div className="col-4 my-3" key={index}>
        <Card
          hoverable
          style={{ width: 300, borderRadius: '10px', overflow: 'hidden' }}
          cover={
            <div style={{ position: 'relative' }}>
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
              <Carousel dots={false} arrows >
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
            <h5 className="mb-1" style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}>
              {item.tenPhong}
            </h5>
            <p className="text-muted mb-1" style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}>{item.moTa}</p>
            <p className="fw-bold mb-1">$ {item.giaTien} <span className="text-muted">/ night</span></p>
            <div className="d-flex align-items-center">
              <Rate allowHalf disabled defaultValue={3} style={{ fontSize: 16 }} />
            </div>
          </div>
        </Card>
      </div>
    ));
  };


  return (
    <div className="container">
      <h3>Khu vực bạn đã chọn</h3>
      <div className="row">
        { apiRoom ?renderAllRoom():<Spin/>}
      </div>
    </div>
  );
};

export default Rooms;
