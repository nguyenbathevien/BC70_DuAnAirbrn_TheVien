"use client"
import { Email, http, setCookie, TOKEN, USER_LOGIN } from '@/app/setting/setting';
import { createSlice } from '@reduxjs/toolkit'

let getUserLoginDefault = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem(USER_LOGIN);
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  }
  return null; 
};


const initialState = {
    userLogin: getUserLoginDefault() || {},
    userRegister: {}

}

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserLogicAction: (state, action) => {
        state.userLogin = action.payload;
      },
    setUserRegisterAction: (state, action) => {
        state.userRegister = action.payload
    }
  }
});

export const {setUserLogicAction,setUserRegisterAction} = userReducer.actions

export default userReducer.reducer

export const loginActionAsync = (userLoginModel) => {
  return async (dispatch) => {
    try {
      const res = await http.post("/api/auth/signin", userLoginModel);
      const token = res.data.content.accessToken;
      const userLogin = JSON.stringify(res.data.content);
      const userEmail = res.data.content.email;
      
      localStorage.setItem(Email, userEmail);
      localStorage.setItem(TOKEN, token);
      localStorage.setItem(USER_LOGIN, userLogin);
      setCookie(TOKEN, token, 7);
      
      const action = setUserLogicAction(res.data.content);
      dispatch(action);

    } catch (error) {
     
      if (error.response && error.response.data) {
        console.log('API Error Response:', error.response.data);
        throw error.response.data; 
      } else {
        console.log('Error:', error.message);
        throw new Error('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    }
  };
};

export const registerActionAsync = (userRegisterModel) => {
  return async (dispatch) => {
    try {
      const res = await http.post("/api/auth/signup", userRegisterModel);
      const action = setUserRegisterAction(res.data.content);
      dispatch(action);
      return res.data; 
    } catch (error) {
      if (error.response && error.response.data) {
        console.log('API Error Response:', error.response.data);
        throw error.response.data;  
      } else {
        console.log('Error:', error.message);
        throw new Error('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    }
  }
};


