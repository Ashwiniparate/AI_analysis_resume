const mongoose = require("mongoose");


const resumeSchema = new mongoose.Schema({

    fileName: {
        type: String,
        required: true
    },


    analysis: {
        type: String,
        required: true
    },


    interviewQuestions: {
        type: String,
        default: ""
    },


    createdAt: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model("Resume", resumeSchema);