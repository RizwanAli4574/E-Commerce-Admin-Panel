import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   products: [],
   product: null,
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: ''
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        getProductsSuccess: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload;
        },
        createProductSuccess: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products.push(action.payload)
        },
        updateProductSuccess: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = state.products.map((p) => 
            p._id === action.payload._id ? action.payload : p)
        },
        deleteProductSuccess: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = state.products.filter((p) => 
            p._id !== action.payload);
        },
        productFail: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        },
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    }
})

export const {
    setLoading,
    getProductsSuccess,
    createProductSuccess,
    updateProductSuccess,
    deleteProductSuccess,
    productFail,
    reset
} = productSlice.actions;

export default productSlice.reducer;
