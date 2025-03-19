import { useNavigate, useParams } from 'react-router-dom';
import './TodoDetails.css'
import axios from 'axios';

function TodoDelete(){
    const {id} = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token")


    const handleDelete = async (event)=>{
        event.preventDefault();
        try{
            await axios.delete(`http://localhost:8000/api/tasks/${id}/`,{
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }}
            )
            navigate('/',{replace:true});
        }
        catch(error) {
            console.error("Submission Error", error)
          }

    }

    const cancelDelete = async (event)=>{
        navigate('/',{replace:true});
        }
    
    return(
    <div className="details">
        <div className="center-details">
            <h1>Are you sure you want to delete this?</h1>
            <button onClick={handleDelete} className="edit">Yes</button>
            <button onClick={cancelDelete} className="delete">No</button>
        </div>
    </div>
    )
}
export default TodoDelete