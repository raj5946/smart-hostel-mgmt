// src/pages/AttendancePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import WebcamCapture from "../components/WebcamCapture";
import AttendanceList from "../components/AttendanceList";
import LeaveRequestForm from "../components/LeaveRequestForm";

const AttendancePage = () => {
  const [records, setRecords] = useState([]);
  const [leaveSubmitted, setLeaveSubmitted] = useState("");

  // Fetch attendance records
  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/attendance");
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to load attendance records", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleNewCapture = (newRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
  };

  const handleLeaveSubmit = async (rollNo, reason) => {
    try {
      const res = await axios.post("http://localhost:3000/api/leave/request", {
        rollNo,
        reason,
      });
      setLeaveSubmitted(res.data.message);
    } catch (err) {
      setLeaveSubmitted("Failed to submit leave request.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">
        Student Attendance
      </h1>

      <div className="max-w-xl mx-auto mb-10">
        <WebcamCapture onCapture={handleNewCapture} />
      </div>

      <div className="max-w-2xl mx-auto mb-6">
        <LeaveRequestForm onSubmit={handleLeaveSubmit} />
        {leaveSubmitted && (
          <p className="text-center text-green-600 mt-2">{leaveSubmitted}</p>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        <AttendanceList records={records} />
      </div>
    </div>
  );
};

export default AttendancePage;
