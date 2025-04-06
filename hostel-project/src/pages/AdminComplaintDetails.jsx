// src/pages/AdminComplaintDetails.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AdminComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [resolutionComment, setResolutionComment] = useState("");

  // Fetch complaint details
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/complaint/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setComplaint(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching complaint:", err);
        setLoading(false);
      });
  }, [id]);

  // Fetch staff list for dropdown
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/staff`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setStaffList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching staff list:", err);
      });
  }, []);

  const handleAssign = async () => {
    if (!selectedStaff) {
      alert("Please select a staff member from the dropdown.");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:3000/api/complaint/${id}/assign`,
        { staffName: selectedStaff },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setComplaint(res.data);
      alert("Complaint assigned successfully!");
    } catch (error) {
      console.error("Error assigning complaint:", error);
      alert("Error assigning complaint.");
    }
  };

  const handleResolve = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/complaint/${id}/resolve`,
        { resolutionComment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setComplaint(res.data);
      alert("Complaint resolved successfully!");
    } catch (error) {
      console.error("Error resolving complaint:", error);
      alert("Error resolving complaint.");
    }
  };

  if (loading) return <p className="text-center text-xl mt-8">Loading...</p>;
  if (!complaint)
    return <p className="text-center text-xl mt-8">Complaint not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        Back
      </button>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">{complaint.title}</h1>
        <p className="text-gray-700 mb-4">{complaint.description}</p>
        <p className="text-gray-700 mb-4">
          <strong>Category:</strong> {complaint.category}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Status:</strong> {complaint.status}
        </p>
        {complaint.image && complaint.image.trim() !== "" && (
          <img
            src={complaint.image}
            alt="Complaint"
            className="w-full h-auto rounded-lg mb-4"
          />
        )}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Assign Staff (Admin Only)
          </h2>
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-2"
          >
            <option value="">Select Staff Member</option>
            {staffList.map((staff) => (
              <option key={staff._id} value={staff.name}>
                {staff.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAssign}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Assign & Mark as In-Progress
          </button>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Resolve Complaint (Admin Only)
          </h2>
          <textarea
            value={resolutionComment}
            onChange={(e) => setResolutionComment(e.target.value)}
            placeholder="Enter resolution details or comments..."
            className="w-full border border-gray-300 rounded p-2 mb-2"
            rows="3"
          ></textarea>
          <button
            onClick={handleResolve}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminComplaintDetails;
