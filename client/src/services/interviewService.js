import axios from "axios";


export const generateInterviewQuestions = async (jobRole, skills) => {

    const response = await axios.post(
        "https://ai-resume-api-0x0a.onrender.com/api/resume/interview",
        {
            jobRole: jobRole,
            skills: skills
        }
    );

    return response.data.interview;
};