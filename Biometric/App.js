import React, {Component, useRef, useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
//import {loadlogs} from './Utilis/web3tools.js'
import Home from './components/Home/Home'
import Main from './components/main.js'
import Register from './components/register.js'
import Footer from './components/Footer'
import Navbar from './components/Navbar.js'

function App() {

  const [state, setstate] = useState('Register New Student');
  const [mainpage, setmainpage] = useState('appmain');
  const [registerpage, setregisterpage] = useState('registermain-inactive');

  const handleclick = () =>{
   if(state == "Register New Student"){
    setstate("Home Page")
    setmainpage('appmain-inactive')
    setregisterpage('registermain')
   }else{
    setstate("Register New Student")
    setmainpage('appmain')
    setregisterpage('registermain-inactive')
   }
  }

  /*const getlogs = () =>{
   console.log(result)
  }.then(async response ={
    let result = await loadlogs("bc3191")
    console.log(result)
  });*/

  return (
    <div className="App">
      <Navbar/>
      <div className="registerbutton">
      <button className="rbtn" onClick={handleclick}>{state}</button>
      </div>
      <div className="logsbutton">
      <button className="lbtn">Logs</button>
      </div>
      <div className={mainpage}>
      <Main/>
      </div>
      <div className={registerpage}>
      <Register/>
      </div>
    </div>
  );
}

export default App;
