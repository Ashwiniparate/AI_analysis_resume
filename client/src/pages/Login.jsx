import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
   const navigate = useNavigate();

    const handleLogin = (e)=>{

    e.preventDefault();

    console.log(email,password);

    navigate("/");

};

    return(

        <div className="login-container">

            <h1>
                Login
            </h1>


            <form onSubmit={handleLogin}>


                <input

                type="email"

                placeholder="Enter email"

                value={email}

                onChange={(e)=>setEmail(e.target.value)}

                />


                <input

                type="password"

                placeholder="Enter password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

                />


                <button type="submit">
                    Login
                </button>


            </form>


        </div>

    );

}


export default Login;