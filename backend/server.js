import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

// =====================================
// Routes
// =====================================

import authRoutes from "./routes/authRoutes.js";
import churchRoutes from "./routes/churchRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import attendanceSessionRoutes from "./routes/attendanceSessionRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import followUpRoutes from "./routes/followUpRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import memberActivityRoutes from "./routes/memberActivityRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";

// =====================================
// Middleware
// =====================================

import notFound from "./middleware/notFoundMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";
import protect from "./middleware/authMiddleware.js";

// =====================================
// Environment
// =====================================

dotenv.config();

// =====================================
// App
// =====================================

const app = express();

// =====================================
// Database
// =====================================

connectDB();

// =====================================
// Global Middleware
// =====================================

app.use(cors());

app.use(express.json({ limit: "200kb" }));

// =====================================
// Health Check
// =====================================

app.get("/", (req, res) => {
  res.json({
    success: true,

    message: "Church Growth Intelligence API Running",
  });
});

// =====================================
// API Routes
// =====================================

// Authentication
app.use("/api/auth", authRoutes);

// Church
app.use("/api/church", churchRoutes);

// Members
app.use("/api/members", memberRoutes);

// Member Activities
app.use("/api/members", memberActivityRoutes);

// Services
app.use("/api/services", serviceRoutes);

// Attendance
app.use("/api/attendance", attendanceRoutes);
app.use("/api/attendance/sessions", attendanceSessionRoutes);

// Visitors
app.use("/api/visitors", visitorRoutes);

// Follow Ups
app.use("/api/followups", followUpRoutes);

// Analytics
app.use("/api/analytics", analyticsRoutes);

// Groups
app.use("/api/groups", groupRoutes);

// Users
app.use("/api/users", userRoutes);

// Finance
app.use("/api/finance", financeRoutes);

// Expenses
app.use("/api/expenses", expenseRoutes);

// Roles
app.use("/api/roles", roleRoutes);

// =====================================
// Staff
// =====================================

app.use("/api/staff", staffRoutes);

// =====================================
// Protected Test Route
// =====================================

app.get("/api/test", protect, (req, res) => {
  res.json({
    success: true,

    message: "Protected route works",

    user: req.user,
  });
});

// =====================================
// 404 Handler
// =====================================

app.use(notFound);

// =====================================
// Global Error Handler
// =====================================

app.use(errorHandler);

// =====================================
// Server
// =====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
