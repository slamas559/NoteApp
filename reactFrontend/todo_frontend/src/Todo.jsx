import { FormatDate } from "./FormatDate"

function Todo({title, body, category, time}){

    const formatBody = `${body.split(" ").slice(0, 10).join(" ")}...`
    const color = category == 'Personal'? "purple": category == 'Casual'? "blue": category == 'Regular'? "green": category == "Important"? "red": null
    
    return(
        <div className="card">
            <img src="src/assets/pin.png" alt="pin"/>
            <div className="card-words">
                <h3><span style={{color:color}}></span>{title}</h3>
                <p className="time">{FormatDate(String(time))}</p>
                <p className="body">{formatBody}</p>
            </div>
            <div className="card-category">
                <p style={{color:color}}>{category}</p>
            </div>
        </div>
    )
}

export default Todo