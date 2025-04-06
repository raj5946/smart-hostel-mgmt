import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPresenceTracker() {
  const [students, setStudents] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/students");
      setStudents(res.data.students || []);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    const interval = setInterval(fetchStudents, 5000);
    return () => clearInterval(interval);
  }, []);

  const logAction = (name, type) => {
    const timestamp = new Date().toLocaleString();
    setLogs((prev) => [{ name, type, timestamp, id: Date.now() }, ...prev]);
  };

  const handleCheckIn = async (id) => {
    const student = students.find((s) => s._id === id);
    await axios.post("http://localhost:3000/api/checkin", { studentId: id });
    logAction(student.name, "checkin");
    fetchStudents();
  };

  const handleCheckOut = async (id) => {
    const student = students.find((s) => s._id === id);
    await axios.post("http://localhost:3000/api/checkout", { studentId: id });
    logAction(student.name, "checkout");
    fetchStudents();
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-medium text-gray-600">
        Loading students...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Hostel Student Presence Tracker
      </h1>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {student.name}
            </h2>
            <p className="mb-1 text-gray-700">
              Status:{" "}
              <span
                className={`font-bold ${
                  student.isPresent ? "text-green-600" : "text-red-600"
                }`}
              >
                {student.isPresent ? "Present" : "Absent"}
              </span>
            </p>
            <p className="text-sm text-gray-500 mb-1">
              Last Check-In:{" "}
              {student.lastCheckIn
                ? new Date(student.lastCheckIn).toLocaleString()
                : "—"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Last Check-Out:{" "}
              {student.lastCheckOut
                ? new Date(student.lastCheckOut).toLocaleString()
                : "—"}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleCheckIn(student._id)}
                disabled={student.isPresent}
                className={`px-4 py-2 rounded-md text-white font-semibold ${
                  student.isPresent
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Check In
              </button>
              <button
                onClick={() => handleCheckOut(student._id)}
                disabled={!student.isPresent}
                className={`px-4 py-2 rounded-md text-white font-semibold ${
                  !student.isPresent
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Check Out
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Log Section */}
      <div className="mt-12 bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Attendance Logs
        </h2>
        {logs.length === 0 ? (
          <p className="text-gray-500 text-center">No activity yet</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {logs.map((log) => (
              <li key={log.id} className="py-2 text-gray-700">
                <span
                  className={`font-semibold ${
                    log.type === "checkin" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {log.type === "checkin" ? "✔" : "✖"} {log.name}
                </span>{" "}
                {log.type === "checkin" ? "checked in" : "checked out"} at{" "}
                <span className="text-sm text-gray-500">{log.timestamp}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminPresenceTracker;
