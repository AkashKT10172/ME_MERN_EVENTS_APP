import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { googleLoginUser, registerUser } from '../services/authService';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null, // Use avatar instead of avatarFile
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      const file = files[0];
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let avatarUrl = '';
      if (formData.avatar) {
        avatarUrl = await uploadImageToCloudinary(formData.avatar);
      }

      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: avatarUrl,
      });

      dispatch(loginUser({ user: response.user.name, token: response.token }));
      navigate('/');
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      const response = await googleLoginUser({
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      });

      dispatch(loginUser({ user: response.user.name, token: response.token }));
      navigate('/');
    } catch (err) {
      console.error('Google login failed:', err);
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-md border rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="file" name="avatar" onChange={handleChange} accept="image/*" className="w-full p-2 border rounded" />
        {preview && <img src={preview} alt="Avatar Preview" className="w-24 h-24 object-cover rounded-full mx-auto" />}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {loading ? 'Registering...' : 'Signup'}
        </button>
        <button type="button" disabled={loading} onClick={handleGoogleLogin} className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
          <i className="bi bi-google me-1" /> Sign Up with Google
        </button>
      </form>
      <p className="text-center mt-2">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default SignupPage;
