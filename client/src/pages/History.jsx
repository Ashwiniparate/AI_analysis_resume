import { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";


function History(){


const [history,setHistory] = useState([]);



const getHistory = async()=>{

    try{

        const response = await axios.get(
            "http://:5000/api/history"
        );

        setHistory(response.data);

    }
    catch(error){

        console.log(error);

    }

};



useEffect(()=>{

    getHistory();

},[]);







const downloadAnalysis = (item)=>{

    const file = new Blob(
        [item.analysis],
        {
            type:"text/plain"
        }
    );


    const url = URL.createObjectURL(file);


    const link = document.createElement("a");

    link.href = url;

    link.download = item.fileName + "_Analysis.txt";


    link.click();

};







const deleteHistory = async(id)=>{


    const confirmDelete = window.confirm(
        "Are you sure you want to delete this history?"
    );


    if(!confirmDelete) return;



    try{


        await axios.delete(
            `https://ai-resume-api-0x0a.onrender.com/api/history/${id}`
        );



       

        setHistory(
            history.filter(
                (item)=> item._id !== id
            )
        );


    }
    catch(error){

        console.log(error);

    }


};






return(


<div className="history-container">


<h1>
📄 Resume History
</h1>



{

history.length===0 ?

<h3>
No History Found
</h3>


:


history.map((item)=>(



<div 
className="history-card"
key={item._id}
>



<h2>
📄 {item.fileName}
</h2>



<p>

Date: {new Date(item.createdAt)
.toLocaleString()}

</p>




<button
onClick={()=>downloadAnalysis(item)}
>

⬇ Download Analysis

</button>





<button
onClick={()=>deleteHistory(item._id)}
>

🗑 Delete

</button>





<h3>
Analysis:
</h3>



<pre>

{item.analysis}

</pre>




</div>


))


}



</div>


)


}


export default History;