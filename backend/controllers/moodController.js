const MoodBoard = require('../models/MoodBoard');

const normalizeDate = (d = new Date()) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

exports.createMood = async (req, res) => {
  try {
    const { emojis, imageUrl, color, note } = req.body;
    if (!emojis || !emojis.length || !imageUrl || !color) {
      return res.status(400).json({ message: 'Emojis, imageUrl and color are required' });
    }
    if (note && note.length > 200) return res.status(400).json({ message: 'Note exceeds 200 characters' });

    const date = normalizeDate();
    const exists = await MoodBoard.findOne({ userId: req.user.id, date });
    if (exists) return res.status(409).json({ message: 'MoodBoard for today already exists' });

    const mood = await MoodBoard.create({ userId: req.user.id, date, emojis, imageUrl, color, note });
    res.status(201).json(mood);
  } catch (e) {
    res.status(500).json({ message: 'Create failed', error: e.message });
  }
};

exports.today = async (req, res) => {
  try {
    const mood = await MoodBoard.findOne({ userId: req.user.id, date: normalizeDate() });
    res.json(mood || null);
  } catch (e) {
    res.status(500).json({ message: 'Fetch today failed', error: e.message });
  }
};

exports.history = async (req, res) => {
  try {
    const moods = await MoodBoard.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(moods);
  } catch (e) {
    res.status(500).json({ message: 'Fetch history failed', error: e.message });
  }
};