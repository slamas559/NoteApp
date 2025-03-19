import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { use, useContext } from "react";
import { useSelector } from "react-redux";


export const createTodo = createAsyncThunk("todos/createTodo", async ({title, body, category}, {getState}) => {
    try{
        const token = sessionStorage.getItem('token')
        // const token = getState().auth.token;
        const response = await axios.post("http://127.0.0.1:8000/api/tasks/", 
        { title, body, category },
        {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`}
        });
        console.log("created To-do:", response.data)
        return response.data;
    }catch(error){
        console.error("Error creating To-do", error.response.data || error.message);
        throw error;
    }
})

const todoSlice = createSlice({
    name: "todos",
    initialState: {list:[], status:"idle", error:null},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createTodo.fulfilled, (state, action) => {
            state.list.push(action.payload);
        });
    },
});

export default todoSlice.reducer;