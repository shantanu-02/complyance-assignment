import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { username: string; country: string; role: string } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: { username: string; country: string; role: string }; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUserData: (state, action: PayloadAction<{ username: string; role: string; country: string }>) => {
      if (state.user) {
        state.user.username = action.payload.username;
        state.user.role = action.payload.role;
        state.user.country = action.payload.country;
      } else {
        state.user = { ...action.payload };
      }
    },
  },
});

export const { login, logout, updateUserData } = authSlice.actions;
export default authSlice.reducer;
