'use client';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userReducer';
import adminReducer from './reducer/adminReducer/adminReducer';
import locationReducer from './reducer/locationReducer';
import roomReducer from './reducer/adminReducer/roomreducer';

export const Store = configureStore({
    reducer: {
        userReducer,
        adminReducer,
        locationReducer,
        roomReducer,
    },
});
