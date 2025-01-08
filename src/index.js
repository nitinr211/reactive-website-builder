// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import MainRouter from './Router'; // Import your Router component if needed
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root');

// Wrap the App component with BrowserRouter to enable routing
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    rootElement
);
