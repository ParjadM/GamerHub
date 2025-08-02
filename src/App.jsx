// src/App.jsx (Updated)

import React from 'react';
import GameList from './components/GameList';
import TopStreams from './components/TopStreams';
import Header from './components/header'; 
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      
      <div className="main-content">
        <div className="dashboard-container">
          <GameList />
          <TopStreams />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;