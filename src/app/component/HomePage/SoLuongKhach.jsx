import React, { useState } from 'react';

const SoLuongKhach = ({ initialCount = 1, onCountChange }) => {
    const [showDropdownKhach, setShowDropdownKhach] = useState(false);
    const [soLuong, setSoLuong] = useState(initialCount);

    const toggleDropdown = () => {
        setShowDropdownKhach(prev => !prev);
    };

    const increaseCount = () => {
        setSoLuong(prev => {
            const newCount = prev + 1;
            onCountChange(newCount);
            return newCount;
        });
    };

    const decreaseCount = () => {
        setSoLuong(prev => {
            const newCount = prev > 1 ? prev - 1 : 1;
            onCountChange(newCount);
            return newCount;
        });
    };

    return (
        <div className="position-relative">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Khách"
                onClick={toggleDropdown} 
                readOnly 
            />
            {showDropdownKhach && (
                <div className="so-luong-khach-dropdown border p-3 mt-3 position-absolute bg-white shadow-lg" style={{ zIndex: 1000 }}>
                    <h4>Chọn số lượng khách</h4>
                    <div className="d-flex justify-content-between align-items-center">
                        <button onClick={decreaseCount} className="btn btn-secondary">-</button>
                        <span>{soLuong}</span>
                        <button onClick={increaseCount} className="btn btn-secondary">+</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SoLuongKhach;
