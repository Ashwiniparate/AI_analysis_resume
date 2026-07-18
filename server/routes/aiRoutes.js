const express = require("express");
const router = express.Router();

const model = require("../config/gemini");
const Chat = require("../models/Chat");


router.post("/generate", async(req,res)=>{

    try{

        const {prompt}=req.body;

        if(!prompt){
            return res.status(400).json({
                message:"Prompt required"
            });
        }


        const result = await model.generateContent(prompt);

        const answer = result.response.text();


        await Chat.create({
            question: prompt,
            answer: answer
        });


        res.status(200).json({
            answer: answer
        });


    }
    catch(error){

        console.log("Gemini Error:", error);

        res.status(500).json({
            message:error.message
        });

    }

});



router.get("/history", async(req,res)=>{

    try{

        const chats = await Chat.find()
        .sort({createdAt:-1});


        res.json(chats);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});



router.delete("/history/:id", async(req,res)=>{

    try{

        await Chat.findByIdAndDelete(req.params.id);

        res.json({
            message:"Chat deleted successfully"
        });

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


module.exports = router;