import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import Image from 'next/image';
import React from 'react'

const Category = () => {

    const items = [
        { icon: "/assets/img/icon/icon2.png", name: "Biểu tượng" },
        { icon: "/assets/img/icon/icon1.jpg", name: "Hỗ trợ người dùng xe lăn" },
        { icon: "/assets/img/icon/icon3.jpg", name: "Thành phố hàng đầu" },
        { icon: "/assets/img/icon/icon6.jpg", name: "Nhà nông trại" },
        { icon: "/assets/img/icon/icon4.jpg", name: "Nhiệt đới" },
        { icon: "/assets/img/icon/icon5.jpg", name: "Vui chơi" },
        { icon: "/assets/img/icon/icon7.jpg", name: "Container" },
        { icon: "/assets/img/icon/icon8.jpg", name: "Lâu đài" },
        { icon: "/assets/img/icon/icon9.jpg", name: "Nhà khung chữ A" },
        { icon: "/assets/img/icon/icon10.jpg", name: "Khung cảnh tuyệt vời" },
        { icon: "/assets/img/icon/icon11.jpg", name: "Hồ bơi tuyệt vời" },
        { icon: "/assets/img/icon/icon12.jpg", name: "Nhà trên cây" },
        { icon: "/assets/img/icon/icon13.jpg", name: "Cối xay gió" },
        { icon: "/assets/img/icon/icon14.jpg", name: "Phục vụ bữa sáng" },
        { icon: "/assets/img/icon/icon15.jpg", name: "Nông thôn" },
        { icon: "/assets/img/icon/icon16.jpg", name: "Chơi golf" },
        { icon: "/assets/img/icon/icon17.jpg", name: "Riad" },
        { icon: "/assets/img/icon/icon18.jpg", name: "Không gian sáng tạo" },
        { icon: "/assets/img/icon/icon19.jpg", name: "Bắc cực" },
        { icon: "/assets/img/icon/icon20.jpg", name: "Đảo" },




    ];
    return (
        <div className="content-container mt-2">
            <div className="mt-4">
                <Carousel
                    dots={true}
                    autoplay={true}
                    autoplaySpeed={3000}
                    slidesToShow={12}
                    slidesToScroll={1}
                >
                    {items.map((item, index) => (
                        <div key={index} className="text-center icon-container">
                            <div className="icon-frame">
                                <Image src={item.icon} alt={item.name} className="icon" width={50} height={50} style={{ objectFit: 'cover' }} />
                            </div>
                            <p className="icon-text">{item.name}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default Category