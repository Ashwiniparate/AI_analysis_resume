const express = require("express");
const router = express.Router();

const multer = require("multer");
const { PDFParse } = require("pdf-parse");
const fs = require("fs");

const model = require("../config/gemini");

const Resume = require("../models/Resume");



const upload = multer({
    storage: multer.memoryStorage()
});





router.post("/analyze", upload.single("resume"), async (req, res) => {

    try {

        const file = req.file;


        if (!file) {

            return res.status(400).json({
                message: "No resume uploaded"
            });

        }



        

        const parser = new PDFParse({

            data: file.buffer

        });


        const pdfData = await parser.getText();


        const resumeText = pdfData.text;



        const prompt = `

Analyze this resume.

Give response in this format:

Resume Score:
Technical Skills:
Missing Skills:
Suitable Job Roles:
Improvement Suggestions:


Resume:

${resumeText}

`;



        const result = await model.generateContent(prompt);


        const response = result.response.text();



      

        const savedResume = new Resume({

            fileName: file.originalname,

            analysis: response

        });


        await savedResume.save();
        console.log("Saved Resume:", savedResume);


        console.log("Resume history saved successfully");



        res.json({

            analysis: response

        });



    } catch(error) {


        console.log("Resume Error:", error);


        res.status(500).json({

            message:error.message

        });


    }

});








router.post("/interview", async(req,res)=>{


    try{


        const {jobRole, skills}=req.body;



        if(!jobRole || !skills){

            return res.status(400).json({

                message:"Job role and skills are required"

            });

        }



        const prompt = `

You are a professional HR and Technical interviewer.


Job Role:
${jobRole}


Candidate Skills:
${skills}


Generate interview preparation:


1. HR Questions

2. Technical Questions

3. Project Questions

4. Coding Questions

5. Interview Tips


`;



        const result = await model.generateContent(prompt);


        const response = result.response.text();



        res.json({

            interview:response

        });



    }
    catch(error){


        console.log("Interview Error:",error);


        res.status(500).json({

            message:error.message

        });


    }



});




module.exports = router;