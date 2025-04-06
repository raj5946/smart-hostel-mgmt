// src/components/LeaveRequestForm.jsx
import React, { useState } from "react";

const LeaveRequestForm = ({ onSubmit }) => {
  const [rollNo, setRollNo] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rollNo || !reason) return alert("Please enter roll no and reason");
    onSubmit(rollNo, reason);
    setRollNo("");
    setReason("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-2">Request Leave</h3>
      <input
        type="text"
        placeholder="Enter Roll No"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Reason for leave"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
      >
        Submit Request
      </button>
    </form>
  );
};

export default LeaveRequestForm;
