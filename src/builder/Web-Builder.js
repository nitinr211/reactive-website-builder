import React,{Component, useState} from 'react';
import {Rnd} from 'react-rnd';
import axios from 'axios';

import g from 'react-scale-text';
import FrameList from './FrameList'
import TextList from './TextList'
import ImageList from './ImageList'
import ObjectList from './ObjectList'
import Blocks from './blocks/blocks'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HeroSection from './components/HeroSection.js';
import Blocks from './blocks/blocks'
import SideNav from './menu/SideNav.js';
import './App.css';

import MainMenu from './menu/MainMenu';

//store.setState("user", {name: "Yezy", age: 25});




//import ItemList from './components/ItemList.js';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var mysql = require('mysql');





class WebBuilder extends React.Component{

 
  
  render(){
  return <div>
  <TextList/>
  <FrameList/>
  <ImageList/>
  <SvgList/>
  <ObjectList/>
  <div className="App">
      <SideNav/>
      <div className="app-container">
      

       <nav class="navbar">
    <div class="logo">MyLogo</div>
    <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
    <div class="burger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    </div>
</nav>


 
    <ImageList/>
      </div>
    </div>
  </div>
  }
}



  
 

  export default WebBuilder;
