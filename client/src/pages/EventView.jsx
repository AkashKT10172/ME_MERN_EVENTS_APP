import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { getEventById } from "../services/eventService";
import {
  cancelRegistration,
  registerForEvent,
  checkUserRegistration,
} from "../services/registrationService";

const EventView = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);
        if (user) {
          const isRegistered = await checkUserRegistration(id);
          if (isRegistered.message === "Yes") setRegistered(true);
        }
        setEvent(res);
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!user) return navigate("/login");
    try {
      await registerForEvent(id);
      setRegistered(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelRegistration = async () => {
    try {
      await cancelRegistration(id);
      setRegistered(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Spinner />;
  if (error)
    return <div className="text-center text-red-500 mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 via-purple-800 to-indigo-900 text-white">
      <img
        src={event.image || "/default-banner.jpg"}
        alt="Event"
        className="w-full h-80 object-cover"
      />
      <div className="p-6 md:p-12">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <div className="text-yellow-400 text-lg mb-1">
          Status: {event.status}
        </div>
        <div className="text-gray-200 mb-2">
          Date: {new Date(event.startDate).toLocaleDateString()}
        </div>
        <div className="text-gray-200 mb-2">Time: {event.startTime}</div>
        <div className="text-gray-300 mb-6">Location: {event.location}</div>
        <p className="text-gray-100 text-lg mb-8">{event.description}</p>

        <div className="flex flex-wrap gap-4">
          {!registered ? (
            <button
              onClick={handleRegister}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white transition"
            >
              Register
            </button>
          ) : (
            <button
              onClick={handleCancelRegistration}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white transition"
            >
              Cancel Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventView;
