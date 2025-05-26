import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { googleLoginUser, loginUser as loginUserAPI } from '../services/authService';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const user = useSelector(state => state.auth.user);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUserAPI({
        email: formData.email,
        password: formData.password,
      });

      dispatch(loginUser({ user: response.user.name, token: response.token, role: response.user.role }));
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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

      dispatch(loginUser({ user: response.user.name, token: response.token, role: response.user.role }));
      navigate('/');
    } catch (err) {
      console.error('Google login failed:', err);
      setError('Google login failed. Please try again.');
    }
  };
  useEffect(() => {
    if(user) 
      navigate('/');
  }, []);
  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-md border rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button type="button" disabled={loading} onClick={handleGoogleLogin} className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
          <i className="bi bi-google me-1" /> Login with Google
        </button>
      </form>
      <p className="text-center mt-2">
        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
