require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const historyRoutes = require("./routes/historyRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/history", historyRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});