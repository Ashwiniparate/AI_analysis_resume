const mongoose = require("mongoose");


const historySchema = new mongoose.Schema(
{
    resumeName: {
        type: String,
        required: true
    },

    analysisResult: {
        type: String,
        required: true
    }

},
{
    timestamps: true
});


module.exports = mongoose.model("History", historySchema);