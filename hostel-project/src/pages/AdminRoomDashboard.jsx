// src/pages/AdminBookingRequests.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminRoomDashboard() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [actionMsg, setActionMsg] = useState("");

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/booking/requests"
      );
      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (err) {
      console.error("Error fetching booking requests:", err);
      setError("Failed to fetch booking requests.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/booking/requests/${requestId}/approve`
      );
      if (response.data.success) {
        setActionMsg(response.data.message);
        fetchRequests();
      }
    } catch (err) {
      console.error("Error approving request:", err);
      setError("Failed to approve request.");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/booking/requests/${requestId}/reject`
      );
      if (response.data.success) {
        setActionMsg(response.data.message);
        fetchRequests();
      }
    } catch (err) {
      console.error("Error rejecting request:", err);
      setError("Failed to reject request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Booking Requests</h1>
      {error && <p className="text-red-600">{error}</p>}
      {actionMsg && <p className="text-green-600">{actionMsg}</p>}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white shadow rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                Room ID: {req.roomId} | Student: {req.studentName} (ID:{" "}
                {req.studentId})
              </p>
              <p>Status: {req.status}</p>
            </div>
            {req.status === "pending" && (
              <div className="space-x-2">
                <button
                  onClick={() => handleApprove(req.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRoomDashboard;
