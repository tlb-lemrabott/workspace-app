import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/home/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AccountBoard from './pages/account/AccountBoard';
import NoteBoard from './pages/notes/NoteBoard';
import EventBoard from './pages/event/EventBoard';
import ToCallBoard from './pages/to-call/ToCallBoard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        <NavBar />
        <main className="flex-grow container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<AccountBoard />} />
            <Route path="/notes" element={<NoteBoard />} />
            <Route path="/events" element={<EventBoard />} />
            <Route path="/tocall" element={<ToCallBoard />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;