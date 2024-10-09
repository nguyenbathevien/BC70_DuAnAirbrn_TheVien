'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 

const Register = () => {
  const router = useRouter(); 

  return (
    <div className="background">
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
            <Image 
              src="/assets/img/airbnb.svg" 
              alt="Airbnb logo" 
              className="img-fluid" 
              width={300} 
              height={300} 
            />
          </div>
          <div className="col-12 col-md-6 bg-dark text-white p-5 rounded shadow">
            <h3 className="mb-4">Đăng Ký</h3>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Tài khoản</label>
              <input type="text" id="username" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <input type="password" id="password" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Nhập lại Mật khẩu</label>
              <input type="password" id="confirmPassword" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Họ tên</label>
              <input type="text" id="fullName" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Số điện thoại</label>
              <input type="tel" id="phone" className="form-control" />
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button 
                className="btn btn-danger btn-signup" 
                onClick={() => router.push('/login')}
              >
                Đăng Nhập
              </button>
              <button className="btn btn-warning btn-signin">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
