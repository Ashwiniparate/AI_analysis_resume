import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import History from "./pages/History";
import AIAssistant from "./components/AIAssistant";


function App(){

return(

<BrowserRouter>

<Routes>

<Route
    path="/login"
    element={<Login/>}
/>

<Route 
path="/" 
element={<Dashboard/>}
/>


<Route 
path="/resume" 
element={<ResumeAnalyzer/>}
/>


<Route
path="/history"
element={<History/>}
/>


<Route
path="/chatbot"
element={<AIAssistant/>}
/>


</Routes>

</BrowserRouter>

)

}


export default App;