import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const HeaderMenu = () => {

    const [showDropdown, setShowDropdown] = useState(false);

  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };

  const userDropdown = (
    <ul className="dropdown-menu show">
      <li className="dropdown-item">
        <Link href="/register" className="text-decoration-none text-dark">Đăng ký</Link>
      </li>
      <li className="dropdown-item">
        <Link href="/login" className="text-decoration-none text-dark">Đăng nhập</Link>
      </li>
    </ul>
  );

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container d-flex justify-content-between">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <Image src="/assets/img/airbnb.svg" alt="Logo" width={30} height={30} />
            <span className="site-name ms-2">Airbnb</span>
          </Link>

          <div className="d-flex align-items-center">
            <Link href="#" className="nav-link me-2 user-link" onClick={handleUserClick}>
              <i className="fas fa-user-circle user-icon" />
              {showDropdown && userDropdown}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderMenu