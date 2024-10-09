'use client';
import React from 'react'
import { CaretDownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Dropdown, Menu } from 'antd';

const layout = ({ children }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">Cập nhật thông tin</Menu.Item>
      <Menu.Item key="2">Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <nav className="d-flex flex-column bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
        <h2 className="text-center py-4">Dashboard</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link href="/admin/users" className="nav-link text-white">Quản lý người dùng</Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/rooms" className="nav-link text-white">Quản lý thông tin phòng</Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/locations" className="nav-link text-white">Quản lý thông tin vị trí</Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/bookings" className="nav-link text-white">Quản lý đặt phòng</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column" style={{ minHeight: '100vh' }}>
        <header className="d-flex justify-content-between bg-danger align-items-center">
          <div></div>
          <div className="d-flex align-items-center p-3 text-white">
            <span className="me-2">admin</span>
            <img src="https://i.pravatar.cc/?u=1" width='50px' alt="User Avatar" className="rounded-circle me-2" />
            <Dropdown menu={menu} trigger={['click']}>
  <a onClick={(e) => e.preventDefault()}>
    <CaretDownOutlined />
  </a>
</Dropdown>

          </div>
        </header>

        {/* Content */}
        <div className="flex-grow-1 mt-3 px-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;
