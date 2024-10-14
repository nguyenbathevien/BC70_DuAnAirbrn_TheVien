'use client'
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userReducer'
export const Store = configureStore({
    reducer: {
      userReducer,
    },
  });