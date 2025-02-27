import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface AuthState {
  isLoggedIn: boolean;
  user:   any;
  match: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  match: false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateLocationMatch(state, action: PayloadAction<boolean>) {
      state.match = action.payload;
    },
  },
});

// Export action creators and reducer
export const { login, logout,updateLocationMatch } = authSlice.actions;
export default authSlice.reducer;
