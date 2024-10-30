"use client"
import { Email, http, setCookie, TOKEN, USER_ID, USER_LOGIN } from '@/app/setting/setting';
import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';

let getUserLoginDefault = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem(USER_LOGIN);
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  }
  return null; 
};
export const getUserIdFromLocalStorage = () => {
  if (typeof window !== 'undefined') { 
    const storedUser = localStorage.getItem(USER_LOGIN);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.id; // Trả về id của user
    }
  }
  return null; 
};

const initialState = {
    userLogin: getUserLoginDefault() || {},
    userRegister: {},
    userProfile: {}

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
    },
    setProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
    setAvatarAction: (state,action) => {
      state.userProfile = action.payload
    }
  }
});

export const {setUserLogicAction,setUserRegisterAction,setProfileAction,setAvatarAction} = userReducer.actions

export default userReducer.reducer

export const loginActionAsync = (userLoginModel) => {
  return async (dispatch) => {
    try {
      const res = await http.post("/api/auth/signin", userLoginModel);

      const token = res.data.content.token; 
      const userEmail = res.data.content.user.email; 
      const userLogin = JSON.stringify(res.data.content.user); 

      // Lưu vào localStorage và cookie
      localStorage.setItem(Email, userEmail);
      localStorage.setItem(TOKEN, token);
      localStorage.setItem(USER_LOGIN, userLogin);
      setCookie(USER_LOGIN, userLogin, 7);


 
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


export const setProfileActionAsync = () => {
  return async (dispatch) => {
    try {
      const userId = getUserIdFromLocalStorage(); 
      if (!userId) {
        alert("Không tìm thấy ID người dùng.");
        return;
      }
      const res = await http.get(`/api/users/${userId}`);
      dispatch(setProfileAction(res.data.content)); 
    } catch (error) {
      console.error('Lỗi khi tải thông tin người dùng:', error);
    }
  };
};

export const updateProfileActionAsync = (userProfile) => {
  return async(dispatch) => {
    try{
      const userId = getUserIdFromLocalStorage();
      const res = await http.put(`/api/users/${userId}`, userProfile);

      dispatch(setProfileAction(res.data.content));
      message.success("Cap nhat thanh cong")
    }catch(err){
      message.error("Cap nhat that bai")
      
    }
  }
}

export const uploadAvatarActionAsync = (file) => {
  return async(dispatch) =>{
    try{
      const res = await http.post("/api/users/upload-avatar", file)
    const action = setAvatarAction(res.data.content)
    dispatch(action)
    alert("Cap nhat avatar thanh cong")
    }catch(err){
      alert("Cap nhat avatar that bai")
      console.log("err", err)
    }

  }
}
