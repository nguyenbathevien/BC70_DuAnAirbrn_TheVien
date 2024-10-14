'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { registerActionAsync } from '@/app/redux/reducer/userReducer';
import * as Yup from "yup";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const frmRegister = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email không được để trống").email("Email không đúng định dạng"),
      password: Yup.string().required("Mật khẩu không được để trống"),
      confirmPassword: Yup.string()
        .required("Xác nhận mật khẩu không được để trống")
        .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp'),
      fullName: Yup.string().required("Họ tên không được để trống"),
      phone: Yup.string().required("Số điện thoại không được để trống"),
    }),
    onSubmit: async (values) => {
      console.log('Form Data:', values);
      const actionthunk = registerActionAsync(values);
      try {
        await dispatch(actionthunk);
        alert("Đăng ký thành công");
        router.push("/login");
      } catch (err) {
        
        if (err.statusCode === 400) {
          if (err.content === "Email đã tồn tại !") {
            alert(err.content); 
          } else {
            alert(err.message);
          }
        } else {
          alert(err.message || "Đã xảy ra lỗi!");
        }
      }
    },
    
    
    
  });

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
            <form onSubmit={frmRegister.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Họ tên</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  value={frmRegister.values.fullName}
                  onChange={frmRegister.handleChange}
                  onBlur={frmRegister.handleBlur}
                />
              </div>
              {frmRegister.errors.fullName && frmRegister.submitCount > 0 ? (
                <div className="form-text text-danger">
                  {frmRegister.errors.fullName}
                </div>
              ) : null}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={frmRegister.values.email}
                  onChange={frmRegister.handleChange}
                  onBlur={frmRegister.handleBlur}
                />
              </div>
              {frmRegister.errors.email && frmRegister.submitCount > 0 ? (
                <div className="form-text text-danger">
                  {frmRegister.errors.email}
                </div>
              ) : null}

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={frmRegister.values.password}
                  onChange={frmRegister.handleChange}
                  onBlur={frmRegister.handleBlur}
                />
              </div>
              {frmRegister.errors.password && frmRegister.submitCount > 0 ? (
                <div className="form-text text-danger">
                  {frmRegister.errors.password}
                </div>
              ) : null}

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  value={frmRegister.values.confirmPassword}
                  onChange={frmRegister.handleChange}
                  onBlur={frmRegister.handleBlur}
                />
              </div>
              {frmRegister.errors.confirmPassword && frmRegister.submitCount > 0 ? (
                <div className="form-text text-danger">
                  {frmRegister.errors.confirmPassword}
                </div>
              ) : null}

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Số điện thoại</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={frmRegister.values.phone}
                  onChange={frmRegister.handleChange}
                  onBlur={frmRegister.handleBlur}
                />
              </div>
              {frmRegister.errors.phone && frmRegister.submitCount > 0 ? (
                <div className="form-text text-danger">
                  {frmRegister.errors.phone}
                </div>
              ) : null}

              <div className="d-flex justify-content-between mt-4">
                <button type="submit" className="btn btn-warning btn-signup">Đăng ký</button>
                <button
                  type="button"
                  className="btn btn-danger btn-signin"
                  onClick={() => router.push('/login')}
                >
                  Đăng Nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
