const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const Resume = require("../models/Resume");


const analyzeResume = async (req, res) => {

    try {

        const { resumeId } = req.body;


        const resume = await Resume.findById(resumeId);


        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }


        let text = "";


       
        if (resume.fileName.endsWith(".pdf")) {

            const dataBuffer = fs.readFileSync(resume.filePath);

            const data = await pdf(dataBuffer);

            text = data.text;

        }


        else if (resume.fileName.endsWith(".docx")) {

            const result = await mammoth.extractRawText({
                path: resume.filePath
            });

            text = result.value;

        }


        resume.resumeText = text;

        await resume.save();


        res.json({

            message: "Resume text extracted successfully",

            text: text

        });


    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    analyzeResume
};