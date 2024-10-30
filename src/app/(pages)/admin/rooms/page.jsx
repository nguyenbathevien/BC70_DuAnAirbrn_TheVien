'use client';
import React, { useEffect, useState } from 'react';
import { Space, Spin, Table, Modal, message } from 'antd';
import TitleSearch from '@/app/component/TitleSearch';
import { addRoomActionAsync, deleteRoomActionAsync, getApiRoomActionAsync, updateRoomActionAsync } from '@/app/redux/reducer/adminReducer/roomreducer';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

const Room = () => {
  const dispatch = useDispatch();
  const { apiRoom } = useSelector((state) => state.roomReducer);
  const [loading, setLoading] = useState(true);
  const [searchRoom, setSearchRoom] = useState("");
  const handleSearchRoom = (value) => {
    setSearchRoom(value);
  };
  const [filteredData, setFilteredData] = useState([{}]);
  const removeDiacritics = (str) => {
    const diacriticsMap = {
      'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
      'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
      'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
      'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
      'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
      'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
      'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
      'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
      'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
      'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
      'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
      'đ': 'd',
    };

    return str.split('').map(char => diacriticsMap[char] || char).join('');
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomForm, setRoomForm] = useState({
    id: '',
    maViTri: '',
    tenPhong: '',
    phongNgu: '',
    giuong: '',
    phongTam: '',
    giaTien: '',
    hinhAnh: '',
    khach: ''
  });
  const [initialRoomForm, setInitialRoomForm] = useState({
    id: '',
    maViTri: '',
    tenPhong: '',
    phongNgu: '',
    giuong: '',
    phongTam: '',
    giaTien: '',
    hinhAnh: '',
    khach: ''
  });
  const [modalType, setModalType] = useState(null);
  const [modalRecord, setModalRecord] = useState(null);
  const getApiRoom = () => {
    setLoading(true);
    const action = getApiRoomActionAsync();
    dispatch(action);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const showModal = (type, record) => {
    setModalType(type);
    setModalRecord(record);

    if (type === 'edit') {
      setRoomForm({
        id: record.id,
        maViTri: record.maViTri,
        tenPhong: record.tenPhong,
        phongNgu: record.phongNgu,
        giuong: record.giuong,
        phongTam: record.phongTam,
        giaTien: record.giaTien,
        hinhAnh: record.hinhAnh,
      });

      setInitialRoomForm({
        id: record.id,
        maViTri: record.maViTri,
        tenPhong: record.tenPhong,
        phongNgu: record.phongNgu,
        giuong: record.giuong,
        phongTam: record.phongTam,
        giaTien: record.giaTien,
        hinhAnh: record.hinhAnh,
      });
    } else if (type === 'delete') {
      setRoomForm({ id: record.id });
    } else if (type === 'add') {
      setRoomForm({
        id: '0',
        maViTri: '',
        tenPhong: '',
        phongNgu: '',
        giuong: '',
        phongTam: '',
        giaTien: '',
        hinhAnh: ''
      });
    }

    setIsModalVisible(true);
  };
  const handleOk = async () => {
    if (modalType === 'edit' && roomForm.id) {
      try {
        await dispatch(updateRoomActionAsync(roomForm.id, roomForm));
        const updatedRooms = filteredData.map(room => room.id === roomForm.id ? { ...room, ...roomForm } : room);
        setFilteredData(updatedRooms);
        setIsModalVisible(false);
        message.success("Cập nhật Thành công!");
      } catch (err) {
        message.error('Cập nhật thất bại');
      }
    } else if (modalType === 'delete' && modalRecord.id) {
      try {
        await dispatch(deleteRoomActionAsync(modalRecord.id))
        const updatedRooms = filteredData.filter(room => room.id !== modalRecord.id);
        setFilteredData(updatedRooms)
        setIsModalVisible(false)
        message.success("Xóa thành công")
      } catch (err) {
        message.error("Xóa Thất bại")
      }
    } else if (modalType === 'add') {
      if (!isDataComplete(roomForm)) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return
      } try {
        await dispatch(addRoomActionAsync(roomForm));
        await getApiRoom();
        setIsModalVisible(false);
      } catch (error) {
        message.error("Thêm thất bại!");
        console.log("err: ", error)

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
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">ID</label>
                <input type="number" className="form-control" value={roomForm.id} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Mã vị trí</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.maViTri ?? 1}
                  min="1"
                  onChange={(e) => setRoomForm({ ...roomForm, maViTri: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, maViTri: value });
                  }}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Số lượng khách</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.khach ?? 1}
                  min="1"
                  onChange={(e) => setRoomForm({ ...roomForm, khach: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, khach: value });
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Tên Phòng</label>
                <input
                  type="text"
                  className="form-control"
                  value={roomForm.tenPhong}
                  onChange={(e) => setRoomForm({ ...roomForm, tenPhong: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Ảnh</label>
                <input
                  type="text"
                  className="form-control"
                  value={roomForm.hinhAnh}
                  onChange={(e) => setRoomForm({ ...roomForm, hinhAnh: e.target.value })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Phòng ngủ</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.phongNgu ?? 1}
                  onChange={(e) => setRoomForm({ ...roomForm, phongNgu: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, phongNgu: value });
                  }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Giường</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.giuong ?? 1}
                  onChange={(e) => setRoomForm({ ...roomForm, giuong: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, giuong: value });
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Phòng tắm</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.phongTam ?? 1}
                  onChange={(e) => setRoomForm({ ...roomForm, phongTam: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, phongTam: value });
                  }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Giá tiền</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.giaTien ?? 1}
                  onChange={(e) => setRoomForm({ ...roomForm, giaTien: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, giaTien: value });
                  }}
                />
              </div>
            </div>
          </>
        )
      case 'view':
        return (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">ID</label>
                  <input type="text" className="form-control" value={record.id} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tên phòng</label>
                  <input type="text" className="form-control" value={record.tenPhong} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số phòng ngủ</label>
                  <input type="text" className="form-control" value={record.phongNgu} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số giường</label>
                  <input type="text" className="form-control" value={record.giuong} readOnly />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Mã vị trí</label>
                  <input type="text" className="form-control" value={record.maViTri} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Số phòng tắm</label>
                  <input type="text" className="form-control" value={record.phongTam} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Giá tiền</label>
                  <input type="text" className="form-control" value={`${record.giaTien} $`} readOnly />
                </div>
              </div>
            </div>
          </>
        );

      case 'edit':
        return (
          <>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">ID</label>
                <input type="number" className="form-control" value={roomForm.id} readOnly />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Mã vị trí</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.maViTri ?? 1}
                  min="1"
                  onChange={(e) => setRoomForm({ ...roomForm, maViTri: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, maViTri: value });
                  }}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Số lượng khách</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.khach ?? record.khach}
                  min="1"
                  onChange={(e) => setRoomForm({ ...roomForm, khach: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, khach: value });
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Tên Phòng</label>
                <input
                  type="text"
                  className="form-control"
                  value={roomForm.tenPhong}
                  onChange={(e) => setRoomForm({ ...roomForm, tenPhong: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Ảnh</label>
                <input
                  type="text"
                  className="form-control"
                  value={roomForm.hinhAnh}
                  onChange={(e) => setRoomForm({ ...roomForm, hinhAnh: e.target.value })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Phòng ngủ</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.phongNgu ?? 1}
                  onChange={(e) => setRoomForm({ ...roomForm, phongNgu: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, phongNgu: value });
                  }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Giường</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.giuong ?? 1}
                  onChange={(e) => setRoomForm({ ...roomForm, giuong: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, giuong: value });
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Phòng tắm</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.phongTam ?? 1}
                  onChange={(e) => setRoomForm({ ...roomForm, phongTam: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, phongTam: value });
                  }}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Giá tiền</label>
                <input
                  type="number"
                  className="form-control"
                  value={roomForm.giaTien ?? 1}
                  onChange={(e) => setRoomForm({ ...roomForm, giaTien: e.target.value })}
                  onBlur={(e) => {
                    const value = Math.max(1, Number(e.target.value) || 1);
                    setRoomForm({ ...roomForm, giaTien: value });
                  }}
                />
              </div>
            </div>
          </>
        );
      case 'delete':
        return (
          <>
            <p>Bạn có chắc chắn muốn xóa Phòng {record.id} không?</p>
          </>
        );

      default:
        return null;
    }
  };
  const columns = [
    { title: 'Mã Phòng', dataIndex: 'id', key: 'id', width: "10%" },
    { title: 'Tên phòng', dataIndex: 'tenPhong', key: 'tenPhong', width: "30%", ellipsis: true },
    { title: 'Số lượng Khách', dataIndex: 'khach', key: 'khach', width: "10%" },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      width: "20%",
      render: (src) => {
        if (src && (src.startsWith("http://") || src.startsWith("https://"))) {
          return (
            <Image
              src={src}
              alt="Hình ảnh phòng"
              width={150}
              height={100}
              style={{ objectFit: 'cover' }}
              priority
            />
          );
        } else {
          return <span>Hình ảnh không có sẵn</span>;
        }
      },
    },
    {
      title: 'Thông tin',
      key: 'chitiet',
      width: "10%",
      render: (_, record) => (
        <span onClick={() => showModal('view', record)} style={{ cursor: 'pointer' }}>
          xem chi tiết
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <span onClick={() => showModal('edit', record)} style={{ cursor: 'pointer' }}>
            <EditFilled className="text-warning" style={{ fontSize: '1.5rem' }} />
          </span>
          <span onClick={() => showModal('delete', record)} style={{ cursor: 'pointer' }}>
            <DeleteFilled className="text-danger" style={{ fontSize: '1.5rem' }} />
          </span>
        </Space>
      ),
    },
  ];
  const data = filteredData.map((item, idx) => ({
    ...item,
    key: item.id || idx,
  }));
  const isDataComplete = (data) => {
    for (let key in data) {
      if (!data[key]) {
        return false;
      }
    }
    return true;
  };

  const isFormChanged = () => {
    return JSON.stringify(roomForm) !== JSON.stringify(initialRoomForm);
  };
  useEffect(() => {
    getApiRoom();
  }, []);
  useEffect(() => {
    if (searchRoom.trim() === "") {
      setFilteredData(apiRoom);
    } else {
      const filtered = apiRoom.filter((room) =>
        removeDiacritics(room.tenPhong.toLowerCase()).includes(removeDiacritics(searchRoom.toLowerCase()))
      );
      setFilteredData(filtered);
    }
  }, [searchRoom, apiRoom]);
  return (
    <div>
      <TitleSearch title="Thêm Phòng" onClick={() => {
        showModal('add', roomForm)
      }} onSearch={handleSearchRoom} />
      <div className="table-admin">
        {loading ? (<Spin  style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />) : <Table columns={columns} dataSource={data} scroll={{ x: '100%' }} />}
      </div>
      <Modal
        title={modalType === 'add' ? "Thêm Phòng" : "Chi tiết Phòng"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !isFormChanged() }}
        okText={modalType === 'add' ? "Thêm phòng" : "Cập nhật"}
      >
        {renderModalContent(modalType, modalRecord)}
      </Modal>
    </div>
  );
};

export default Room;