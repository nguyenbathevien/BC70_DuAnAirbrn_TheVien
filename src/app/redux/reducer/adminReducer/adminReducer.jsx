import { http, USER_LOGIN } from '@/app/setting/setting';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pageAdmin: null,
  userApi: [{}]
}

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    setAdminPageAction: (state, action) => {
      state.pageAdmin = action.payload;
    },
    setApiUserAction: (state,action) => {
      state.userApi = action.payload
    }
  }
});

export const { setAdminPageAction, setApiUserAction } = adminReducer.actions;

export default adminReducer.reducer;

export const pageAdminActionAsync = () => {
  return async (dispatch) => {
    try {
      const response = await http.get('/api/users');
      const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
     
      const currentUser = response.data.content.find(user => user.email === userLogin.email);
      if (currentUser && currentUser.role === 'ADMIN') {
        dispatch(setAdminPageAction(currentUser));
      } else {
        alert('Bạn không có quyền truy cập vào trang này');
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra quyền admin:', error);
    }
  };
};

export  const getApiUserActionAsync = () => {
  return async (dispatch) => {
    const res = await http.get("/api/users")
    const action =  setApiUserAction(res.data.content)
    dispatch(action)
    console.log(action)
  }
}

