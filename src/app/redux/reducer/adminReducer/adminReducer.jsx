import { http, USER_LOGIN } from '@/app/setting/setting';
import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd';

const initialState = {
  pageAdmin: null,
  userApi: [{}],
  userUpdate: {},
  isAdmin: false,
}

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    setApiUserAction: (state,action) => {
      state.userApi = action.payload
    },
    setUserAddAction: (state,action) => {
      state.userApi.push(action.payload)
    }
    ,
    setUserUpdateAction: (state,action) => {
      state.userUpdate = action.payload
    },
    setUserDeleteAction: (state,action) => {
      state.userApi = action.payload
    },
    setAdminPageAction: (state, action) => {
      state.pageAdmin = action.payload;
      state.isAdmin = action.payload.role === 'ADMIN'; 
    },
  }
});

export const { setAdminPageAction, setApiUserAction,setUserAddAction,setUserUpdateAction,setUserDeleteAction } = adminReducer.actions;

export default adminReducer.reducer;

export const pageAdminActionAsync = (router) => {
  return async (dispatch) => {
    try {
      const response = await http.get('/api/users');
      const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
     
      const currentUser = response.data.content.find(user => user.email === userLogin.email);
      if (currentUser && currentUser.role === 'ADMIN') {
        dispatch(setAdminPageAction(currentUser));
      } else {
        alert('Bạn không có quyền truy cập vào trang này');
        router.push('/login');
      }
    } catch (error) {
      alert('Lỗi khi kiểm tra quyền admin:' + error);
    }
  };
};

export  const getApiUserActionAsync = () => {
  return async (dispatch) => {
    const res = await http.get("/api/users")
    const action =  setApiUserAction(res.data.content)
    dispatch(action)
  }
}
export const addUserActionAsync = (userForm) => {
  return async(dispatch) => {
    try{
      const res = await http.post("/api/users", userForm);
      const action = setUserAddAction(res.data.content);
      dispatch(action);
      message.success("Thêm Thành công!");
    }catch(err){
      message.warning("Lỗi: " + err.response.data.content); 
    }
  }
}


export const updateUserActionAsync = (userId, userForm) => {
  return async (dispatch) => {
    try {
      const response = await http.get(`/api/users/${userId}`);
      const existingUser = response.data.content;

      const updatedUser = {
        ...existingUser, 
        ...userForm,     
      };

      const res = await http.put(`/api/users/${userId}`, updatedUser);
      const action = setUserUpdateAction(res.data.content);
      dispatch(action);
      message.success("Cập nhật Thành công!");
    } catch (error) {
      message.error("Cập nhật thất bại!");
    }
  };
};


export const deleteUserActionAsync = (userId) => {
  return async (dispatch, getState) => {
    try {
      const res = await http.delete(`/api/users?id=${userId}`);
      const currentUsers = getState().adminReducer.userApi;
      const updatedUsers = currentUsers.filter(user => user.id !== userId); 
      const action = setUserDeleteAction(updatedUsers);
      dispatch(action);
      
      message.success("Xóa Thành công!");
    } catch (error) {
      message.error("Xóa thất bại!");
    }
  };
};




