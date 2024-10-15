'use client';
import React from 'react';
import { Space, Table } from 'antd';
import TitleSearch from '@/app/component/TitleSearch';

const Location = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên Vị Trí', dataIndex: 'name', key: 'name' },
    { title: 'Miêu Tả', dataIndex: 'description', key: 'description' },
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
    { id: '1', name: 'Hà Nội', description: 'Thủ đô Việt Nam' },
    { id: '2', name: 'Hồ Chí Minh', description: 'Thành phố lớn nhất Việt Nam' },
  ];

  return (
    <div>
      <TitleSearch title="Thêm vị trí"></TitleSearch>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Location;
