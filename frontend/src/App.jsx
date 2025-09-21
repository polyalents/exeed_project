// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ModalProvider } from './context/ModalContext';

function App() {
  return (
    <Router>
      <ModalProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </ModalProvider>
    </Router>
  );
}

export default App;
