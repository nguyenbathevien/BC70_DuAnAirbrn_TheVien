import React from 'react';
import Link from 'next/link';

const FooterComponent = () => {
  return (
    <div className="footer-container">
      <footer className="bg-light pt-2">
        <div className=" background-footer px-5 pt-5">
          <div className="row">
            <div className="col-12 col-md-3 mb-3">
              <h6 className="fw-bold">GIỚI THIỆU</h6>
              <ul className="list-unstyled">
                <li><Link href="#">Phương thức hoạt động của Airbnb</Link></li>
                <li><Link href="#">Trang tin tức</Link></li>
                <li><Link href="#">Nhà đầu tư</Link></li>
                <li><Link href="#">Airbnb Plus</Link></li>
                <li><Link href="#">Airbnb Luxe</Link></li>
                <li><Link href="#">HotelTonight</Link></li>
                <li><Link href="#">Airbnb for Work</Link></li>
                <li><Link href="#">Nhờ có Host, mọi điều đều có thể</Link></li>
                <li><Link href="#">Cơ hội nghề nghiệp</Link></li>
              </ul>
            </div>
            <div className="col-12 col-md-3 mb-3">
              <h6 className="fw-bold">CỘNG ĐỒNG</h6>
              <ul className="list-unstyled">
                <li><Link href="#">Sự đa dạng và Cảm giác thân thuộc</Link></li>
                <li><Link href="#">Tiện nghi phù hợp cho người khuyết tật</Link></li>
                <li><Link href="#">Đối tác liên kết Airbnb</Link></li>
                <li><Link href="#">Chỗ ở cho tuyến đầu</Link></li>
                <li><Link href="#">Lượt giới thiệu của khách</Link></li>
                <li><Link href="#">Airbnb.org</Link></li>
              </ul>
            </div>
            <div className="col-12 col-md-3 mb-3">
              <h6 className="fw-bold">ĐÓN TIẾP KHÁCH</h6>
              <ul className="list-unstyled">
                <li><Link href="#">Cho thuê nhà</Link></li>
                <li><Link href="#">Tổ chức Trải nghiệm trực tuyến</Link></li>
                <li><Link href="#">Tổ chức Trải nghiệm</Link></li>
                <li><Link href="#">Đón tiếp khách có trách nhiệm</Link></li>
                <li><Link href="#">Trung tâm tài nguyên</Link></li>
                <li><Link href="#">Trung tâm cộng đồng</Link></li>
              </ul>
            </div>
            <div className="col-12 col-md-3 mb-3">
              <h6 className="fw-bold">HỖ TRỢ</h6>
              <ul className="list-unstyled">
                <li><Link href="#">Biện pháp ứng phó đại dịch COVID-19</Link></li>
                <li><Link href="#">Trung tâm trợ giúp</Link></li>
                <li><Link href="#">Các tùy chọn hủy</Link></li>
                <li><Link href="#">Hỗ trợ khu dân cư</Link></li>
                <li><Link href="#">Tin cậy và an toàn</Link></li>
              </ul>
            </div>
          </div>

          
        </div>
        <div className="row mt-3 pb-3 px-5 align-items-center ">
            <div className="col-12 d-flex justify-content-between">
              <p className="mb-0">© 2022 Airbnb, Inc. Quyền riêng tư . Điều khoản . Sơ đồ trang web</p>

              <div className="d-flex">
                <div className="me-3">
                  <Link href="#" className="text-dark">
                    <i className="bi bi-globe"></i> Tiếng Việt (VN)
                  </Link>
                </div>
                <div className="me-3">
                  <Link href="#" className="text-dark">
                    USD
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-dark">
                    Hỗ trợ tài nguyên
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </footer>
    </div>
  );
};

export default FooterComponent;
