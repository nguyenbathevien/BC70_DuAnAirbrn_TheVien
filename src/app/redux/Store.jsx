'use client'
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userreducer'
import adminReducer from './reducer/adminReducer/adminreducer'
import roomReducer from './reducer/adminReducer/roomreducer'
export const Store = configureStore({
    reducer: {
      userReducer,
      adminReducer,
      roomReducer,
    },
  });