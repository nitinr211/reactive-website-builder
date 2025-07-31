// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const rootElement = document.getElementById('root');

ReactDOM.render(
  // <BrowserRouter basename="/digicraft">
  <BrowserRouter basename="/tool">
    <App />
  </BrowserRouter>,
  rootElement
);
