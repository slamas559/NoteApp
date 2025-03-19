import { useState, useEffect } from 'react'
import axios from 'axios'
import Todo from './Todo'
import './App.css'
import ReactDom from 'react-dom/client'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import CreateTodo from './pages/CreateTodo'
import Navbar from './pages/Navbar'
import Home from './pages/HomePage'
import TodoDetails from './pages/TodoDetails'
import TodoEdit from './pages/TodoEdit'
import TodoDelete from './pages/TodoDelete'
import Login from './pages/Login'
import Register from './pages/Register'
import DashBoard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import Logout from './pages/logout'

function App() {

  const [inLogin, setInLogin] = useState(false);

  return (
    <div> 
      <BrowserRouter>
      <Navbar setInLogin={setInLogin} inLogin={inLogin}/>
        <Routes>
          <Route>
            <Route path="/login" element={<Login setInLogin={setInLogin} inLogin={inLogin}/>}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<DashBoard />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="create" element={<CreateTodo />}></Route>
            <Route path="detail/:id" element={<TodoDetails />}></Route>
            <Route path="edit/:id" element={<TodoEdit />}></Route>
            <Route path="delete/:id" element={<TodoDelete />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Route index element={<Home />}></Route>
      */}
    </div>
  )
  
}

export default App
