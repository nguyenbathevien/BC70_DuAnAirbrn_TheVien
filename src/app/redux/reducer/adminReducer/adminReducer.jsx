import { http, USER_LOGIN } from '@/app/setting/setting';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pageAdmin: null,
}

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    setAdminPageAction: (state, action) => {
      state.pageAdmin = action.payload;
    }
  }
});

export const { setAdminPageAction, setAdminStatus } = adminReducer.actions;

export default adminReducer.reducer;

export const pageAdminActionAsync = () => {
  return async (dispatch) => {
    try {
      const response = await http.get('/api/users');
      const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
      console.log(userLogin)
      const currentUser = response.data.content.find(user => user.email === userLogin.email);

      // Kiểm tra role
      if (currentUser && currentUser.role === 'ADMIN') {
        // Nếu là admin thì tiếp tục truy cập
        dispatch(setAdminPageAction(currentUser));
      } else {
        // Nếu không phải admin thì trả về mã lỗi 403
        alert('Bạn không có quyền truy cập vào trang này');
        throw { response: { status: 403 } };
      }
    } catch (error) {
      // Xử lý lỗi từ interceptor
      console.error('Lỗi khi kiểm tra quyền admin:', error);
    }
  };
};
