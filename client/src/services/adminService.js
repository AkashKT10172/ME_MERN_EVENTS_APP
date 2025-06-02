import axios from 'axios'

const API_URL = 'https://the-social-hub-vbmw.onrender.com'
const getAdminConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getPendingOrganizerRequests = async () => {
    const response = await axios.get(`${API_URL}/api/admin/organizer-requests`, getAdminConfig());
    return response.data;
}

export const approveOrganizerRequest = async (id) => {
    const response = await axios.put(`${API_URL}/api/admin/users/${id}/approve-organizer`, {}, getAdminConfig());
    return response.data;
}

export const rejectOrganizerRequest = async (id) => {
    const response = await axios.put(`${API_URL}/api/admin/users/${id}/reject-organizer`, {}, getAdminConfig());
    return response.data;
}

export const getEventRegistrations = async (id) => {
    const response = await axios.get(`${API_URL}/api/admin/events/${id}/registrations`, getAdminConfig());
    return response.data;
} 