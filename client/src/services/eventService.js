import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getAllEvents = async (userData) => {
  const response = await axios.get(`${API_URL}/api/events`, {params: userData});
  return response.data;
};