import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import { useSelector } from "react-redux";
import { createContext, useState } from "react";


export const loginUser = createAsyncThunk("auth/loginUser", async(credentials, {dispatch}) => {
    const response = await axios.post("http://127.0.0.1:8000/auth/login/", credentials)
    const { access } = response.data;
    const username = credentials.username

    sessionStorage.setItem('token', access)
    sessionStorage.setItem('username', username)

    axios.defaults.headers.common['Authorization'] = `Bearer ${access}` 
    return {token:access, username:username}
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async()=>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem('username')
    return null;
});

const token = sessionStorage.getItem('token')


const authSlice = createSlice({
    name: "auth",
    initialState: { 
        token: token || null, 
        isAuthenticated: !!token,
    },
    reducers:{
        setAuthState(state, action){
            state.isAuthenticated = action.payload.isAuthenticated;
            state.token = action.payload.token;
            state.username = action.payload.username
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(loginUser.fulfilled,(state, action)=>{
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.username = action.payload.username
                localStorage.setItem("token", action.payload);
            })
            .addCase(logoutUser.fulfilled,(state)=>{
                state.token = null;
                state.isAuthenticated = false;
                localStorage.removeItem("token");
            })
    },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;