import axios from "axios";


export const analyzeResume = async(file)=>{

    try {

        const formData = new FormData();

        formData.append("resume", file);


        const response = await axios.post(
            "https://ai-resume-api-0x0a.onrender.com/api/resume/analyze",
            formData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
        );


        console.log("AI Response:", response.data);

        return response.data.analysis;


    } catch(error){

        console.log("API ERROR:", error.response?.data);
        console.log("STATUS:", error.response?.status);

        throw error;

    }

};