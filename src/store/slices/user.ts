import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
}

const initialState = {
  isAuthenticated: false,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = userSlice.actions;

export default userSlice.reducer;
