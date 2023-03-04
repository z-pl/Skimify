import React from 'react';
import './App.css';
import { MainBody } from './Components/MainBody';
import { Navbar } from './Components/Navbar';

function App() {
  return (
    <div className="App flex flex-col gap-20">
      <Navbar></Navbar>
      <MainBody></MainBody>
    </div>
  );
}

export default App;
