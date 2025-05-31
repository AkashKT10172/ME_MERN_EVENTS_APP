import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import {
  approveOrganizerRequest,
  getPendingOrganizerRequests,
  rejectOrganizerRequest,
} from '../services/adminService';

const Admin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getPendingOrganizerRequests();
        setRequests(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleApprove = async (reqId) => {
    try {
      await approveOrganizerRequest(reqId);
      setRequests(requests.filter((req) => req._id !== reqId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (reqId) => {
    try {
      await rejectOrganizerRequest(reqId);
      setRequests(requests.filter((req) => req._id !== reqId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white py-10 px-4">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">
        Organizer Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-300">No pending requests.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-indigo-950/80 backdrop-blur-md border border-indigo-800 rounded-2xl p-5 shadow-xl transition hover:shadow-yellow-400/20"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={req.avatar}
                    alt={req.name}
                    className="w-14 h-14 rounded-full border-2 border-yellow-400"
                  />
                  <div>
                    <p className="text-lg font-semibold">{req.name}</p>
                    <p className="text-sm text-gray-400">{req.email}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
