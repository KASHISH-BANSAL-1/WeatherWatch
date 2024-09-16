// src/App.js
import React, { useState } from 'react';
import {   Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import Weather from './components/Weather';

const App = () => {

  return (
  
      <Routes>
        <Route path="/" element={<Search/>} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
  );
};

export default App;
