const mongoose = require('mongoose');

const MoodBoardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true }, // store normalized midnight date
    emojis: { type: [String], default: [], validate: v => v.length >= 1 },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^https?:\/\/.+\.(?:gif|png|jpe?g|webp)(\?.*)?$/i.test(v),
        message: 'Provide a valid image/GIF URL',
      },
    },
    color: { type: String, required: true }, // e.g., #ffcc00
    note: { type: String, maxlength: 200, default: '' },
  },
  { timestamps: true }
);

MoodBoardSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('MoodBoard', MoodBoardSchema);