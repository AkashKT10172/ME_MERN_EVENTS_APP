import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to= '/' className="text-xl font-bold">Events App</Link> 
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
            {user.role === 'Admin' && (
              <Link to="/admin" className="hover:underline">Admin</Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
