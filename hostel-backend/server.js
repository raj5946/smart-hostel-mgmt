// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cron = require("node-cron");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");
const messRoutes = require("./routes/mess");
const feedbackRoutes = require("./routes/feedback");
const complaintRoutes = require("./routes/complaint");
const staffRoutes = require("./routes/stafflist");
const roomRoutes = require("./routes/roomRoutes");
const bookingRequestRoutes = require("./routes/bookingRequestRoutes");
const attendanceRoutes = require("./routes/attendance");
const path = require("path");
const leaveRoutes = require("./routes/leaveRoutes");
const { Server } = require("socket.io"); // ✅ this is correct
const http = require("http");

const { verifyToken } = require("./middleware/authMiddleware");

dotenv.config();

// Initialize Express
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Public (Unprotected) Routes
app.use("/api/auth", authRoutes);

const studentRoutes = require("./routes/studentRoutes")(io);
app.use("/api", studentRoutes);

// Protected (Requires Token) Routes
app.use("/api/payment", verifyToken, paymentRoutes);
cron.schedule("0 9 * * *", () => {
  const today = new Date().toISOString().slice(0, 10);
  const fees = getAllFees();
  fees.forEach((fee) => {
    if (!fee.paid && fee.dueDate === today) {
      // In production, integrate with an email or SMS API.
      console.log(
        `Reminder: Payment due for ${fee.studentName} at ${fee.email}`
      );
    }
  });
});

app.use("/api/mess-menu", messRoutes);

app.use("/api/feedback", feedbackRoutes);

app.use("/api/complaint", complaintRoutes);

const Staff = require("./models/Staff");

const seedStaff = async () => {
  try {
    const count = await Staff.countDocuments();
    if (count === 0) {
      const defaultStaff = [
        {
          name: "Alice Johnson",
          phone: "1234567890",
        },
        { name: "Bob Smith", phone: "2345678901" },
        {
          name: "Charlie Davis",
          phone: "3456789012",
        },
      ];
      await Staff.insertMany(defaultStaff);
      console.log("Staff seeded successfully");
    }
  } catch (error) {
    console.error("Error seeding staff:", error);
  }
};

// Call the seed function after connecting to the database
seedStaff();

app.use("/api/staff", staffRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/booking", bookingRequestRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);

// 🧠 Socket connection logs
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
