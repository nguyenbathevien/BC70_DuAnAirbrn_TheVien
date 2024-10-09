'use client';
import React from 'react';
import { Space, Table } from 'antd';

const columns = [
  {
    title: 'Mã Phòng',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên Phòng',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Hình Ảnh',
    dataIndex: 'id',
    key: 'image',
    render: (id) => (
      <img
        src={`https://i.pravatar.cc/150?u=${id}`}
        alt={`Room ${id}`}
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    ),
  },
  {
    title: 'Địa Điểm',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'GuestMax',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <button className="btn btn-success">Xem Thông tin chi tiết</button>
        <button className="btn btn-warning">Sửa</button>
        <button className="btn btn-danger">X</button>
      </Space>
    ),
  },
];

const data = [
  {
    id: '1',
    name: 'John Brown',
    location: 'New York No. 1 Lake Park',
    count: 4,
  },
  {
    id: '2',
    name: 'Jim Green',
    location: 'London No. 1 Lake Park',
    count: 10,
  },
  {
    id: '3',
    name: 'Joe Black',
    location: 'Sydney No. 1 Lake Park',
    count: 6,
  },
];

const TableAdmin = () => {
  return (
    <div>
      <input
        type="text"
        className="input-group d-inline me-3 px-3"
        style={{ width: '700px' }}
        placeholder="Tìm kiếm..."
      />
      <button className="btn btn-danger">Tìm</button>
      <Table columns={columns} dataSource={data} bordered rowKey="id" />

    </div>
  );
};

export default TableAdmin;
