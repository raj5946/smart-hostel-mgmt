// models/BookingRequest.js

let bookingRequests = [];
let currentId = 1;

exports.createRequest = (roomId, studentId, studentName) => {
  const request = {
    id: currentId++,
    roomId,
    studentId,
    studentName,
    status: "pending",
  };
  bookingRequests.push(request);
  return request;
};

exports.getRequestByStudentId = (studentId) => {
  // Return any pending or approved request for a student
  return bookingRequests.filter(
    (r) =>
      r.studentId === studentId &&
      (r.status === "pending" || r.status === "approved")
  );
};

exports.getPendingRequests = () =>
  bookingRequests.filter((r) => r.status === "pending");

exports.getRequestById = (id) => bookingRequests.find((r) => r.id === id);

exports.updateRequestStatus = (id, status) => {
  const request = bookingRequests.find((r) => r.id === id);
  if (request) {
    request.status = status;
  }
  return request;
};
