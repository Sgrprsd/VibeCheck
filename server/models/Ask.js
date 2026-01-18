const mongoose = require('mongoose');
const { Schema } = mongoose;

const askSchema = new Schema({
    query: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    responses: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        rec: { type: Schema.Types.ObjectId, ref: 'Rec' }, // Optional link to a formal Rec
        text: String,
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

askSchema.index({ query: 'text' });

module.exports = mongoose.model('Ask', askSchema);
