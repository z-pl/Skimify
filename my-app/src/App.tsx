import React from 'react';
import './App.css';
import { Navbar } from './Components/Navbar';
import {Routes, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

function App() {
    return (

        <Routes>
            <Route path={"/"} element ={<Home/>} />
            <Route path={"/login"} element ={<Login/>} />
            <Route path={"/create-account"} element ={<CreateAccount/>} />


        </Routes>





    );
}

export default App;