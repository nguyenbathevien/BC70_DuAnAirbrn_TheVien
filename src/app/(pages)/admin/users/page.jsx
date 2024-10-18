"use client"
import React, { useEffect, useState } from 'react';
import { Space, Spin, Table, Modal, message } from 'antd';
import TitleSearch from '@/app/component/TitleSearch';
import { useDispatch, useSelector } from 'react-redux';
import { addUserActionAsync, deleteUserActionAsync, getApiUserActionAsync, updateUserActionAsync } from '@/app/redux/reducer/adminReducer/adminReducer';

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.adminReducer.userApi);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [userForm, setUserForm] = useState({
    id: '',
    name: '',
    email: '',
    role: ''
  });

  const [modalType, setModalType] = useState(null);
  const [modalRecord, setModalRecord] = useState(null);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const getApiUser = async () => {
    setLoading(true);
    const action = await getApiUserActionAsync();
    dispatch(action);
    setLoading(false);
  };

  const showModal = (type, record) => {
    setModalType(type);
    setModalRecord(record);

    if (type === 'edit') {
      setUserForm({
        id: record.id,
        name: record.name,
        email: record.email,
        role: record.role
      });
    } else if (type === 'delete') {
      setUserForm({ id: record.id });
    } else if (type === 'add') {
      setUserForm({
        id: '0',
        name: '',
        email: '',
        role: 'ADMIN'
      });
    }

    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (modalType === 'edit' && userForm.id) {
      try {
        await dispatch(updateUserActionAsync(userForm.id, userForm));
        await getApiUser();
        setIsModalVisible(false);
      } catch (error) {
        message.error("Cập nhật thất bại!");
        
      }
    } else if (modalType === 'delete' && modalRecord.id) {
      try {
        await dispatch(deleteUserActionAsync(modalRecord.id));
        await getApiUser();
        setIsModalVisible(false);
      } catch (error) {
        message.error("Xóa thất bại!");
        
      }
    } else if (modalType === 'add') {
        if (!userForm.name || !userForm.email ) {
        message.warning("Vui lòng điền đầy đủ thông tin!");
        return;
      }
      try {
        await dispatch(addUserActionAsync(userForm));
        await getApiUser();
        setIsModalVisible(false);
      } catch (error) {
        message.error("Thêm thất bại!");
        
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderModalContent = (type, record) => {
    switch (type) {
      case 'add':
        return (
          <>
            <div className="mb-3">
              <label className="form-label">ID</label>
              <input type="text" className="form-control" value={userForm.id} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Tên</label>
              <input
                type="text"
                className="form-control"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input
                readOnly
                type="text"
                className="form-control"
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              />
            </div>

          </>
        );
      case 'view':
        return (
          <>
            <div className="mb-3">
              <label className="form-label">ID</label>
              <input type="text" className="form-control" value={record.id} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Tên</label>
              <input type="text" className="form-control" value={record.name} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={record.email} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input type="text" className="form-control" value={record.role} readOnly />
            </div>
          </>
        );
      case 'edit':
        return (
          <>
            <div className="mb-3">
              <label className="form-label">ID</label>
              <input type="text" className="form-control" value={record.id} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label">Tên</label>
              <input
                type="text"
                className="form-control"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              />
            </div>
          </>
        );
      case 'delete':
        return <p>Bạn có chắc chắn muốn xóa người dùng {record.name} không?</p>;
      default:
        return null;
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: "10%" },
    { title: 'Tên Người Dùng', dataIndex: 'name', key: 'name', width: "20%", ellipsis: true },
    { title: 'Email', dataIndex: 'email', key: 'email', width: "20%", ellipsis: true },
    { title: 'Role', dataIndex: 'role', key: 'role', width: "10%" },
    {
      title: 'Action',
      key: 'action',
      width: "40%",
      render: (_, record) => (
        <div>
          <Space size="middle">
            <button className="btn btn-primary" onClick={() => showModal('view', record)}>Xem Thông tin chi tiết</button>
            <button className="btn btn-warning" onClick={() => showModal('edit', record)}>Sửa</button>
            <button className="btn btn-danger" onClick={() => showModal('delete', record)}>Xóa</button>
          </Space>
        </div>
      ),
    },
  ];

  const data = filteredData.map((item, idx) => ({
    ...item,
    key: idx
  }));

  useEffect(() => {
    getApiUser();
  }, [dispatch]);

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

  return (
    <div className="table-admin">
      <TitleSearch title="Thêm quản trị viên" onClick={() => { showModal("add") }} onSearch={handleSearch} />

      {loading ? (
        <Spin />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}

      <Modal
        title={modalType === 'add' ? "Thêm quản trị viên" : "Chi tiết người dùng"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {renderModalContent(modalType, modalRecord)}
      </Modal>
    </div>
  );
};

export default User;
