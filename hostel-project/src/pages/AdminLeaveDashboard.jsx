// src/pages/AdminLeaveDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLeaveDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  // Fetch all leave requests
  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/leave/requests");
      setLeaveRequests(res.data);
    } catch (err) {
      console.error("Error fetching leave requests", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleAction = async (id, status) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/leave/requests/${id}/status`,
        {
          status,
        }
      );
      setActionMessage(res.data.message);
      fetchLeaveRequests(); // Refresh after update
    } catch (err) {
      console.error("Action failed", err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">
        Leave Request Management
      </h1>

      {loading && <p>Loading leave requests...</p>}
      {actionMessage && (
        <p className="text-center text-green-600">{actionMessage}</p>
      )}

      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6">
        {leaveRequests.length === 0 ? (
          <p className="text-center text-gray-500">No leave requests.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Roll No</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequests.map((req) => (
                <tr key={req.id}>
                  <td className="px-4 py-2">{req.rollNo}</td>
                  <td className="px-4 py-2">{req.reason}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        req.status === "approved"
                          ? "bg-green-500"
                          : req.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAction(req.id, "approved")}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(req.id, "rejected")}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {req.status !== "pending" && (
                      <span className="text-gray-400 italic">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminLeaveDashboard;
