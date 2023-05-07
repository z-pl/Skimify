import { NavItems } from "./NavItems";
import React, { useState, useRef, useEffect } from "react";
import canvasStore from "../mobx/stores/CanvasStore";


const logo1 =  require("../images/logo1.png");
const logo0 =  require("../images/logo0.png");


export function Navbar() {


  return (
    
    <nav className="flex justify-between content-end p-4 bg-white">
      <div className= "flex gap-2 w-100">
        <img className="logo0-img" src={logo0} alt="" />
        <img className="logo1-img" src={logo1} alt="" />
        {/* <img className="main-logo" src={logo} alt="" /> */}
      </div>
      <NavItems></NavItems>
    </nav>
  )
}
