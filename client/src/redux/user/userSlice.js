import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteUser: (state) => {
      state.currentUser = null;
    },
    signOutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInUser, updateUser, deleteUser, signOutUser } =
  userSlice.actions;
export default userSlice.reducer;
