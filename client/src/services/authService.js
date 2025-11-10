import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL  + '/api/users';

/**
 * Sends a POST request to the backend to register a new user.
 * @param {object} userData - The user's data (name, email, password).
 * @returns {Promise<object>} A promise that resolves to the response data from the backend,
 *                            which includes the new user object and a JWT.
 */

export const register = async(userData) =>{
    try{
        const response = await axios.post(`${API_URL}/register`,userData);
        return response.data;
    }catch(error){
          console.error('Registration failed:', error.response.data);
    throw error.response.data;
    }
};

/**
 * Sends a POST request to the backend to log in a user.
 * @param {object} userData - The user's credentials (email, password).
 * @returns {Promise<object>} A promise that resolves to the response data from the backend,
 *                            which includes the user object and a JWT.
 */

export const login = async(userData)=>{
    try{
        const response = await axios.post(`${API_URL}/login`,userData);
        return response.data;
    }catch(error){
        console.error('Login failed:', error.response.data);
    throw error.response.data;
    }
};