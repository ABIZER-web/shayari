const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  shayariId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shayari',
    required: true,
  },
  ip: { type: String, required: true },
  rating: { type: Number, required: true }, // 1 to 5
}, { timestamps: true });

ratingSchema.index({ shayariId: 1, ip: 1 }, { unique: true }); // Prevent duplicate ratings per IP

module.exports = mongoose.model('Rating', ratingSchema);
