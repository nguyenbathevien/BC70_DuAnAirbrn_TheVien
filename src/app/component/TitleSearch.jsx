'use client';
import React from 'react';

const TitleSearch = ({ title, onSearch,onClick }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <div>
      <button className='btn btn-primary my-2' onClick={onClick}>{title}</button>
      <div className="row mb-3">
        <div className="col-12 col-md-9 mb-2 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm..."
            onChange={handleInputChange} 
          />
        </div>
        
      </div>
    </div>
  );
};

export default TitleSearch;