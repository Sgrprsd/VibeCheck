import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ExternalLink, Heart, Repeat, Pencil, Trash2 } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import EditRecModal from './EditRecModal';

const RecCard = ({ rec }) => {
    const { user } = useContext(UserContext);
    const [copied, setCopied] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    if (!rec) return null;

    // Check ownership
    // MongoDB IDs allow simple string comparison usually, but safest to use checks
    const isOwner = user && rec.author && (user._id === rec.author._id || user.googleId === rec.author.googleId);

    const handleSteal = async () => {
        try {
            await axios.post(`http://localhost:5000/api/recs/rerec/${rec._id}`, {}, {
                withCredentials: true
            });
            alert("Stolen! Added to your profile.");
            setCopied(true);
        } catch (err) {
            console.error(err);
            alert("Login required to steal!");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this Rec?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/recs/${rec._id}`, { withCredentials: true });
            window.location.reload(); // Simple refresh for now
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete.");
        }
    };

    return (
        <article className="group mb-12">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src={rec.author?.avatar || `https://ui-avatars.com/api/?name=${rec.author?.username || 'User'}&background=random`}
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <span className="text-sm font-medium block">{rec.author?.username || 'Unknown'}</span>
                        <span className="text-xs text-gray-500 block">
                            {new Date(rec.createdAt).toLocaleDateString()}
                            {rec.originalAuthor && ` • Stolen from ${rec.originalAuthor.username}`}
                        </span>
                    </div>
                </div>

                {isOwner && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => setIsEditOpen(true)}
                            className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-md transition-all"
                            title="Edit"
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}
            </div>

            <h3 className="text-xl font-serif font-bold mb-2 leading-tight">{rec.title}</h3>
            <p className="text-gray-600 mb-4 whitespace-pre-wrap">{rec.why}</p>

            {/* Visual Media (Image or Link Embed) */}
            {rec.image && !rec.link ? (
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                    <img src={rec.image} alt={rec.title} className="w-full h-auto object-cover max-h-96" />
                </div>
            ) : rec.link && (
                <a
                    href={rec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-4 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors group/card"
                >
                    {rec.image && (
                        <div className="h-48 overflow-hidden">
                            <img src={rec.image} className="w-full h-full object-cover" alt="preview" />
                        </div>
                    )}
                    {!rec.image && rec.linkMetadata?.image && (
                        <div className="h-48 overflow-hidden">
                            <img src={rec.linkMetadata.image} className="w-full h-full object-cover" alt="preview" />
                        </div>
                    )}
                    <div className="p-3 bg-gray-50">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                            <ExternalLink size={12} />
                            {new URL(rec.link).hostname.replace('www.', '')}
                        </div>
                        <div className="font-medium text-sm truncate">{rec.linkMetadata?.title || rec.title}</div>
                    </div>
                </a>
            )}

            <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-pink-500 transition-colors flex items-center gap-1.5 group/btn">
                    <Heart size={18} className="group-hover/btn:scale-110 transition-transform" />
                </button>
                <button
                    onClick={handleSteal}
                    disabled={copied}
                    className={`transition-colors flex items-center gap-1.5 group/btn ${copied ? 'text-green-600' : 'text-gray-400 hover:text-black'}`}
                >
                    <Repeat size={18} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                    <span className="text-xs font-medium">{copied ? 'Stolen' : 'Steal'}</span>
                </button>
            </div>

            <EditRecModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                rec={rec}
                onRecUpdated={() => window.location.reload()}
            />
        </article>
    );
};

export default RecCard;
