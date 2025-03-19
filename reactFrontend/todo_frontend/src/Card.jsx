import { Link } from "react-router-dom"
import Todo from "./Todo"

function Card({todos}){
    return(
        <div>
            <div className="todo-body">
                {todos.map((todo, index)=> (
                <Link key={todo.id} style={{textDecoration:"none", color:"black"}} to={`/detail/${todo.id}`}>
                    <Todo key={todo.id}
                            title={todo.title}
                            body={todo.body}
                            category={todo.category}
                            time={todo.time}
                            />
                </Link>
                ))}
            </div>
        </div>
    )
}

export default Card