import React, { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './Components/Navbar';
import {Routes} from "react-router-dom";
import { MainBody } from './Components/MainBody';
import { Graph } from './Components/Canvas/Graph';
import ReactFlowWrapper from './Components/Canvas/GraphForce';

import { getSummary } from './apis/TextAPI';

function Home() {
    return (
        <div className="Home">
            <div className="App flex flex-col gap-20">
             <Navbar></Navbar>
             <MainBody></MainBody>
             <div className=' h-screen m-4 border border-black'>
              <ReactFlowWrapper />
             </div>
          </div>
        </div>
    );
}

export default Home;
