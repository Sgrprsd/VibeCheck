const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, unique: true },
    avatar: { type: String },
    bio: { type: String },
    profileColor: { type: String, default: '#ffffff' }, // Hex code for profile background
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
