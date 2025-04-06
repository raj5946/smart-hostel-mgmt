import React from "react";

const AttendanceList = ({ records }) => (
  <div>
    <h2>Attendance Records</h2>
    {records.map((record) => (
      <div key={record._id} style={{ marginBottom: "10px" }}>
        <img
          src={`http://localhost:3000/${record.imagePath}`}
          width="150"
          alt="attendance"
        />
        <div>Roll No: {record.rollNo}</div>
        <div>Time: {new Date(record.time).toLocaleString()}</div>
      </div>
    ))}
  </div>
);

export default AttendanceList;
