import React, { useEffect } from 'react';
import './App.css';
import { MainBody } from './Components/MainBody';
import { Navbar } from './Components/Navbar';
import {Routes, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import canvasStore from './mobx/stores/CanvasStore';

function App() {

    useEffect(() => {
      const hasVisited = localStorage.getItem('visited')

      if (hasVisited) {
        canvasStore.setFirstTimeVisit(false);
      }
      else {
        canvasStore.setFirstTimeVisit(true);
        localStorage.setItem('visited', "true")
      }

    }, [])
    return (

        <Routes>
            <Route path={"/"} element ={<Home/>} />
            <Route path={"/login"} element ={<Login/>} />
            <Route path={"/create-account"} element ={<CreateAccount/>} />
            <Route path={"*"} element ={<Home/>} />

        </Routes>

    );

}
export default App;
