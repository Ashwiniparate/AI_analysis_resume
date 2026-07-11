require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const historyRoutes = require("./routes/historyRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();



app.use(cors());
app.use(express.json());



app.use("/api/history", historyRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});