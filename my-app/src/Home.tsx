import React, { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './Components/Navbar';
import {Routes} from "react-router-dom";
import { MainBody } from './Components/MainBody';
import { getSummaryResponse } from './apis/TextAPI';
function Home() {
    const [ires, setIres] = useState("");

    useEffect(() => {

      getSummaryResponse();

    }, [])
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
