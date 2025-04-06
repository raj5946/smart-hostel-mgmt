// src/pages/AdminComplaintList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/complaint", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res.data);
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
      <h1 className="text-center text-4xl font-bold mb-8">All Complaints</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
        {complaints.length ? (
          complaints.map((complaint) => (
            <Link
              key={complaint._id}
              to={`/admin/complaint/${complaint._id}`}
              className="block bg-white rounded-lg shadow-lg p-6 hover:bg-gray-100 transition"
            >
              <h2 className="text-xl font-semibold mb-2">{complaint.title}</h2>
              <p className="text-gray-700 mb-2">
                <strong>Status:</strong> {complaint.status}
              </p>
              {complaint.user && (
                <p className="text-gray-700 mb-2">
                  <strong>User:</strong>{" "}
                  {typeof complaint.user === "object"
                    ? complaint.user.name
                    : complaint.user}
                </p>
              )}
              <p className="text-gray-700">
                {complaint.description.length > 100
                  ? complaint.description.substring(0, 100) + "..."
                  : complaint.description}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center text-xl">No complaints available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminComplaintList;
