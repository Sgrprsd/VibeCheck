import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const CreateRecModal = ({ isOpen, onClose, onRecCreated }) => {
    const [formData, setFormData] = useState({
        link: '',
        title: '',
        why: '',
        tags: '',
        image: null // File object
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const data = new FormData();
        data.append('link', formData.link);
        data.append('title', formData.title);
        data.append('why', formData.why);
        data.append('tags', formData.tags);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await axios.post('http://localhost:5000/api/recs', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onRecCreated();
            onClose();
            setFormData({ link: '', title: '', why: '', tags: '', image: null });
        } catch (error) {
            console.error("Error creating rec", error);
            alert("Failed to create Rec. Ensure you are logged in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                    <X size={24} />
                </button>
                
                <h2 className="text-2xl font-serif font-bold mb-6">Drop a Rec</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input 
                            type="text" 
                            required
                            placeholder="What is this?"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional if Image provided)</label>
                        <input 
                            type="url" 
                            placeholder="https://..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            value={formData.link}
                            onChange={e => setFormData({...formData, link: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image (Optional - Overrides Link Preview)</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                            onChange={e => setFormData({...formData, image: e.target.files[0]})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Why? (The Taste)</label>
                        <textarea 
                            required
                            rows={4}
                            placeholder="Why should we care?"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                            value={formData.why}
                            onChange={e => setFormData({...formData, why: e.target.value})}
                        />
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                        <input 
                            type="text" 
                            placeholder="design, music, tech"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            value={formData.tags}
                            onChange={e => setFormData({...formData, tags: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Curating...' : 'Post Rec'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRecModal;
