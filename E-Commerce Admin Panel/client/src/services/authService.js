import axios from "axios";

const API_URL = "https://fictional-meme-7v9979vp95j73xxjp-5000.app.github.dev/api/auth/";

// Register new user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login' , userData);
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout
};

export default authService;
