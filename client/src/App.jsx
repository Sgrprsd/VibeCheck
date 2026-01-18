import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
        <BrowserRouter>
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-2xl mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
        </div>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App;
