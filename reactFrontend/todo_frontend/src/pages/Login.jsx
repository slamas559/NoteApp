import { useState } from "react";
import { useDispatch } from "react-redux"
import axios from "axios";
import { Link } from "react-router-dom";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import './Form.css'

function Login({setInLogin}){
    const [credentials, setCredentials] = useState({username:"", password:""})
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            await dispatch(loginUser(credentials)).unwrap();
            navigate("/");
        }catch(error) {
            console.error("Login Failed:", error);
        }
    };

    return(
        <div className="form">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input type="text" placeholder="Username" onChange={(e)=>setCredentials(
                    {...credentials, username: e.target.value})}/>
                <input type="password" placeholder="Password" onChange={(e)=>setCredentials(
                    {...credentials, password: e.target.value})}/>
                <button type="submit">Login</button>
                <p>You don't have an account register <Link to="/register">Here</Link></p>
            </form>
        </div>
    )
}

export default Login