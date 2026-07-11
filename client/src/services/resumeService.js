import axios from "axios";


export const analyzeResume = async(file)=>{

    const formData = new FormData();

    formData.append("resume", file);


    const response = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );


    return response.data.analysis;

};