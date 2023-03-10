import React from 'react';
import './App.css';
import { Navbar } from './Components/Navbar';
import {Routes} from "react-router-dom";
import { MainBody } from './Components/MainBody';
function Home() {
    return (

        <div className="Home">
            <div className="App flex flex-col gap-20">
             <Navbar></Navbar>
             <MainBody></MainBody>
          </div>
        </div>





    );
}

export default Home;
