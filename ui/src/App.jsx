import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Accounts from './components/Accounts';
import Notes from './components/Notes';
import Users from './components/Users';
import Events from './components/Events';
import ToCall from './components/ToCall';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        <NavBar />
        <main className="flex-grow container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/users" element={<Users />} />
            <Route path="/events" element={<Events />} />
            <Route path="/tocall" element={<ToCall />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
