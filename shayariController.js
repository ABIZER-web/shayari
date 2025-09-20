const Shayari = require('../models/Shayari');

// Add new Shayari (Protected)
exports.addShayari = async (req, res) => {
  const { content, category } = req.body;
  const userId = req.user.userId;

  try {
    const newShayari = new Shayari({
      content,
      category,
      author: userId,
    });

    await newShayari.save();
    res.status(201).json(newShayari);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Shayari (Public)
exports.getAllShayaris = async (req, res) => {
  try {
    const shayaris = await Shayari.find()
      .populate('author', 'username') // show author's username
      .sort({ createdAt: -1 });

    res.json(shayaris);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
