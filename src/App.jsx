// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserPage from './components/UserPage';
import Winnerpage from './components/Winnerpage';
import SearchWinner from './components/Searchwinner';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/User-page" element={<UserPage />} />
        <Route path="/Winner" element={<Winnerpage/>}/>
        <Route path='/SearchWinner' element={<SearchWinner/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
