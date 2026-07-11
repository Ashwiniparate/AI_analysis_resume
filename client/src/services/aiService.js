import axios from "axios";


export const askGemini = async(prompt)=>{

const response = await axios.post(
"http://localhost:5000/api/ai/generate",
{
prompt:prompt
}
);

return response.data.answer;

};



export const getChatHistory = async()=>{

const response = await axios.get(
"http://localhost:5000/api/ai/history"
);


return response.data;

};