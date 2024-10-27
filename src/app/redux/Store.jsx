'use client'
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userReducer'
import adminReducer from './reducer/adminReducer/adminReducer'
import locationReducer from './reducer/locationReducer'
export const Store = configureStore({
    reducer: {
      userReducer,
      adminReducer,
      locationReducer                        
    },
  });