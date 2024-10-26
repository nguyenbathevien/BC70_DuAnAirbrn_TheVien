'use client';
import React, { useEffect, useState } from 'react';
import { CaretDownOutlined, MenuOutlined, UserOutlined, HomeOutlined, ApartmentOutlined, FileDoneOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { pageAdminActionAsync } from '@/app/redux/reducer/adminReducer/adminreducer';
import { useRouter } from 'next/navigation';
import { deleteCookie, Email, TOKEN, USER_LOGIN } from '@/app/setting/setting';

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.adminReducer.isAdmin);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeMenu, setActiveMenu] = useState('/admin/users');

  const getPageAdmin = () => {
    const action = pageAdminActionAsync(router);
    dispatch(action);
  };

  useEffect(() => {
    getPageAdmin();
  }, []);

  const handleMenuClick = (key) => {
    if (key === '3') {
      router.push('/');
    } else if (key === '2') {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(Email);
      localStorage.removeItem(USER_LOGIN);
      deleteCookie(USER_LOGIN);
      router.push('/login');
    } else {
      setActiveMenu(key);
    }
  };

  const menuItems = [
    {
      key: '/admin/users',
      label: 'Quản lý người dùng',
      icon: <UserOutlined />,
    },
    {
      key: '/admin/rooms',
      label: 'Quản lý thông tin phòng',
      icon: <FileDoneOutlined />,
    },
    {
      key: '/admin/locations',
      label: 'Quản lý thông tin vị trí',
      icon: <ApartmentOutlined />,
    },
    {
      key: '/admin/bookings',
      label: 'Quản lý đặt phòng',
      icon: <HomeOutlined />,
    },
  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <nav
        className={`d-flex flex-column bg-dark text-white position-fixed`}
        style={{ width: sidebarVisible ? '250px' : '0', height: '100vh', overflow: 'hidden', transition: 'width 0.3s ease' }}
      >
        <h2 className="text-center py-4" style={{ display: sidebarVisible ? 'block' : 'none' }}>Dashboard</h2>
        <ul className="nav flex-column" style={{ display: sidebarVisible ? 'block' : 'none' }}>
          {menuItems.map(item => (
            <li key={item.key} className={`nav-item ${activeMenu === item.key ? 'bg-secondary' : ''}`} onClick={() => handleMenuClick(item.key)}>
              <Link href={item.key} className={`nav-link text-white d-flex align-items-center`}>
                {item.icon}
                <span className="ms-2">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`flex-grow-1 d-flex flex-column`} style={{ marginLeft: sidebarVisible ? '250px' : '0', transition: 'margin-left 0.3s ease', minHeight: '100vh' }}>
        <header className="d-flex justify-content-between bg-dark align-items-center pe-3 position-fixed"
          style={{ top: 0, left: sidebarVisible ? '250px' : '0', right: 0, zIndex: 1000, height: '56px', transition: 'left 0.3s ease' }}>
          <div className="d-flex align-items-center" style={{ height: '56px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setSidebarVisible(!sidebarVisible)}>
              <MenuOutlined className="text-white p-3" style={{ fontSize: '1.5rem', background: '#FE6B6E', height: '56px' }} />
            </span>
          </div>
          <div className="d-flex align-items-center text-white">
            <img src="https://i.pravatar.cc/?u=1" width='50px' alt="User Avatar" className="rounded-circle me-2" />
            <span className="me-2">admin</span>
            <Dropdown
              menu={{
                items: [
                  { key: '1', label: 'Cập nhật thông tin' },
                  { key: '2', label: 'Đăng xuất' },
                  { key: '3', label: 'Trang chủ' },
                ].map(item => ({
                  ...item,
                  onClick: () => handleMenuClick(item.key)
                }))
              }}
              trigger={['click']}
            >
              <a onClick={(e) => e.preventDefault()}>
                <CaretDownOutlined />
              </a>
            </Dropdown>
          </div>
        </header>

        <div className="flex-grow-1  mt-3 px-3 overflow-auto" style={{ paddingTop: '56px', minHeight: '100vh' }}>
          {isAdmin ? children : ''}
        </div>
      </div>
    </div>
  );
};

export default Layout;
