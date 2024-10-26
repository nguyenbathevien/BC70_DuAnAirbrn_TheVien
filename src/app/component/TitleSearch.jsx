'use client';
import React from 'react';

const TitleSearch = ({ title, onSearch,onClick }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <div>
      <button className='btn my-2' style={{background: '#FE6B6E', color:'#fff'}} onClick={onClick}>{title}</button>
      <div className="row mb-3">
        <div className="col-12 col-md-9 mb-2 w-50 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo tên..."
            onChange={handleInputChange} 
          />
        </div>
        
      </div>
    </div>
  );
};

export default TitleSearch;