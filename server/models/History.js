const mongoose = require("mongoose");


const historySchema = new mongoose.Schema({

    resumeName:{
        type:String,
        required:true
    },


    analysisResult:{
        type:String,
        required:true
    },


    createdAt:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "History",
    historySchema
);