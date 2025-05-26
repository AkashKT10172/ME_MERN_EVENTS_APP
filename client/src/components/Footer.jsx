import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between">
        
        {/* Company Info */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <h2 className="text-2xl font-bold text-white mb-3">EventsApp</h2>
          <p className="text-gray-400">
            Your go-to platform for discovering, managing, and creating amazing events. Join us and never miss out on the fun!
          </p>
        </div>
        
        {/* Navigation Links */}
        <div className="mb-8 md:mb-0 md:w-1/3 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-white mb-2">Explore</h3>
            <ul>
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/events" className="hover:text-white transition">Events</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-white transition">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Manage</h3>
            <ul>
              <li><Link to="/admin" className="hover:text-white transition">Admin Panel</Link></li>
              <li><Link to="/organizer" className="hover:text-white transition">Organizer</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link to="/signup" className="hover:text-white transition">Signup</Link></li>
            </ul>
          </div>
        </div>

        {/* Social and Contact */}
        <div className="md:w-1/3 flex flex-col justify-between">
          <h3 className="font-semibold text-white mb-2">Connect with us</h3>
          <div className="flex space-x-4 mb-4">
            {/* You can replace these with real icons or react-icons */}
            <a href="#" aria-label="Facebook" className="hover:text-white transition">📘</a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition">🐦</a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition">📸</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition">🔗</a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EventsApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
