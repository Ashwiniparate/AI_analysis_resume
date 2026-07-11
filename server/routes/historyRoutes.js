const express = require("express");

const router = express.Router();

const Resume = require("../models/Resume");




router.post("/save", async (req, res) => {

    try {

        const resume = new Resume(req.body);

        await resume.save();


        res.json({
            message: "Resume saved successfully",
            data: resume
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});







router.get("/", async (req, res) => {

    try {

        const history = await Resume.find()
            .sort({ createdAt: -1 });


        res.json(history);


    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

});







router.delete("/:id", async (req, res) => {

    try {


        const deletedHistory = await Resume.findByIdAndDelete(
            req.params.id
        );



        if(!deletedHistory){

            return res.status(404).json({

                message:"History not found"

            });

        }



        res.json({

            message:"History deleted successfully"

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }

});





module.exports = router;