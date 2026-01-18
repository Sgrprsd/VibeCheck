import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const EditRecModal = ({ isOpen, onClose, onRecUpdated, rec }) => {
  const [formData, setFormData] = useState({
    link: '',
    title: '',
    why: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rec) {
      setFormData({
        link: rec.link || '',
        title: rec.title || '',
        why: rec.why || '',
        tags: rec.tags ? rec.tags.join(', ') : ''
      });
    }
  }, [rec]);

  if (!isOpen || !rec) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/recs/${rec._id}`, formData, {
        withCredentials: true
      });
      onRecUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating rec", error);
      alert("Failed to update Rec.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-serif font-bold mb-6">Edit Rec</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <input
              type="url"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.link}
              onChange={e => setFormData({ ...formData, link: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Why? (The Taste)</label>
            <textarea
              required
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
              value={formData.why}
              onChange={e => setFormData({ ...formData, why: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="design, tech, minimalist"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-black transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecModal;
