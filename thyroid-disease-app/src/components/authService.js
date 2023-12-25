// authService.js

import axios from 'axios';

const baseURL = 'http://localhost:3001'; // Update with your server URL

export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${baseURL}/signup`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${baseURL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add similar functions for logout, checking if the user is logged in, etc.
