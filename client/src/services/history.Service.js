import axios from "axios";


export const getHistory = async () => {

    const response = await axios.get(
        "https://ai-resume-api-0x0a.onrender.com/api/history"
    );

    return response.data;

};