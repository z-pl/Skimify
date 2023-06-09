import React, { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './Components/Navbar';
import {Routes} from "react-router-dom";
import { MainBody } from './Components/MainBody';
import { Graph } from './Components/Canvas/Graph';
import {CanvasGrid} from './Components/CanvasGrid';
import { observer } from "mobx-react-lite";
import canvasStore from './mobx/stores/CanvasStore';


import axios from 'axios';
import TokenStore from './mobx/stores/TokenStore';
const Home = observer(() =>  {
    function handleClikc(event) {
      console.log(event)

      async function getRand() {
        const res = await axios.post("https://api.skimify.ai/users", {
        }, {
          headers: {
            Authorization: 'Bearer ' + TokenStore.getToken()
          }
        }
      );
        console.log(res)
      }

      getRand()

    }
    return (
        <div className="home">
            <div className="App flex flex-col gap-10">
            {/* <button onClick={handleClikc}>test</button> */}
             <Navbar></Navbar>
             <MainBody></MainBody>
              {canvasStore.showCanvas && <CanvasGrid />}
          </div>
        </div>
    );
})

export default Home;
