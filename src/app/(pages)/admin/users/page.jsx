"use client"
import React, { useEffect, useState } from 'react';
import { Space, Spin, Table, Modal, message, Button, DatePicker } from 'antd';
import TitleSearch from '@/app/component/TitleSearch';
import { useDispatch, useSelector } from 'react-redux';
import { addUserActionAsync, deleteUserActionAsync, getApiUserActionAsync, updateUserActionAsync } from '@/app/redux/reducer/adminReducer/adminreducer';
import { DeleteFilled, EditFilled, UserOutlined, } from '@ant-design/icons';

const User = () => {
  const dispatch = useDispatch();
  const userApi = useSelector(state => state.adminReducer.userApi);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const handleSearch = (value) => {
    setSearch(value);
  };
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userForm, setUserForm] = useState({
    id: '',
    name: '',
    email: '',
    role: ''
  });
  const [initialUserForm, setInitialUserForm] = useState({
    id: '',
    name: '',
    email: '',
    role: ''
  });
  const [modalType, setModalType] = useState(null);
  const [modalRecord, setModalRecord] = useState(null);
  const getApiUser = async () => {
    setLoading(true);
    const action = await getApiUserActionAsync();
    dispatch(action);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const showModal = (type, record) => {
    setModalType(type);
    setModalRecord(record);

    if (type === 'edit') {
      setUserForm({
        id: record.id,
        name: record.name,
        email: record.email,
        birthday: record.birthday,
        gender: record.gender,
        role: record.role
      })
      setInitialUserForm({
        id: record.id,
        name: record.name,
        email: record.email,
        birthday: record.birthday,
        gender: record.render,
        role: record.role
      });
      ;
    } else if (type === 'delete') {
      setUserForm({ id: record.id });
    } else if (type === 'add') {
      setUserForm({
        id: '0',
        name: '',
        email: '',
        birthday: '',
        gender: true,
        role: 'ADMIN'
      });
    }

    setIsModalVisible(true);
  };
  const handleOk = async () => {
    if (modalType === 'edit' && userForm.id) {
      try {
        await dispatch(updateUserActionAsync(userForm.id, userForm));
        const updatedUsers = filteredData.map(user => user.id === userForm.id ? { ...user, ...userForm } : user);
        setFilteredData(updatedUsers);
        setIsModalVisible(false);
      } catch (error) {
        message.error("Lỗi khi cập nhật!");

      }
    } else if (modalType === 'delete' && modalRecord.id) {
      try {
        await dispatch(deleteUserActionAsync(modalRecord.id));
        const updatedUsers = filteredData.filter(user => user.id !== modalRecord.id);
        setFilteredData(updatedUsers);
        setIsModalVisible(false);
      } catch (error) {
        message.error("Lỗi khi xóa!");

      }
    } else if (modalType === 'add') {
      if (!userForm.name || !userForm.email) {
        message.warning("Vui lòng điền đầy đủ thông tin!");
        return;
      }
      try {
        await dispatch(addUserActionAsync(userForm));
        await getApiUser();
        setIsModalVisible(false);
      } catch (error) {
        message.error("Lỗi khi thêm!");

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
              <label className="form-label">Birthday</label>
              <input
                type="date"
                className="form-control"
                value={userForm.birthday ? userForm.birthday.split('/').reverse().join('-') : ''}
                onChange={(e) => {
                  const dateValue = e.target.value;
                  const formattedDate = dateValue.split('-').reverse().join('/');
                  setUserForm({ ...userForm, birthday: formattedDate });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-control"
                value={userForm.gender}
                onChange={(e) => setUserForm({ ...userForm, gender: e.target.value })}
              >
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>

            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-control"
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>

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
              <label className="form-label">Birthday</label>
              <input
                type="date"
                className="form-control"
                value={userForm.birthday ? userForm.birthday.split('/').reverse().join('-') : ''}
                onChange={(e) => {
                  const dateValue = e.target.value;
                  const formattedDate = dateValue.split('-').reverse().join('/');
                  setUserForm({ ...userForm, birthday: formattedDate });
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-control"
                value={userForm.gender}
                onChange={(e) => setUserForm({ ...userForm, gender: e.target.value })}
              >
                <option value="true">Nam</option>
                <option value="false">Nữ</option>
              </select>

            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              >
                <option value="">Chọn vai trò</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
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
    { title: 'ID', dataIndex: 'id', key: 'id', width: "10%", sorter: (a, b) => a.id - b.id },
    {
      title: 'Tên Người Dùng', dataIndex: 'name', key: 'name', width: "20%", render: (img, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {record.avatar ? (
            <img src={record.avatar} alt="avatar" style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} />
          ) : (
            <UserOutlined style={{ fontSize: 30, marginRight: 8, color: 'white', background: 'black', borderRadius: '50%' }} />
          )}
          {img}
        </div>
      ), ellipsis: true
    },
    { title: 'Email', dataIndex: 'email', key: 'email', width: "25%", ellipsis: true }
    ,

    {
      title: 'Birthday', dataIndex: 'birthday', key: 'birthday', width: "15%", ellipsis: true,
      render: (text) => {
        const dateParts = text.split('-');
        return dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : text;
      }
    },
    {
      title: 'Giới tính', dataIndex: 'gender', key: 'gender', width: "10%", render: (gender) => (
        <span>{gender ? 'Nam' : 'Nữ'}</span>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: "10%",
      render: (role) => (
        <span style={{ color: role.toUpperCase() === 'ADMIN' ? 'blue' : 'red' }}>
          {role}
        </span>
      ),
      filters: [
        { text: 'ADMIN', value: 'ADMIN' },
        { text: 'USER', value: 'USER' },
      ],
      onFilter: (value, record) => record.role.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Action',
      key: 'action',
      width: "10%",
      render: (_, record) => (
        <div>
          <Space size="middle">

            <span onClick={() => showModal('edit', record)} style={{ cursor: 'pointer' }}>
              <EditFilled className="text-warning" style={{ fontSize: '1.5rem' }} />
            </span>
            <span onClick={() => showModal('delete', record)} style={{ cursor: 'pointer' }}>
              <DeleteFilled className="text-danger" style={{ fontSize: '1.5rem' }} />
            </span>
          </Space>
        </div>
      ),
    },
  ];
  const data = filteredData.map((item, idx) => ({
    ...item,
    key: idx
  }));
  const isFormChanged = () => {
    return JSON.stringify(userForm) !== JSON.stringify(initialUserForm);
  };
  useEffect(() => {
    getApiUser();
  }, [dispatch]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(userApi);
    } else {
      const filtered = userApi.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [search, userApi]);

  return (
    <div className="table-admin">
      <TitleSearch title="Thêm quản trị viên" onClick={() => { showModal("add") }} onSearch={handleSearch} />

      {loading ? (
        <Spin  style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}

      <Modal
        title={modalType === 'add' ? "Thêm quản trị viên" : "Cập nhật người dùng"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !isFormChanged() }}
        okText={modalType === 'add' ? "Thêm Admin" : "Cập nhật"}
      >
        {renderModalContent(modalType, modalRecord)}
      </Modal>
    </div>
  );
};

export default User;
