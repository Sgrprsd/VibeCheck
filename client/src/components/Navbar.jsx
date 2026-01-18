import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusSquare, LogOut } from 'lucide-react';
import CreateRecModal from './CreateRecModal';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Notify user on login (Simple MVP Alert)
    // In a real app, use a Toast library like 'sonner'
    useEffect(() => {
        if (user) {
            // console.log("Welcome back", user.username);
        }
    }, [user]);

    // Simple callback to refresh feed would ideally be via Context or Global State.
    // For now, we'll just close the modal.
    const handleRecCreated = () => {
        window.location.reload(); // Simple brute force refresh for MVP
    };
    
    const handleLogout = async () => {
         window.location.href = 'http://localhost:5000/api/logout';
    };

    return (
        <>
            <nav className="border-b border-gray-100 py-4 mb-8 sticky top-0 bg-white/80 backdrop-blur-md z-40">
                <div className="max-w-2xl mx-auto px-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-gray-900">
                        Taste.
                    </Link>
                    <div className="flex gap-6 text-sm font-medium text-gray-500 items-center">
                        <Link to="/" className="hover:text-gray-900 transition-colors">Feed</Link>
                        
                        {user ? (
                            <>
                                <button 
                                    onClick={() => setIsModalOpen(true)}
                                    className="hover:text-black transition-colors"
                                    aria-label="Create Rec"
                                >
                                    <PlusSquare size={20} />
                                </button>
                                <div className="flex items-center gap-3 ml-2">
                                     <img 
                                        src={user.avatar || `https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80`} 
                                        className="w-8 h-8 rounded-full border border-gray-200 object-cover" 
                                        alt="profile"
                                     />
                                     <button onClick={handleLogout} className="hover:text-black transition-colors">
                                        <LogOut size={20} />
                                     </button>
                                </div>
                            </>
                        ) : (
                            <a href="http://localhost:5000/auth/google" className="hover:text-gray-900 transition-colors">Login</a>
                        )}
                    </div>
                </div>
            </nav>
            <CreateRecModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onRecCreated={handleRecCreated} 
            />
        </>
    );
};

export default Navbar;
