import React from 'react';
import Image from 'next/image';

const Login = () => {
  return (
    <div className="background">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-6 text-center">
            <Image 
              src="/assets/img/airbnb.svg" 
              alt="Airbnb logo" 
              width={500} 
              height={300} 
            />
          </div>
          <div className="col-6 bg-dark text-white p-4 rounded shadow">
            <h3 className="mb-4">Đăng Nhập</h3>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Tài khoản</label>
              <input type="text" id="username" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <input type="password" id="password" className="form-control" />
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-danger btn-signin">Đăng Nhập</button>
              <button className="btn btn-warning btn-signup">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
