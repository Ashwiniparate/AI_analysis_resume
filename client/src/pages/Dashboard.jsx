import { useNavigate } from "react-router-dom";
import "./Dashboard.css";


function Dashboard(){

    const navigate = useNavigate();


    return (

        <div className="dashboard-container">


            <h1>
                🤖 AI Resume Analyzer
            </h1>


            <div className="dashboard-cards">


                <div className="dashboard-card">

                    <h2>
                        📄 Upload Resume
                    </h2>

                    <p>
                        Upload your resume and get AI analysis.
                    </p>


                    <button
                    onClick={()=>navigate("/resume")}
                    >
                        Upload Resume
                    </button>


                </div>



                <div className="dashboard-card">

                    <h2>
                        🕒 Resume History
                    </h2>


                    <p>
                        View your previous resume analysis.
                    </p>


                    <button
                    onClick={()=>navigate("/history")}
                    >
                        View History
                    </button>


                </div>



                <div className="dashboard-card">

                    <h2>
                        💬 AI Interview Chatbot
                    </h2>


                    <p>
                        Generate interview questions.
                    </p>


                    <button
                    onClick={()=>navigate("/chatbot")}
                    >
                        Open Chatbot
                    </button>


                </div>


            </div>


        </div>

    )

}


export default Dashboard;