"use client";
import React, { useState } from "react";
import HeaderMenu from "./HomePage/HeaderMenu";
import Search from "./HomePage/Search";
import Carousel from "./HomePage/Carousel";

const HomePage = () => {


  return (
    <div className="header-container">
      <HeaderMenu/>
      <Search />
      <Carousel/>
    </div>
  );
};

export default HomePage;
