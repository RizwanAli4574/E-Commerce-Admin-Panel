import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products/';

// Helper function to get auth token from localStorage
const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

// Get all products
const getProducts = async (token) => {
    const response = await axios.get(API_URL , getConfig(token));
    return response.data;
};

// Create new product 
const createProduct = async (productData , token) => {
    const response = await axios.post(API_URL , productData , getConfig(token));
    return response.data;
};

// Update a product
const updateProduct = async (id , productData , token) => {
    const response = await axios.put(API_URL + id, productData, getConfig(token));
    return response.data;
};

// Delete a product
const deleteProduct = async (id, token) => {
    const response = await axios.delete(API_URL + id, getConfig(token));
    return response.data;
};

const productService = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};

export default productService;