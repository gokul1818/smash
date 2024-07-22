import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  phoneNumber: number;
  slot: string;
  isAdmin: boolean;
  timestamp: string;
  streaks: number | 0;

  // Add other relevant fields as per your user data structure
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
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
