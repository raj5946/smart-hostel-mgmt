// src/pages/RoomBookingPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RoomBookingPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailableRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/rooms/available"
      );
      if (response.data.success) {
        setRooms(response.data.rooms);
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
      toast.error("Failed to fetch rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableRooms();

    // Polling for admin approval/rejection every 10s
    const interval = setInterval(checkBookingStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRequestRoom = async (roomId) => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) {
      toast.error("User not logged in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/booking/request",
        {
          roomId,
          studentId: user.id,
          studentName: user.username,
        }
      );

      if (response.data.success) {
        toast.success("Room request submitted!");
      }
    } catch (err) {
      console.error("Error requesting room:", err);
      toast.error("Failed to request room.");
    }
  };

  const checkBookingStatus = async () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) return;

    try {
      const res = await axios.get(
        `http://localhost:3000/api/booking/my-status/${user.id}`
      );
      if (res.data.success && res.data.statusUpdate) {
        const { status, roomNumber } = res.data.statusUpdate;

        if (status === "approved") {
          toast.success(
            `🎉 Your request for room ${roomNumber} has been approved!`
          );
        } else if (status === "rejected") {
          toast.warning(`❌ Your request for room ${roomNumber} was rejected.`);
        }
      }
    } catch (err) {
      console.error("Error polling booking status", err);
    }
  };

  // Group rooms by floor
  const floors = {};
  rooms.forEach((room) => {
    if (!floors[room.floor]) floors[room.floor] = [];
    floors[room.floor].push(room);
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer position="top-right" autoClose={4000} />
      <h1 className="text-3xl font-bold text-center mb-6">Request Room</h1>

      {Object.keys(floors).map((floorNumber) => (
        <div key={floorNumber} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Floor {floorNumber}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {floors[floorNumber].map((room) => (
              <div
                key={room.id}
                className="relative border-2 border-gray-300 rounded-lg p-4 bg-white shadow-lg"
              >
                <div className="absolute top-0 left-0 bg-gray-200 px-2 py-1 text-sm font-semibold rounded-br-lg">
                  Room {room.roomNumber}
                </div>
                <div className="mt-6 flex flex-col items-center">
                  <div className="flex space-x-1">
                    {Array.from({ length: room.capacity }).map((_, idx) => (
                      <svg
                        key={idx}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill={room.isBooked ? "red" : "green"}
                      >
                        <path d="M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4H4z" />
                        <path d="M2 10h20v10a2 2 0 01-2 2H4a2 2 0 01-2-2V10z" />
                      </svg>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">
                      {room.isBooked ? "Booked" : "Available"}
                    </p>
                  </div>
                  {!room.isBooked && (
                    <button
                      onClick={() => handleRequestRoom(room.id)}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Request Room
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomBookingPage;
