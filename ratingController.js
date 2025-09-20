const Rating = require('../models/Rating');
const Shayari = require('../models/Shayari');

exports.rateShayari = async (req, res) => {
  const { shayariId, rating } = req.body;
  const ip = req.ip; // Get user's IP address

  if (!shayariId || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    // Check if already rated by this IP
    const alreadyRated = await Rating.findOne({ shayariId, ip });
    if (alreadyRated) {
      return res.status(400).json({ message: 'You already rated this Shayari' });
    }

    // Save the new rating
    const newRating = new Rating({ shayariId, ip, rating });
    await newRating.save();

    // Update Shayari average rating
    const ratings = await Rating.find({ shayariId });
    const total = ratings.reduce((sum, r) => sum + r.rating, 0);
    const avg = total / ratings.length;

    await Shayari.findByIdAndUpdate(shayariId, {
      averageRating: avg.toFixed(1),
      ratingsCount: ratings.length,
    });

    res.json({ message: 'Rating submitted', averageRating: avg.toFixed(1), ratingsCount: ratings.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
