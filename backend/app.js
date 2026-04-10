const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// Database connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("CRITICAL ERROR: MONGO_URI is not defined in .env");
} else {
  mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.error("MongoDB Connection Error:", err.message));
}

// Set up middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Route mounting
app.use("/", indexRouter);
app.use("/", usersRouter);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy", dbStatus: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected" });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;