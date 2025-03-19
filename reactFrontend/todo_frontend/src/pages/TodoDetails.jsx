import axios from "axios";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { FormatDate } from "../FormatDate";
import './TodoDetails.css'

function TodoDetails(){

    const [details, setDetails] = useState({}) 
    const {id} = useParams();
    const token = sessionStorage.getItem("token")


    useEffect (()=>{
        try{
            axios.get(`http://localhost:8000/api/tasks/${id}/`,{
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }).then(result=>{
                setDetails(result.data)
            }) 
        }catch(err){
            console.log(err)
        }
      },[])

    return(
        <div className="details">
            <div className="center-details">
                <h2>{details.title}</h2>
                <Link to={`/edit/${id}`} className="edit">Edit</Link>
                <Link to={`/delete/${id}`} className="delete">Delete</Link>
                <p className="time">Created on: {FormatDate(String(details.time))}</p>
                <pre className="body"><code>{details.body}</code></pre>
            </div>
        </div>
    )
}

export default TodoDetails