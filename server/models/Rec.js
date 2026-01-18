const mongoose = require('mongoose');
const { Schema } = mongoose;

const recSchema = new Schema({
    title: { type: String, required: true },
    why: { type: String, required: true }, // Rich text or simple text
    link: { type: String },
    linkMetadata: {
        title: String,
        description: String,
        image: String,
        siteName: String
    },
    image: { type: String }, // Cloudinary URL (User uploaded high-res)
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
    // For "Re-Recs" (Steals)
    originalRec: { type: Schema.Types.ObjectId, ref: 'Rec' }, 
    originalAuthor: { type: Schema.Types.ObjectId, ref: 'User' },
    
    tags: [String],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

// Text index for search
recSchema.index({ title: 'text', why: 'text', 'linkMetadata.title': 'text' });

module.exports = mongoose.model('Rec', recSchema);
