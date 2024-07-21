import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  user: {
    phoneNumber: string;
  } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ phoneNumber: string}>) {
      state.isLoggedIn = true;
      state.user = {
        phoneNumber: action.payload.phoneNumber,
      };
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Export action creators and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
