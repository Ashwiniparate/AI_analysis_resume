const express = require("express");
const router = express.Router();

const multer = require("multer");
const { PDFParse } = require("pdf-parse");

const model = require("../config/gemini");

const History = require("../models/History");



// Multer configuration

const upload = multer({

    storage: multer.memoryStorage()

});





// ===============================
// Clean Gemini Response
// ===============================


function cleanAIResponse(text) {


   function cleanAIResponse(text) {

    return text
        // Remove markdown symbols
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/---/g, "")

        // Remove "Here's an analysis..." line
        .replace(/^Here's an analysis.*?:/i, "")

        // Add spacing before sections
        .replace(/Resume Score:/gi, "\n\nRESUME SCORE:\n")
        .replace(/Technical Skills:/gi, "\n\nTECHNICAL SKILLS:\n")
        .replace(/Missing Skills:/gi, "\n\nMISSING SKILLS:\n")
        .replace(/Suitable Job Roles:/gi, "\n\nSUITABLE JOB ROLES:\n")
        .replace(/Improvement Suggestions:/gi, "\n\nIMPROVEMENT SUGGESTIONS:\n")

        // Convert bold section names
        .replace(/Languages:/gi, "\n\nLanguages:\n")
        .replace(/Frameworks\/Libraries:/gi, "\n\nFrameworks/Libraries:\n")
        .replace(/Tools\/Concepts:/gi, "\n\nTools/Concepts:\n")
        .replace(/Databases:/gi, "\n\nDatabases:\n")

        // Convert bullet points
        .replace(/^\s*[-•*]\s*/gm, "• ")

        // Fix numbered lists spacing
        .replace(/(\d+\.)/g, "\n$1")

        // Remove multiple blank spaces
        .replace(/\n\s*\n\s*\n+/g, "\n\n")

        .trim();

}

}





// =================================
// Resume Analyze API
// =================================


router.post(
    "/analyze",
    upload.single("resume"),
    async (req, res) => {


    try {


        const file = req.file;



        if (!file) {


            return res.status(400).json({

                message: "No resume uploaded"

            });


        }





        // Extract text from PDF


        const parser = new PDFParse({

            data:file.buffer

        });



        const pdfData = await parser.getText();



        const resumeText = pdfData.text;







        const prompt = `


You are a professional Resume Analyzer.


Analyze the given resume.


IMPORTANT RULES:

- Return plain text only.
- Do not use Markdown.
- Do not use symbols like *, **, #.
- Use simple headings.
- Use bullet points using •.
- Keep the format clean and professional.



Use this format:



RESUME SCORE:

Give score out of 10 with explanation.



TECHNICAL SKILLS:

List technical skills.



MISSING SKILLS:

List skills that should be improved.



SUITABLE JOB ROLES:

List recommended roles.



IMPROVEMENT SUGGESTIONS:

Give numbered suggestions.



Resume Content:

${resumeText}



`;







        // Gemini Generate


        const result = await model.generateContent(prompt);



        let analysis = result.response.text();



        // Clean AI response


        analysis = cleanAIResponse(analysis);







        // Save in MongoDB


        const savedHistory = new History({

            resumeName:file.originalname,

            analysisResult:analysis

        });



        await savedHistory.save();



        console.log("History saved successfully");







        res.status(200).json({

            message:"Resume analyzed successfully",

            analysis:analysis,

            historyId:savedHistory._id

        });






    }

    catch(error){



        console.log("Resume Error:",error);



        res.status(500).json({

            message:error.message

        });


    }


});











// =================================
// Interview Preparation API
// =================================


router.post(
"/interview",
async(req,res)=>{


    try{


        const {
            jobRole,
            skills
        } = req.body;





        if(!jobRole || !skills){


            return res.status(400).json({

                message:
                "Job role and skills are required"

            });


        }







        const prompt = `


You are a professional technical interviewer.


Generate interview preparation.



Job Role:

${jobRole}



Candidate Skills:

${skills}



IMPORTANT:

Return plain text only.

Do not use *, **, #.

Use clean headings and bullet points.



Format:



HR QUESTIONS:

TECHNICAL QUESTIONS:

PROJECT QUESTIONS:

CODING QUESTIONS:

INTERVIEW TIPS:



`;







        const result = await model.generateContent(prompt);



        let response =
        result.response.text();




        response = cleanAIResponse(response);







        res.status(200).json({

            interview:response

        });







    }
    catch(error){


        console.log(
            "Interview Error:",
            error
        );



        res.status(500).json({

            message:error.message

        });


    }



});






module.exports = router;