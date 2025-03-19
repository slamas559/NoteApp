import { useState} from "react"
import axios from "axios";
import './CreateTodo.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTodo } from "../store/todoSlice";

function CreateTodo({onAddTodo}){

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("Personal");
    const selection = ["Personal", "Casual", "Important", "Regular"]
    let navigate = useNavigate();
    const dispatch = useDispatch();
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (title.trim() && body.trim() && category.trim()){
            dispatch(createTodo({title, body, category}));
            setTitle("")
            setBody("")
            setCategory("Personal")
            navigate('/')
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
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}

export default CreateTodo