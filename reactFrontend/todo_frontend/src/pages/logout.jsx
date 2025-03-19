import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutUser()).then(() => {
            navigate("/login", {replace: true});
        });
        }, [dispatch, navigate]);

        return <p>Logging out...</p>
}

export default Logout