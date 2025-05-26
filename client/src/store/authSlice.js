import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const initialState = {
  user: storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
