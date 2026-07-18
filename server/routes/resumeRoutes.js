const express = require("express");
const router = express.Router();

const multer = require("multer");
const { PDFParse } = require("pdf-parse");

const model = require("../config/gemini");

const History = require("../models/History");


const upload = multer({
    storage: multer.memoryStorage()
});



// =================================
// Resume Analyze API
// =================================

router.post("/analyze", upload.single("resume"), async (req, res) => {

    try {

        const file = req.file;


        if (!file) {

            return res.status(400).json({

                message: "No resume uploaded"

            });

        }



        // Extract PDF Text

        const parser = new PDFParse({

            data: file.buffer

        });


        const pdfData = await parser.getText();


        const resumeText = pdfData.text;



        if (!resumeText) {

            return res.status(400).json({

                message: "Unable to extract resume text"

            });

        }




        const prompt = `

You are an expert resume reviewer.

Analyze the resume and provide a clean professional report.

Do NOT use markdown symbols like *, #, or ---.

Use this exact format:

Resume Score:
(Score out of 10)

Candidate Summary:
(Short summary)

Technical Skills:
(List skills)

Missing Skills:
(List missing skills)

Suitable Job Roles:
(List job roles)

Improvement Suggestions:
(Numbered suggestions)


Resume Content:

${resumeText}

`;




        // Gemini AI

       console.log("Sending request to Gemini...");

const result = await model.generateContent(prompt);

console.log("Gemini response received");

const analysis = result.response.text();

console.log("Analysis generated successfully");



        if (!analysis) {

            return res.status(500).json({

                message: "AI did not return analysis"

            });

        }




        // Save history only after successful AI response

        const savedHistory = new History({

            resumeName: file.originalname,

            analysisResult: analysis

        });



        await savedHistory.save();



        console.log("History saved successfully");



        res.status(200).json({

            message: "Resume analyzed successfully",

            analysis: analysis,

            historyId: savedHistory._id

        });



    }

    catch(error) {


        console.log("Resume Error:", error);



        // Gemini quota error

        if(error.status === 429){

            return res.status(429).json({

                message:
                "AI quota exceeded. Please try again later."

            });

        }



        // Gemini server overload

        if(error.status === 503){

            return res.status(503).json({

                message:
                "AI service is busy. Please try again after some time."

            });

        }




        res.status(500).json({

            message:error.message

        });


    }

});





// =================================
// Interview Preparation API
// =================================


router.post("/interview", async(req,res)=>{


    try{


        const {jobRole,skills}=req.body;



        if(!jobRole || !skills){

            return res.status(400).json({

                message:
                "Job role and skills are required"

            });

        }



        const prompt = `

You are a professional interviewer.

Job Role:
${jobRole}


Candidate Skills:
${skills}


Generate:

1. HR Questions

2. Technical Questions

3. Project Questions

4. Coding Questions

5. Interview Tips


`;



        const result = await model.generateContent(prompt);



        const response =
        result.response.text();



        res.status(200).json({

            interview:response

        });



    }

    catch(error){


        console.log("Interview Error:",error);



        if(error.status===429){

            return res.status(429).json({

                message:
                "AI quota exceeded. Try again later."

            });

        }



        res.status(500).json({

            message:error.message

        });


    }



});





module.exports = router;