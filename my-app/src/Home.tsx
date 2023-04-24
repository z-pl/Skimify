import React, { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './Components/Navbar';
import {Routes} from "react-router-dom";
import { MainBody } from './Components/MainBody';
import { Graph } from './Components/Canvas/Graph';
import {CanvasGrid} from './Components/CanvasGrid';
function Home() {

    return (
        <div className="Home">
            <div className="App flex flex-col gap-20">
             <Navbar></Navbar>
             <MainBody></MainBody>
              <CanvasGrid />
          </div>
        </div>
    );
}

export default Home;
