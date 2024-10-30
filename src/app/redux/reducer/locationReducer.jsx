import { http } from '@/app/setting/setting';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locations: [],
  loading: false,
  error: null,
};

const locationReducer = createSlice({
  name: 'locationReducer',
  initialState,
  reducers: {
    setLocationsAction: (state, action) => {
      state.locations = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoadingAction: (state) => {
      state.loading = true;
      state.error = null;
    },
    setErrorAction: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { setLocationsAction, setLoadingAction, setErrorAction } = locationReducer.actions;
export default locationReducer.reducer;

export const LocationsActionAsync = () => {
  return async (dispatch) => {
    dispatch(setLoadingAction()); 
    try {
      const res = await http.get('/api/vi-tri');
      if (res.data.content) {
        dispatch(setLocationsAction(res.data.content));
      } else {
        dispatch(setErrorAction('No content found in the response'));
      }
    } catch (error) {
      dispatch(setErrorAction('Error fetching locations: ' + error.message));
    }
  };
};

export const fetchLocationsByPageAsync = () => {
  return async (dispatch) => {
    dispatch(setLoadingAction());
    try {
      const res = await http.get('/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8'); 
      if (res.data.content.data) {
        dispatch(setLocationsAction(res.data.content.data));
      } else {
        dispatch(setErrorAction('No content found in the response'));
      }
    } catch (error) {
      dispatch(setErrorAction('Error fetching locations: ' + error.message));
    }
  };
};

