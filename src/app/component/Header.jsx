import React from 'react';
import Image from 'next/image';
const Header = () => {
    return (
        <div className="header-container">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <Image src="/assets/img/airbnb.svg" alt="Logo" width={30} height={30} />

                        <span className="site-name">Airbnb</span>
                    </a>
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
                                <a className="nav-link" href="#">Nơi ở</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Trải nghiệm</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Trải nghiệm trực tuyến</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <a href="#" className="nav-link me-2 p-2 globe-link">
                                <i className="fas fa-globe" />
                            </a>
                            <a href="#" className="nav-link me-2 p-2 host-link">Đón tiếp khách</a>
                            <a href="#" className="nav-link me-2 p-2 user-link">
                                <i className="fas fa-user-circle" />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="search container fixed">
                <div className="bg-white p-3 shadow-lg">
                    <div className="row">
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Địa điểm" />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Nhận phòng" />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="Khách" />
                        </div>
                        <div className="col-md-3 text-center">
                            <button className="btn btn-danger">
                                <i className="fas fa-search" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="carousel-container">
                <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <Image src="/assets/img/airbnb.webp" alt="Airbnb" width={1200} height={500} layout="responsive" className="hero-image" />
                        </div>
                        <div className="carousel-item">
                            <Image src="/assets/img/airbnb.webp" alt="Another Airbnb" width={1200} height={500} layout="responsive" className="hero-image" />
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

                <div className="hero-text">
                    <p>Khám phá những không gian độc đáo!</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
