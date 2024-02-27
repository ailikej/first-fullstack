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
    setUserToken: (
      state: UserState,
      action: PayloadAction<{ token: string }>
    ) => {
      console.log("Redux is saving this user token:", action.payload.token); // Add this line
      state.token = action.payload.token;
    },
    clearUserToken: (state) => {
      state.token = null;
      console.log("Redux is removing user token, token now is:", state.token); // Add this line
    },
  },
});

// Export the actions
export const { setUserToken, clearUserToken } = userSlice.actions;

// Export the selector
export const selectUserToken = (state: RootState) => state.user.token;

// Export the reducer
export default userSlice.reducer;
