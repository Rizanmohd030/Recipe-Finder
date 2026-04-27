import axios from 'axios';
import { API_BASE_URL } from './apiBase';

const API_URL = `${API_BASE_URL}/api/users`;

/**
 * Sends a POST request to the backend to register a new user.
 * @param {object} userData - The user's data (name, email, password).
 * @returns {Promise<object>} A promise that resolves to the response data from the backend,
 *                            which includes the new user object and a JWT.
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Registration failed' };
  }
};

/**
 * Sends a POST request to the backend to log in a user.
 * @param {object} userData - The user's credentials (email, password).
 * @returns {Promise<object>} A promise that resolves to the response data from the backend,
 *                            which includes the user object and a JWT.
 */
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Login failed' };
  }
};
