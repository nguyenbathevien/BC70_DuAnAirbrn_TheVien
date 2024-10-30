'use client';
import Head from 'next/head';
import FooterComponent from '@/app/component/FooterComponent';
import HeaderMenu from '@/app/component/HomePage/HeaderMenu';
import { setProfileActionAsync, updateProfileActionAsync, uploadAvatarActionAsync } from '@/app/redux/reducer/userReducer';
import { CheckCircleFilled, CloseCircleFilled, UserOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Table, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
    const dispatch = useDispatch();
    const { userProfile } = useSelector((state) => state.userReducer);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editableProfile, setEditableProfile] = useState(userProfile);
    const getProfileApi = async () => {
        await dispatch(setProfileActionAsync());
    };
    useEffect(() => {
    getProfileApi();
    }, [dispatch]);

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
                <strong>Vai trò:</strong>
                <Input
                    value={editableProfile.role}
                    onChange={(e) => setEditableProfile({ ...editableProfile, role: e.target.value })}
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

   

    return (
        <>
            <Head>
                <title>Hồ Sơ Của {userProfile.name}</title>
                <meta name="description" content={`Thông tin chi tiết về hồ sơ của ${userProfile.name}. Cập nhật và quản lý thông tin cá nhân của bạn dễ dàng.`} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://demo4.cybersoft.edu.vn/profile/${userProfile.id}`} />
            </Head>
            <div className="container my-4">
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
                        {/* Giả sử apiBook là một biến chứa dữ liệu phòng đã thuê */}
                        {userProfile.apiBook ? (
                            <Table dataSource={userProfile.apiBook} />
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
