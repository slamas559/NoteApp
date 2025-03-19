import { useState, useEffect } from "react"
import axios from "axios";
import './CreateTodo.css'
import { useNavigate, useParams } from "react-router-dom";

function TodoEdit(){

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("Personal");
    const selection = ["Personal", "Casual", "Important", "Regular"]
    const {id} = useParams()
    const navigate = useNavigate(); 
    const token = sessionStorage.getItem("token")



    useEffect (()=>{
        axios.get(`http://localhost:8000/api/tasks/${id}/`,{
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(result=>{
            setTitle(result.data.title)
            setBody(result.data.body)
            setCategory(result.data.category)
        })       
      },[])

    const handleSubmit = async (event)=>{
        event.preventDefault();
        try{
        if(title && body && category){
            const response = await axios.put(`http://localhost:8000/api/tasks/${id}/`,
            {title, body, category},
            {headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`}}
        )
            setTitle("")
            setBody("")
            setCategory("")
            setCategory("Personal")
            navigate(`/detail/${id}`,{replace:true});
        }
        }
        catch(error) {
            console.error("Submission Error", error)
          }

    }
    return(
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Title:
                    <input type="text" placeholder="Enter Todo's Title..." value={title} onChange={(e) => setTitle(e.target.value)}/>
                </label>
                <br />
                <label htmlFor="">Body:
                    <textarea value={body} placeholder="Enter Todo's Content..." onChange={(e) => setBody(e.target.value)}></textarea>
                </label>
                <br />
                <label htmlFor="">Category:
                    <select onChange={(e) => setCategory(e.target.value)} >
                        {selection.map(selected => (
                            <option key={selected}>{selected}</option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="submit">Update Todo</button>
            </form>
        </div>
    )
}


export default TodoEdit