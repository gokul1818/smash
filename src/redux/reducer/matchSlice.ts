import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: boolean;
    user: {
        username: string;
        email: string;
    } | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
};

const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {

    },
});

export const { } = matchSlice.actions;
export default matchSlice.reducer;
