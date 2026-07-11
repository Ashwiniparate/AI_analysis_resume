import axios from "axios";


export const analyzeResume = async(file)=>{

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


    return response.data.analysis;

};