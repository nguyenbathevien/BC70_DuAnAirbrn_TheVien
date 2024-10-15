'use client';
import React from 'react';
import { Table } from 'antd';

const TitleSearch = ({ title, onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <div>
      <div className='btn btn-primary my-2'>{title}</div>
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