import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;