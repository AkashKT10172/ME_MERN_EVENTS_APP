import axios from 'axios';

const API_URL = 'http://localhost:5000';

const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const checkUserRegistration = async (id) => {
  const response = await axios.get(`${API_URL}/api/registration/is-registered/${id}`, config);
  return response.data;
};

export const registerForEvent = async (id) => {
  const response = await axios.post(`${API_URL}/api/registration/${id}`, {}, config);
  return response.data;
};

export const cancelRegistration = async (id) => {
  const response = await axios.delete(`${API_URL}/api/registration/${id}`, config);
  return response.data;
};
