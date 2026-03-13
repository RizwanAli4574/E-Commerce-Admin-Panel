import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))
    : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;    
            state.isSuccess = true;
            state.user = action.payload;
        },
        loginFail: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.isSuccess = false;
        },
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },

})

export const { setLoading , loginSuccess , loginFail , logout , reset} = authSlice.actions;

export default authSlice.reducer;