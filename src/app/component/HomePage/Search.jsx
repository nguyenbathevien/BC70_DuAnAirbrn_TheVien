"use client";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DateRangePicker from './DateRangePicker';
import SoLuongKhach from './SoLuongKhach';
import { LocationsActionAsync } from '../../redux/reducer/locationReducer';
import { useRouter } from 'next/navigation';



const Search = () => {
  const router = useRouter() 
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const { locations, loading, error } = useSelector((state) => state.locationReducer);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState({});
  const [guestCount, setGuestCount] = useState(1);
  const [idLocation,setIdLocation] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LocationsActionAsync());
  }, [dispatch]);

  const handleLocationClick = () => {
    setShowLocationDropdown((prev) => !prev);
  };

  const handleGuestCountChange = (count) => {
    setGuestCount(count);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.tinhThanh)
    setIdLocation(location.id)
    setShowLocationDropdown(false);
  };

  const handleDateChange = (dateStrings) => {
    setSelectedDate(dateStrings)
  };

  const handleFindRooms = () => {
    if(idLocation){
    const dateQuery = encodeURIComponent(JSON.stringify(selectedDate));
    const URL = `/rooms/${idLocation}?location=${selectedLocation}&date=${dateQuery}`;
    router.push(URL);
    }else{
      router.push("/rooms")
    }
    
};

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
            <div className="col-md-3 d-flex">
              <SoLuongKhach
                initialCount={guestCount}
                onCountChange={handleGuestCountChange}
              />
            </div>
            <div className="col-md-1">
                <button className="btn btn-danger rounded-pill" onClick={handleFindRooms}>
                  <i className="fas fa-search" />
                </button>
            </div>
          </div>
        </div>
      </div>

      
  )
}

export default Search