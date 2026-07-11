import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar(){

return(

<nav>

<h2>
AI Career Assistant
</h2>


<div>

<Link to="/">
Dashboard
</Link>


<Link to="/resume">
Resume Analyzer
</Link>


<Link to="/history">
History
</Link>


</div>


</nav>

)

}

export default Navbar;