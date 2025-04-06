// src/pages/UserComplaintList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function UserComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/complaint", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setComplaints(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching complaints:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-xl mt-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-center text-4xl font-bold mb-8">My Complaints</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
        {complaints.length ? (
          complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{complaint.title}</h2>
              <p className="text-gray-700 mb-2">
                <strong>Status:</strong> {complaint.status}
              </p>
              <p className="text-gray-700 mb-2">{complaint.description}</p>
              {complaint.image && complaint.image.trim() !== "" && (
                <img
                  src={complaint.image}
                  alt="Complaint"
                  className="w-full h-auto rounded-lg mb-2"
                />
              )}
              <p className="text-sm text-gray-500">
                Submitted on: {new Date(complaint.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-xl">No complaints submitted yet.</p>
        )}
      </div>
    </div>
  );
}

export default UserComplaintList;
