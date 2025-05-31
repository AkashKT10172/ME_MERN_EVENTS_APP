import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { fetchUserProfile, updateUserProfile, requestOrganizer } from '../services/userService';

const Profile = () => {

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
  });
  const [avatarUrl, setAvatarUrl] = useState('');
  const [preview, setPreview] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [organizerRequest, setOraganizerRequest] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = await fetchUserProfile();
        setFormData({ name: user.name, email: user.email, password: '', avatar: null });
        setAvatarUrl(user.avatar);
        setRole(user.role);
        setOraganizerRequest(user.organizerApprovalStatus);
      } catch {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', uploadPreset);

    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data);
    return res.data.secure_url;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'avatar') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, avatar: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      let updatedAvatar = avatarUrl;
      if (formData.avatar) {
        updatedAvatar = await uploadToCloudinary(formData.avatar);
      }

      await updateUserProfile({
        ...formData,
        avatar: updatedAvatar,
      });

      
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOrganizerRequest  = async () => {
    try {
      await requestOrganizer();
      setOraganizerRequest('pending');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  } 

  if (loading) return <Spinner />;
  if (error) return <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 py-10 px-2 text-3xl font-bold text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 py-10 px-2">
      <div className="max-w-3xl mx-auto bg-[#1e1e1e] text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">Your Profile</h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src={preview || avatarUrl || '/default-avatar.png'}
            alt="Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-yellow-400 shadow-md"
          />
          <p className="text-lg mt-2">{formData.name}</p>
          <p className="text-sm text-gray-400">{formData.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-yellow-300 text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 rounded bg-gray-800 border border-yellow-400 placeholder-yellow-300 text-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="relative w-full">
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="avatar"
              className="block text-center p-3 border border-gray-600 rounded bg-[#29293f] cursor-pointer hover:bg-yellow-400 hover:text-black transition"
            >
              {formData.avatar ? formData.avatar.name : 'Change Avatar'}
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            disabled={submitting} // optional, prevents multiple submits
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Role: <span className="text-white font-semibold">{role}</span>
          </p>
          {role === 'Participant' && organizerRequest == 'not applied' && (
            <button onClick = {handleOrganizerRequest } className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition">
              Request Organizer Role
            </button>
          )}
          {role === 'Participant' && organizerRequest == 'rejected' && (
            <button onClick = {handleOrganizerRequest } className="mt-3 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition">
              Rejected, Re-Apply
            </button>
          )}
          {role === 'Participant' && organizerRequest == 'pending' && (
            <button className="mt-3 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white transition">
              Organizer Request Pending
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
