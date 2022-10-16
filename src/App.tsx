import axios from 'axios';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './Routes';


axios.defaults.baseURL="http://localhost:8080"

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
