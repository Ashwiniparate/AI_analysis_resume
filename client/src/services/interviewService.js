import axios from "axios";


export const generateInterviewQuestions = async (jobRole, skills) => {

    const response = await axios.post(
        "http://localhost:5000/api/resume/interview",
        {
            jobRole: jobRole,
            skills: skills
        }
    );

    return response.data.interview;
};