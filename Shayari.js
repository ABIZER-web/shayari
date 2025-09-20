const mongoose = require('mongoose');

const shayariSchema = new mongoose.Schema({
  content: { type: String, required: true },
  category: { type: String, default: "General" }, // optional: sad, romantic etc.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Shayari', shayariSchema);
