import { NavItems } from "./NavItems";
import React, { useState, useRef, useEffect } from "react";
import canvasStore from "../mobx/stores/CanvasStore";


const logo1 =  require("../images/logo4.png");
const logo0 =  require("../images/logo2.png");


export function Navbar() {


  return (

    <nav className="flex justify-between content-end p-4">
      <div className= "flex gap-2 w-100 items-center">
        <img className="hidden sm:block logo0-img" src={logo0} alt="" />
        <img className="logo1-img" src={logo1} alt="" />
      </div>
      <NavItems></NavItems>
    </nav>
  )
}
