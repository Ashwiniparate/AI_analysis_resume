const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const resumeRoutes = require("./routes/resume");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
connectDB();


// Health check
app.get("/", (req,res)=>{
    res.json({
        message:"AI Resume API Running"
    });
});


app.get("/health",(req,res)=>{
    res.status(200).json({
        status:"OK"
    });
});


// Resume Routes
app.use("/api/resume", resumeRoutes);



const PORT = process.env.PORT || 5000;


app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server running on port ${PORT}`);
});