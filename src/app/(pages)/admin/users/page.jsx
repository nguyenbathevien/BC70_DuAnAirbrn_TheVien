'use client';
import React, { useEffect, useState } from 'react';
import { Space, Spin, Table } from 'antd';
import TitleSearch from '@/app/component/TitleSearch';
import { useDispatch, useSelector } from 'react-redux';
import { getApiUserActionAsync } from '@/app/redux/reducer/adminReducer/adminReducer';

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.adminReducer.userApi);
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (value) => {
    setSearch(value); 
  };
  const getApiUser = async () => {
    setLoading(true); 
    const action = await getApiUserActionAsync();
    dispatch(action);
    setLoading(false); 
  };

  useEffect(() => {
    getApiUser(); 
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [search, users]); 

 

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên Người Dùng', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Space size="middle">
            <button className="btn btn-primary">Xem Thông tin chi tiết</button>
            <button className="btn btn-warning">Sửa</button>
            <button className="btn btn-danger">Xóa</button>
          </Space>
        </div>
      ),
    },
  ];

  const data = filteredData.map((item, idx) => ({
    ...item,
    key: idx 
  }));

  return (
    <div className="table-admin">
      <TitleSearch title="Thêm quản trị viên" onSearch={handleSearch} />

      {loading ? (
        <Spin />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </div>
  );
};

export default User;
