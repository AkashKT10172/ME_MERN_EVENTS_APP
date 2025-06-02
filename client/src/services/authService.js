import axios from 'axios';

const API_URL = 'https://the-social-hub-vbmw.onrender.com';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  return response.data;
};

export const googleLoginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/api/auth/google-login`, userData);
    return response.data;
}

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    return response.data;
}