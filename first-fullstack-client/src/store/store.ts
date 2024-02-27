import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Type for the state of the whole Redux store
export type RootState = ReturnType<typeof store.getState>;

// Type for Redux dispatch function
export type AppDispatch = typeof store.dispatch;
