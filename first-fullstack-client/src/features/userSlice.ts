import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface UserState {
  token: string | null;
}

// Define the initial state using the `UserState` type
const initialState: UserState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: UserState, action: PayloadAction<{ token: string }>) => {
      console.log("Logging in with token:", action.payload.token); // Add this line

      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

// Export the actions
export const { login, logout } = userSlice.actions;

// Export the selector
export const selectUserToken = (state: RootState) => state.user.token;

// Export the reducer
export default userSlice.reducer;
