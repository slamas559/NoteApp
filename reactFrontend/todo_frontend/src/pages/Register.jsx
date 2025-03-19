import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Form.css'

function Register(){
    const [user, setUser] = useState({username:"", email:"", password:""})
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            await axios.post("http://127.0.0.1:8000/auth/register/", user);
            navigate("/login");
        }catch(error){
            console.error("Registration Failed", error);
        }
    }
    return(
        <div className="form">
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                <input type="text" placeholder="Username" onChange={(e)=>setUser(
                    {...user, username: e.target.value})}/>
                <input type="text" placeholder="Email" onChange={(e)=>setUser(
                    {...user, email: e.target.value})}/>
                <input type="password" placeholder="Password" onChange={(e)=>setUser(
                    {...user, password: e.target.value})}/>
                <button type="submit">Register</button>
                <p>You already have an account sign in <Link to="/login">Here</Link></p>
            </form>
        </div>
    )
}

export default Register;