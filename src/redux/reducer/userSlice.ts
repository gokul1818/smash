import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface AuthState {
    allUserDetails: any;
}

const initialState: AuthState = {
    allUserDetails: null
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateAllUserDetails(state, action: PayloadAction<any>) {
            state.allUserDetails = action.payload;
        },
    },
});

// Export action creators and reducer
export const { updateAllUserDetails } = userSlice.actions;
export default userSlice.reducer;
