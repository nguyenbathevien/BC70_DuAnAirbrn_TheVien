'use client';
import Head from 'next/head';
import FooterComponent from '@/app/component/FooterComponent';
import HeaderMenu from '@/app/component/HomePage/HeaderMenu';
import { setProfileActionAsync, updateProfileActionAsync, uploadAvatarActionAsync } from '@/app/redux/reducer/userReducer';
import { CheckCircleFilled, CloseCircleFilled, UserOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Table, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiRoomForUserActionAsync } from '@/app/redux/reducer/bookreducer';

const Profile = () => {
    const dispatch = useDispatch();
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const [isProfileLoaded, setIsProfileLoaded] = useState(false);
    const { userProfile } = useSelector((state) => state.userReducer);
    const { apiUserBook } = useSelector((state) => state.bookreducer);
    console.log("du lieu",apiUserBook)
    const getApiRoomBook = () => {
        dispatch(getApiRoomForUserActionAsync(userProfile.id))
    } 
    const [editableProfile, setEditableProfile] = useState(userProfile);    
    const getProfileApi = async () => {
        await dispatch(setProfileActionAsync());
        setIsProfileLoaded(true);
    };
    const showModal = () => {
        setEditableProfile(userProfile);
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const renderUserProfile = () => (
        <div>
            <p>
                <strong>ID:</strong>
                <Input value={editableProfile.id} readOnly />
            </p>
            <p>
                <strong>Tên:</strong>
                <Input
                    value={editableProfile.name}
                    onChange={(e) => setEditableProfile({ ...editableProfile, name: e.target.value })}
                />
            </p>
            <p>
                <strong>Email:</strong>
                <Input
                    value={editableProfile.email}
                    onChange={(e) => setEditableProfile({ ...editableProfile, email: e.target.value })}
                />
            </p>
            <p>
                <strong>Phone:</strong>
                <Input
                    value={editableProfile.phone}
                    onChange={(e) => setEditableProfile({ ...editableProfile, phone: e.target.value })}
                />
            </p>
            <p>
                <strong>Giới tính:</strong>
                <Input
                    value={editableProfile.gender ? "Nam":"Nữ"}
                    onChange={(e) => setEditableProfile({ ...editableProfile, gender: e.target.value })}
                />
            </p>
        </div>
    );
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const filedata = new FormData();
        filedata.append('formFile', file);
        try {
            await dispatch(uploadAvatarActionAsync(filedata));
        } catch (err) {
            alert("Vui lòng chọn file hợp lệ");
            console.error("Error uploading file:", err);
        }
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Mã người dùng',
            dataIndex: 'maNguoiDung',
            key: 'maNguoiDung',
        },
        {
            title: 'Mã phòng',
            dataIndex: 'maPhong',
            key: 'maPhong',
        },
        {
            title: 'Ngày đến',
            dataIndex: 'ngayDen',
            key: 'ngayDen',
            render: (text) => new Date(text).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Ngày đi',
            dataIndex: 'ngayDi',
            key: 'ngayDi',
            render: (text) => new Date(text).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Số lượng khách',
            dataIndex: 'soLuongKhach',
            key: 'soLuongKhach',
        },
    ];
    useEffect(() => {
    getProfileApi();
    }, [dispatch]);
    useEffect(() => {
        if (isProfileLoaded && userProfile.id) {
            getApiRoomBook();
        }
      }, [isProfileLoaded, userProfile]);
    
    return (
        <>
            <Head>
                <title>Hồ Sơ Của {userProfile.name}</title>
                <meta name="description" content={`Thông tin chi tiết về hồ sơ của ${userProfile.name}. Cập nhật và quản lý thông tin cá nhân của bạn dễ dàng.`} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://demo4.cybersoft.edu.vn/profile/${userProfile.id}`} />
            </Head>
            <HeaderMenu/>
            <div className="container py-3 my-4">
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <div className="card p-4">
                            <div className="d-flex flex-column align-items-center">
                                {userProfile.avatar ? (
                                    <img
                                        src={userProfile.avatar}
                                        width="70%"
                                        alt={`Avatar của ${userProfile.name}`}
                                        className="mb-3 rounded-circle"
                                    />
                                ) : (
                                    <UserOutlined className="mb-3" style={{ backgroundColor: 'black', fontSize: '150px', color: 'white' }} />
                                )}
                                <span
                                    className='mt-2'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => document.getElementById('fileInput').click()}
                                >
                                    Cập nhật ảnh
                                </span>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="mt-3 d-flex align-items-center">
                                <CheckCircleFilled className="text-success me-3" style={{ fontSize: '20px' }} />
                                <span className="fw-bold" style={{ fontSize: '20px' }}>Xác minh danh tính</span>
                            </div>
                            <p className='mt-3'>Xác minh danh tính của bạn với huy hiệu xác minh danh tính.</p>
                            <Button style={{ width: 'auto' }}>Nhận huy hiệu</Button>
                            <hr />
                            <h5 className='fw-bold mt-3'>{userProfile.name} đã xác nhận</h5>
                            <div className="d-flex">
                                {userProfile.phone ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: 'red' }} />}
                                <span className='ms-3'>Số điện thoại</span>
                            </div>
                            <div className="d-flex">
                                {userProfile.email ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: 'red' }} />}
                                <span className='ms-3'>Địa chỉ email</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 mt-4">
                        <h1 className='fw-bold'>Xin chào, Tôi là {userProfile.name}</h1>
                        <p>Bắt đầu tham gia vào tháng 10</p>
                        <a style={{ cursor: 'pointer' }} className='fw-bold text-dark' onClick={showModal}>
                            Chỉnh sửa hồ sơ
                        </a>
                        <h3 className='fw-bold mt-3'>Phòng Đã Thuê</h3>
                        {apiUserBook ? (
                            <Table dataSource={apiUserBook} columns={columns}  rowKey="id"/>
                        ) : (
                            <p>Bạn chưa đặt phòng nào</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Popup chỉnh sửa hồ sơ */}
            <Modal
                title="Chỉnh sửa hồ sơ"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Hủy</Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => {
                            Modal.confirm({
                                title: 'Xác nhận thay đổi',
                                content: 'Bạn có chắc chắn muốn thay đổi?',
                                onOk: async () => {
                                    try {
                                        await dispatch(updateProfileActionAsync(editableProfile));
                                        setIsModalVisible(false);
                                    } catch (err) {
                                        alert("Lỗi khi cập nhật");
                                        console.error("Error updating profile:", err);
                                    }
                                },
                                onCancel() {
                                    console.log('Hủy thay đổi');
                                },
                            });
                        }}
                    >
                        Lưu
                    </Button>
                ]}
            >
                {editableProfile ? renderUserProfile() : <p>Không có thông tin người dùng</p>}
            </Modal>

            <FooterComponent />
        </>
    );
};

export default Profile;
