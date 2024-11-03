"use client"
import { deleteCookie, Email, TOKEN, USER_LOGIN } from '@/app/setting/setting';
import { UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const HeaderMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const {userLogin} = useSelector((state) => state.userReducer);
  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };
  const userDropdown = () => {
    return (
      <ul
        className="dropdown-menu show"
        style={{
          fontSize: '15px',
          position: 'absolute',
          top: '100%',
          left: '0',
          transform: 'translateY(13px)',
          zIndex: 1000,
          minWidth: '150px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '5px',
          padding: '10px 0',
        }}
      >
        {!userLogin ? (
          <>
            <li className="dropdown-item">
              <Link href="/register" className="text-decoration-none text-dark">Đăng ký</Link>
            </li>
            <li className="dropdown-item">
              <Link href="/login" className="text-decoration-none text-dark">Đăng nhập</Link>
            </li>
          </>
        ) : (
          <>
            <li className="dropdown-item">
              <Link href="/profile" className="text-decoration-none text-dark">Profile</Link>
            </li>
            {userLogin.role === "ADMIN" && (
              <li className="dropdown-item">
                <Link href="/admin/users" className="text-decoration-none text-dark">Page To Admin</Link>
              </li>
            )}
            <li className="dropdown-item">
              <Link href="/login" className="text-decoration-none text-dark" onClick={() => {
                localStorage.removeItem(TOKEN);
                localStorage.removeItem(Email);
                localStorage.removeItem(USER_LOGIN);
                deleteCookie(USER_LOGIN);
              }}>Đăng Xuất</Link>
            </li>
          </>
        )}
      </ul>
    );
  };
  useEffect(() => {
    setIsClient(true);
  }, [userLogin]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark text-white navbar-light fixed-top">
        <div className="container d-flex justify-content-between">
          <Link href="/" className="navbar-brand text-white d-flex align-items-center">
            <Image src="/assets/img/airbnb.svg" alt="Logo" width={30} height={30} priority crossOrigin="anonymous" />
            <span className="site-name ms-2">Airbnb</span>
          </Link>

          <div
            className="d-flex align-items-center position-relative"
            onClick={handleUserClick}
            style={{ cursor: 'pointer' }}
          >
            {isClient && userLogin?.avatar ? ( 
              <img src={userLogin.avatar} alt="avatar" style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} />
            ) : (
              <UserOutlined style={{ fontSize: 30, marginRight: 8, color: 'white', background: 'black', borderRadius: '50%' }} />
            )}
            <span className='ms-2'>{isClient ? userLogin?.name : <Spin/>}</span> 
            {showDropdown && userDropdown()}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderMenu;
