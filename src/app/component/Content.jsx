"use client";
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocationsByPageAsync } from '../redux/reducer/locationReducer';
import Category from './HomePage/Category';
const Content = () => {
    const dispatch = useDispatch();

    const { locations, loading, error } = useSelector((state) => state.locationReducer);

    useEffect(() => {
        dispatch(fetchLocationsByPageAsync());
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const drivingTimes = [
        '15 phút đi xe',
        '3 giờ đi xe',
        '6.5 giờ đi xe',
        '15 phút đi xe',
        '7.5 giờ đi xe',
        '45 phút đi xe',
        '30 phút đi xe',
        '5 giờ đi xe'
    ];

    return (
        <div className="content-container mt-2">
            <Category/>
            <div className="featured-locations mt-2">
                <h4>Địa điểm nổi bật</h4>
                <div className="row text-center">
                    {locations.slice(0, 8).map((location, index) => (
                        <div className="col-md-3" key={location.id}>
                            <div className="location-card">
                                <Image
                                    src={location.hinhAnh}
                                    alt={location.tenViTri}
                                    className="img-fluid"
                                    width={200}
                                    height={150}
                                    style={{ objectFit: 'cover' }}
                                />
                                <p>{location.tenViTri}</p>
                                <small>{location.tinhThanh}</small>
                                <small>{drivingTimes[index]}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h4>Ở bất cứ đâu</h4>
            <div className="row text-center map-location">
                <div className="col-md-3">
                    <div className="accommodation-card">
                        <Image src="/assets/img/content3.jpg" alt="Toàn bộ nhà" className="img-fluid" width={300} height={200} style={{ objectFit: 'cover' }} />
                        <p>Toàn bộ nhà</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="accommodation-card">
                        <Image src="/assets/img/content2.jpg" alt="Chỗ ở độc đáo" className="img-fluid" width={300} height={200} style={{ objectFit: 'cover' }} />
                        <p>Chỗ ở độc đáo</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="accommodation-card">
                        <Image src="/assets/img/content1.jpg" alt="Trang trại và thiên nhiên" className="img-fluid" width={300} height={200} style={{ objectFit: 'cover' }} />
                        <p>Trang trại và thiên nhiên</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="accommodation-card">
                        <Image src="/assets/img/content.jpg" alt="Cho phép mang theo thú cưng" className="img-fluid" width={300} height={200} style={{ objectFit: 'cover' }} />
                        <p>Cho phép mang theo thú cưng</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
