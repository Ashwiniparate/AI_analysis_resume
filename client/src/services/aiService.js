import axios from "axios";


export const askGemini = async(prompt)=>{

const response = await axios.post(
"https://ai-resume-api-0x0a.onrender.com/api/ai/generate",
{
prompt:prompt
}
);

return response.data.answer;

};



export const getChatHistory = async()=>{

const response = await axios.get(
"https://ai-resume-api-0x0a.onrender.com/api/ai/history"
);


return response.data;

};