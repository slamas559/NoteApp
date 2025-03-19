import { Outlet, Link, useNavigate } from "react-router-dom"
import  { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice"


function Navbar({setInLogin, inLogin}){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
    const username = sessionStorage.getItem('username');

    const handleLogout = ()=>{
        dispatch(logoutUser());
        navigate("/login")
        setInLogin(true)
    }

    const addTodo =()=>{
        navigate("/create")
    }

    return(
        <nav className="navbar">
            <div className="header">
                <Link to='/' style={{color:"black", textDecoration:"none"}}><h2>Note Keeper</h2></Link>
                <span>Welcome, {username}</span>
                {isAuthenticated ? (
                    <div>
                        <button onClick={handleLogout} className="btn-del">Logout</button>
                        <button onClick={addTodo} className="btn-add">Add Todo</button>
                    </div>
                ):(
                    <div>
                        {!inLogin ? (
                        <button onClick={handleLogout} className="btn-add">Login</button>):
                        (<div></div>)}
                    </div>
                )}
            </div>
            <Outlet/>
        </nav>
    )
}

export default Navbar