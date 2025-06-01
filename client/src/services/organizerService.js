import axios from 'axios'

const API_URL = 'http://localhost:5000'
const getOrganizerConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getOrganizersEvents = async (eventData) => {
    const config = getOrganizerConfig();
    config.params = eventData; 
    const response = await axios.get(`${API_URL}/api/events/organizer/get`, config);
    return response.data;
}

export const deleteAnEvent = async (id) => {
    const response = await axios.delete(`${API_URL}/api/events/${id}`, getOrganizerConfig());
    return response.data;
}