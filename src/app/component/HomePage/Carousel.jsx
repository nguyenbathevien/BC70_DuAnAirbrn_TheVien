import React from "react";
import Image from "next/image";

const Carousel = () => (
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
);

export default Carousel;
