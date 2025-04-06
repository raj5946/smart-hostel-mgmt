// models/Room.js

// Sample in-memory room data with multiple floors
let rooms = [
  {
    id: 1,
    floor: 1,
    roomNumber: "101",
    capacity: 2,
    isBooked: false,
    occupant: null,
  },
  {
    id: 2,
    floor: 1,
    roomNumber: "102",
    capacity: 2,
    isBooked: false,
    occupant: null,
  },
  {
    id: 3,
    floor: 1,
    roomNumber: "103",
    capacity: 1,
    isBooked: false,
    occupant: null,
  },
  {
    id: 4,
    floor: 2,
    roomNumber: "201",
    capacity: 3,
    isBooked: false,
    occupant: null,
  },
  {
    id: 5,
    floor: 2,
    roomNumber: "202",
    capacity: 2,
    isBooked: false,
    occupant: null,
  },
  {
    id: 6,
    floor: 3,
    roomNumber: "301",
    capacity: 1,
    isBooked: false,
    occupant: null,
  },
  {
    id: 7,
    floor: 3,
    roomNumber: "302",
    capacity: 2,
    isBooked: false,
    occupant: null,
  },
];

exports.getAvailableRooms = () => rooms.filter((room) => !room.isBooked);

exports.findRoomById = (id) => rooms.find((room) => room.id === id);

exports.bookRoom = (id, studentId, studentName) => {
  const room = rooms.find((room) => room.id === id);
  if (room && !room.isBooked) {
    room.isBooked = true;
    room.occupant = { studentId, studentName };
    return room;
  }
  return null;
};

exports.getAllRooms = () => rooms;

exports.getRoomsByStudentId = (studentId) =>
  rooms.filter(
    (room) => room.occupant && room.occupant.studentId === studentId
  );
