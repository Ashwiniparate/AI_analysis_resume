import { useEffect, useState } from "react";
import { askGemini, getChatHistory } from "../services/aiService";
import axios from "axios";
import "./AIAssistant.css";


function AIAssistant(){

    const [question,setQuestion] = useState("");
    const [messages,setMessages] = useState([]);
    const [chatHistory,setChatHistory] = useState([]);
    const [loading,setLoading] = useState(false);



    

    const loadHistory = async()=>{

        try{

            const data = await getChatHistory();

            setChatHistory(data);

        }
        catch(error){

            console.log(error);

        }

    };



    useEffect(()=>{

        loadHistory();

    },[]);




   

    const openOldChat = (chat)=>{

        setMessages([

            {
                role:"user",
                text:chat.question
            },

            {
                role:"ai",
                text:chat.answer
            }

        ]);

    };





    

    const newChat = ()=>{

        setMessages([]);

        setQuestion("");

    };





    

    const handleAsk = async()=>{


        if(!question.trim()) return;


        const userText = question;



        setMessages((prev)=>[

            ...prev,

            {
                role:"user",
                text:userText
            }

        ]);



        setQuestion("");

        setLoading(true);



        try{


            const result = await askGemini(userText);



            setMessages((prev)=>[

                ...prev,

                {
                    role:"ai",
                    text:result
                }

            ]);



            loadHistory();


        }
        catch(error){

            console.log(error);

        }



        setLoading(false);

    };






   

    const deleteChat = async(id)=>{

        try{

            await axios.delete(
                `http://localhost:5000/api/ai/history/${id}`
            );


            loadHistory();


        }
        catch(error){

            console.log(error);

        }

    };






return(

<div className="chat-layout">





<div className="chat-main">



<div className="chat-header">

<h1>
🤖 AI Career Assistant
</h1>


<button onClick={newChat}>
➕ New Chat
</button>


</div>





<div className="chat-box">


{

messages.map((msg,index)=>(


<div

key={index}

className={
msg.role==="user"
?
"message user-message"
:
"message ai-message"
}

>

{msg.text}


</div>


))


}



{

loading &&

<div className="message ai-message">

AI is thinking...

</div>


}



</div>





<div className="input-area">


<input

value={question}

onChange={(e)=>setQuestion(e.target.value)}

onKeyDown={(e)=>{

if(e.key==="Enter")
handleAsk();

}}

placeholder="Ask about career, skills, resume..."

/>



<button onClick={handleAsk}>

Send

</button>



</div>



</div>










<div className="chat-history">


<h2>
Recent Chats
</h2>



{

chatHistory.map((chat)=>(


<div

key={chat._id}

className="history-item"

>


<span

onClick={()=>openOldChat(chat)}

>

{chat.question.substring(0,30)}

</span>




<button

onClick={()=>deleteChat(chat._id)}

>

🗑️

</button>



</div>


))


}



</div>



</div>

)

}


export default AIAssistant;