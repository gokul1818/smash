import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface AuthState {
    allUserDetails: any;
}

interface AuthState {
    courtDetails: any
}
const initialState: AuthState = {
    allUserDetails: null,
    courtDetails: null,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateAllUserDetails(state, action: PayloadAction<any>) {
            state.allUserDetails = action.payload;
        },
        updateAllCourtDetails(state, action: PayloadAction<any>) {
            state.courtDetails = action.payload;
        },
    },
});

// Export action creators and reducer
export const { updateAllUserDetails, updateAllCourtDetails } = userSlice.actions;
export default userSlice.reducer;
