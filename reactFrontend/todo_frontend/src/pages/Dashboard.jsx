import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../store/todoSlice";
import Card from "../Card";
import CreateTodo from "./CreateTodo";
import axios from "axios";

const DashBoard = ()=>{
    const dispatch = useDispatch();
    const status = useSelector((state) => state.todos?.status);
    const error = useSelector((state) => state.todos?.error);
    const [todos, setTodos] = useState([])
    const token = sessionStorage.getItem("token")

    const fetchTodo = async() =>{
        try{
            const response = await axios("http://127.0.0.1:8000/api/tasks/", {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`},
            });
            // console.log(response.data)
            setTodos(response.data);
        }catch(error){
            console.error("Not able to fetch", error.response.data || error.message);
            throw error;
        }
    };

    
    useEffect(()=>{
        if (token){
            fetchTodo();
        }
    });


    return(
        <div>
            {todos.length > 0 ? 
                (<Card todos={todos}/>
            ):(
                <p className="no-note">No Note Found!!!😯</p>
            )}
        </div>
    )
}

export default DashBoard