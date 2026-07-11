import { useState } from "react";
import { analyzeResume } from "../services/resumeService";
import { generateInterviewQuestions } from "../services/interviewService";
import "./ResumeAnalyzer.css";


function ResumeAnalyzer() {

    const [file, setFile] = useState(null);

    const [result, setResult] = useState("");

    const [loading, setLoading] = useState(false);

    const [questions, setQuestions] = useState("");

    const [questionLoading, setQuestionLoading] = useState(false);



    
    const handleUpload = async () => {

        if (!file) {
            alert("Please select resume PDF");
            return;
        }


        try {

            setLoading(true);


            const analysisResponse = await analyzeResume(file);


            setResult(analysisResponse);


        } catch (error) {

            console.log(error);

            alert("Resume analysis failed");

        }
        finally {

            setLoading(false);

        }

    };




    
  const handleInterview = async () => {

    try {

        setQuestionLoading(true);


        const questionResponse = await generateInterviewQuestions(
            "Frontend Developer",
            result
        );


        setQuestions(questionResponse);


    } catch (error) {

        console.log(error);

        alert("Failed to generate interview questions");

    }
    finally {

        setQuestionLoading(false);

    }

};



    return (

        <div className="resume-container">


            <h1>
                📄 AI Resume Analyzer
            </h1>



            <input

                type="file"

                accept="application/pdf"

                onChange={(e) => setFile(e.target.files[0])}

            />



            <button onClick={handleUpload}>
                Analyze Resume
            </button>




            {
                loading &&

                <h3>
                    🤖 AI is analyzing your resume...
                </h3>

            }




            {
                result &&

                <div className="result">


                    <h2>
                        Resume Analysis
                    </h2>


                    <div className="analysis-text">

                        {
                            result.split("\n").map((line, index) => (

                                line.startsWith("*") ?

                                <li key={index}>
                                    {line.replace("*","")}
                                </li>

                                :

                                <p key={index}>
                                    {line.replace(/\*\*/g,"")}
                                </p>

                            ))
                        }


                    </div>


                    <button onClick={handleInterview}>

                        Generate Interview Questions

                    </button>


                </div>

            }






            {
                questionLoading &&

                <h3>
                    🤖 Generating interview questions...
                </h3>

            }




            {
                questions &&

                <div className="result">


                    <h2>
                        🎯 AI Interview Questions
                    </h2>


                    <div className="analysis-text">

                        {
                            questions.split("\n").map((line,index)=>(

                                line.startsWith("*") ?

                                <li key={index}>
                                    {line.replace("*","")}
                                </li>

                                :

                                <p key={index}>
                                    {line.replace(/\*\*/g,"")}
                                </p>


                            ))
                        }

                    </div>


                </div>

            }



        </div>

    );

}


export default ResumeAnalyzer;