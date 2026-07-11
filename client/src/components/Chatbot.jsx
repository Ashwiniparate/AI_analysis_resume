import { useEffect, useState } from "react";
import axios from "axios";
import "./Chatbot.css";


function Chatbot(){

    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);
    const [chatHistory,setChatHistory] = useState([]);
    const [loading,setLoading] = useState(false);



    const loadChatHistory = async()=>{

        try{

            const response = await axios.get(
                "http://localhost:5000/api/ai/history"
            );


            setChatHistory(response.data);


        }
        catch(error){

            console.log(error);

        }

    };



    useEffect(()=>{

        loadChatHistory();

    },[]);





   

    const sendMessage = async()=>{


        if(!message.trim()) return;


        const userText = message;


        setMessages((prev)=>[
            ...prev,
            {
                role:"user",
                text:userText
            }
        ]);



        setMessage("");

        setLoading(true);



        try{


            const response = await axios.post(

                "http://localhost:5000/api/ai/generate",

                {
                    prompt:userText
                }

            );



            setMessages((prev)=>[
                ...prev,
                {
                    role:"ai",
                    text:response.data.answer
                }
            ]);



            

            loadChatHistory();



        }
        catch(error){

            console.log(error);


        }


        setLoading(false);


    };

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



return(

<div className="chat-layout">



    <div className="chat-main">


        <div className="chat-container">


            <h1>
                🤖 AI Career Assistant
            </h1>



            <div className="chat-box">


            {
                messages.map((msg,index)=>(

                    <div
                    key={index}
                    className={
                        msg.role==="user"
                        ?"user-message"
                        :"ai-message"
                    }
                    >

                    {msg.text}

                    </div>

                ))
            }



            {
                loading &&
                <div className="ai-message">
                    AI is thinking...
                </div>
            }


            </div>




            <div className="input-area">


                <input

                value={message}

                onChange={(e)=>setMessage(e.target.value)}

                onKeyDown={(e)=>{

                    if(e.key==="Enter")
                    {
                        sendMessage();
                    }

                }}

                placeholder="Ask about career, skills, resume..."

                />



                <button onClick={sendMessage}>
                    Send
                </button>



            </div>



        </div>


    </div>





  

    <div className="chat-history">


        <h2>
            Recent Chats
        </h2>



       {
chatHistory.map((chat)=>(

<div 
className="history-item"
key={chat._id}

onClick={()=>openOldChat(chat)}

>

{chat.question}

</div>

))
}



    </div>



</div>


)


}


export default Chatbot;