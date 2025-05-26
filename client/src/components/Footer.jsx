import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Footer = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <footer className="w-full bg-indigo-950 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between">

        <div className="mb-8 md:mb-0 md:w-1/3">
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">The Social Hub</h2>
          <p className="text-gray-300">
            Your go-to platform for discovering, managing, and creating amazing events. Join us and never miss out on the fun!
          </p>
        </div>

        <div className="mb-8 md:mb-0 md:w-1/3 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">Explore</h3>
            <ul>
              <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
              <li><Link to="/events" className="hover:text-yellow-400 transition">Events</Link></li>
              <li><Link to="/dashboard" className="hover:text-yellow-400 transition">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-yellow-400 transition">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">Manage</h3>
            <ul>
              <li><Link to="/admin" className="hover:text-yellow-400 transition">Admin Panel</Link></li>
              <li><Link to="/organizer" className="hover:text-yellow-400 transition">Organizer</Link></li>
              {!user && (
                <>
                  <li><Link to="/login" className="hover:text-yellow-400 transition">Login</Link></li>
                  <li><Link to="/signup" className="hover:text-yellow-400 transition">Signup</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col justify-between">
          <h3 className="font-semibold text-yellow-400 mb-2">Connect with us</h3>
          <div className="flex space-x-4 mb-4 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-yellow-400 transition"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-yellow-400 transition"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-yellow-400 transition"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-yellow-400 transition"><FaLinkedinIn /></a>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} The Social Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
