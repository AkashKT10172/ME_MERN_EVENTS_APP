import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Spinner from './components/Spinner';

const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));
const EventView = lazy(() => import('./pages/EventView'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Admin = lazy(() => import('./pages/Admin'));
const Organizer = lazy(() => import('./pages/Organizer'));
const CreateEvent = lazy(() => import('./pages/CreateEvent'));
const EditEvent = lazy(() => import('./pages/EditEvent'));


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} /> {/* we will show introduction, first 10 events on this page */}
          <Route path="/events" element={<Events />} /> {/* this page will have all the events */}
          <Route path="/events/:id" element={<EventView />} /> {/* view, register, cancel registration for an event */}
          <Route path="/login" element={<Login />} /> {/* this is the login page */}
          <Route path="/signup" element={<Signup />} /> {/* this is the signup page */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* user's dashboard: registered events, cancellations */}
          <Route path="/profile" element={<Profile />} /> {/* user profile, update info, request organizer */}
          <Route path="/admin" element={<Admin />} /> {/* admin activities */}
          <Route path="/organizer" element={<Organizer />} /> {/* organizer activities */}
          <Route path="/create_event" element={<CreateEvent />} /> {/* route to create an event */}
          <Route path="/edit/:id" element={<EditEvent />} /> {/* route to edit an event */}
          <Route path="*" element={<NotFound />} /> {/* fallback 404 page */}
        </Routes>
        </Suspense>
        <Footer />
      </Router>
    </>
  );
}

export default App;
