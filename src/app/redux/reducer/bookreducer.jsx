import { http } from '@/app/setting/setting';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    apiUserBook: [{}]
}

const bookreducer = createSlice({
  name: "bookreducer",
  initialState,
  reducers: {
    setDatPhongAction: (state,action) => {
        state.apiUserBook = action.payload
    },
    setRoomForUserAction: (state,action) => {
        state.apiUserBook = action.payload
    }
  }
});

export const {setDatPhongAction, setRoomForUserAction} = bookreducer.actions

export default bookreducer.reducer

export const datPhongActionAsync = (id = 0, maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung) => {
    return async (dispatch) => {
        try {
            const payload = {
                id,
                maPhong,
                ngayDen,
                ngayDi,
                soLuongKhach,
                maNguoiDung
            };
            const res = await http.post("/api/dat-phong", payload);
            const action = setDatPhongAction(res.data.content);
            dispatch(action);
        } catch (err) {
            console.log("Du lieu ", maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung)
            console.error("Lỗi đặt phòng:", err);
        }
    };
};

export const getApiRoomForUserActionAsync = (id) => {
    return async(dispatch) => {
        const res = await http.get(`/api/dat-phong/lay-theo-nguoi-dung/${id}`)
        const action = setDatPhongAction(res.data.content)
        dispatch(action)
    }
}