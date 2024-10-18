'use client';
import React from 'react';
import { Space, Table } from 'antd';
import TitleSearch from '@/app/component/TitleSearch';

const Room = () => {
  const handleSearchRoom = () => {}
  const columns = [
    { title: 'Mã Phòng', dataIndex: 'id', key: 'id' },
    { title: 'Tên Phòng', dataIndex: 'name', key: 'name' },
    { title: 'Địa Điểm', dataIndex: 'location', key: 'location' },
    { title: 'Số Khách', dataIndex: 'count', key: 'count' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div key={record.id}>
          <Space size="middle" >
          <button className="btn btn-primary">Xem Thông tin chi tiết</button>
          <button className="btn btn-warning">Sửa</button>
          <button className="btn btn-danger">Xóa</button>
        </Space>
        </div>
      ),
    },
  ];

  const data = [
    { id: '1', name: 'Phòng A', location: 'Hà Nội', count: 2 },
    { id: '2', name: 'Phòng B', location: 'Hồ Chí Minh', count: 4 },
  ];

  return (
    <div>
      <TitleSearch title="Thêm Phòng" onSearch={handleSearchRoom}></TitleSearch>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Room;
