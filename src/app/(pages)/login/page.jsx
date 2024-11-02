  'use client'
  import React from 'react';
  import Image from 'next/image';
  import { useRouter } from 'next/navigation';
  import { useFormik } from 'formik';
  import { loginActionAsync } from '@/app/redux/reducer/userReducer';
  import { useDispatch } from 'react-redux';
  import * as Yup from "yup";
  const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const frmLogin = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Email không được để trống").email("Email không đúng định dạng"),
        password: Yup.string().required("Email không được để trống"),
      }),
      onSubmit: async (values) => {
        try {
          const actionthunk = loginActionAsync(values);
          await dispatch(actionthunk);
          alert("Đăng nhập thành công");
          router.push("/");
        } catch (err) {
          if (err.statusCode === 400) {
            alert(err.content);
          } else {
            alert(err.message || "Đã xảy ra lỗi!");
          }
        }
      },
      
      
    });

    return (
      <div className="background">
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 text-center mb-4">
              <Image
                src="/assets/img/airbnb.svg"
                alt="Airbnb logo"
                className="img-fluid"
                width={300}
                height={300}
                
              />
            </div>
            <div className="col-12 col-md-6 bg-dark text-white p-4 rounded shadow">
              <h3 className="mb-4 text-center">Đăng Nhập</h3>
              <form onSubmit={frmLogin.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Tài khoản</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    value={frmLogin.values.email}
                    onChange={frmLogin.handleChange}
                    onBlur={frmLogin.handleBlur}
                  />
                </div>
                {frmLogin.errors.email && frmLogin.submitCount > 0 ? (
                  <div className="form-text text-danger">
                    {frmLogin.errors.email}
                  </div>
                ) : null}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={frmLogin.values.password}
                    onChange={frmLogin.handleChange}
                    onBlur={frmLogin.handleBlur}
                  />
                </div>
                {frmLogin.errors.password && frmLogin.submitCount > 0 ? (
                  <div className="form-text text-danger">
                    {frmLogin.errors.password}
                  </div>
                ) : null}
                <div className="d-flex justify-content-between mt-4">
                  <button type="submit" className="btn btn-danger btn-signup">Đăng Nhập</button>
                  <button
                    type="button"
                    className="btn btn-warning btn-signin"
                    onClick={() => router.push('/register')}
                  >
                    Đăng ký
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Login;
