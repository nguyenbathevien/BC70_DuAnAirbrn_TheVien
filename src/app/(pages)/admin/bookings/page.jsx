'use client';
import React from 'react';
import { Space, Table } from 'antd';
import TitleSearch from '@/app/component/TitleSearch';

const Booking = () => {
  const columns = [
    { title: 'Mã Đặt Phòng', dataIndex: 'id', key: 'id' },
    { title: 'Tên Khách Hàng', dataIndex: 'customer', key: 'customer' },
    { title: 'Ngày Đặt', dataIndex: 'date', key: 'date' },
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
    { id: '1', customer: 'Nguyễn Văn A', date: '2024-10-01' },
    { id: '2', customer: 'Trần Thị B', date: '2024-10-05' },
  ];

  return (
    <div>
      <TitleSearch  title="Đặt phòng"></TitleSearch>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Booking;
