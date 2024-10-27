"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { LocationsActionAsync } from "../redux/reducer/locationReducer";
import Link from "next/link";
import DateRangePicker from "./HomePage/DateRangePicker";
import SoLuongKhach from "./HomePage/SoLuongKhach";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const { locations, loading, error } = useSelector((state) => state.locationReducer);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [guestCount, setGuestCount] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LocationsActionAsync());
  }, [dispatch]);

  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
    setShowLocationDropdown(false);
  };

  const handleLocationClick = () => {
    setShowLocationDropdown((prev) => !prev);
    setShowDropdown(false);
  };

  const handleGuestCountChange = (count) => {
    setGuestCount(count);
  };

  const handleLocationSelect = (location) => {
    console.log("location:", location);
    setSelectedLocation(location.tinhThanh)
    setShowLocationDropdown(false);
  };

  const handleDateChange = (dateStrings) => {
    console.log("Selected Dates: ", dateStrings);
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


  const locationDropdown = (
    <div
      className="dropdown-menu show"
      style={{ left: "50%", transform: "translateX(-100%)", top: "100%" }}
    >
      <h1 className="font-bold text-md mb-6">Tìm kiếm địa điểm</h1>
      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: "red" }}>Lỗi khi tải dữ liệu</p>}
      <div className="grid grid-cols-3 gap-4">
        {locations.slice(0, 9).map((location) => (
          <div
            key={location.id}
            className="text-center cursor-pointer"
            onClick={() => handleLocationSelect(location)}
          >
            <div>
              <img
                className="w-20 h-20 object-cover rounded-lg border-2 hover:border-gray-600 duration-300"
                src={location.hinhAnh}
                alt={location.tenViTri}
              />
            </div>
            <p className="h-12">{location.tinhThanh}</p>
          </div>
        ))}
      </div>
    </div>
  );



  return (
    <div className="header-container">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link href="/" className="navbar-brand">
            <Image src="/assets/img/airbnb.svg" alt="Logo" width={30} height={30} />
            <span className="site-name">Airbnb</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active">
                <Link href="/" className="nav-link">Nơi ở</Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link">Trải nghiệm</Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link">Trải nghiệm trực tuyến</Link>
              </li>
            </ul>
            <div className="d-flex justify-content-center">
              <Link href="#" className="nav-link me-2 p-2 globe-link">
                <i className="fas fa-globe" />
              </Link>
              <Link href="#" className="nav-link me-2 p-2 host-link">Đón tiếp khách</Link>
              <Link href="#" className="nav-link me-2 p-2 user-link" onClick={handleUserClick}>
                <i className="fas fa-user-circle user-icon" />
                {showDropdown && userDropdown}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="search container">
        <div className="bg-white p-3 shadow-lg">
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="form-control"
                placeholder="Bạn muốn đi đâu?"
                onClick={handleLocationClick}
              />
              {showLocationDropdown && locationDropdown}
            </div>
            <div className="col-md-4">
              <DateRangePicker onDateChange={handleDateChange} />
            </div>
            <div className="col-md-4 d-flex">
              <SoLuongKhach
                initialCount={guestCount}
                onCountChange={handleGuestCountChange}
              />
              <div className="col-md-1">
                <button className="btn btn-danger rounded-pill">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="carousel-container">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Image src="/assets/img/airbnb.webp" alt="Airbnb" width={1000} height={400} className="hero-image" priority />
            </div>
            <div className="carousel-item">
              <Image src="/assets/img/airbnb2.jpeg" alt="Another Airbnb" width={1000} height={300} className="hero-image" priority />
            </div>
            <div className="carousel-item">
              <Image src="/assets/img/airbnb0.avif" alt="Another Airbnb" width={1000} height={300} className="hero-image" priority />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
