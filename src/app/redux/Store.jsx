'use client'
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userReducer'
import adminReducer from './reducer/adminReducer/adminReducer'
export const Store = configureStore({
    reducer: {
      userReducer,
      adminReducer,
    },
  });