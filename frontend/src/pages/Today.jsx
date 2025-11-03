import { useState, useEffect } from "react";
import axios from "axios";
import EmojiSelector from "../components/EmojiSelector";

export default function Today() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [color, setColor] = useState("#7c5cff");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  // 🧠 Auto-suggest emoji based on mood text (only if none selected manually)
  useEffect(() => {
    const emojiSuggestions = {
      happy: "😊",
      sad: "😢",
      tired: "😴",
      angry: "😡",
      chill: "😌",
      excited: "🥳",
      stressed: "😰",
      relaxed: "🧘‍♂️",
    };
    const match = emojiSuggestions[mood.toLowerCase()];
    if (match && !selectedEmoji) {
      setSelectedEmoji(match);
    }
  }, [mood]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        "http://localhost:5000/api/entry",
        {
          mood,
          note,
          emojis: [selectedEmoji],
          color,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("mood_token")}`,
          },
        }
      );
      setMessage("Mood saved successfully!");
      setMood("");
      setNote("");
      setSelectedEmoji("");
      setColor("#7c5cff");
      setImageUrl("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save mood");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Today's Mood</h2>
        <form onSubmit={handleSubmit}>
          <label>Mood</label>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="e.g. tired, happy, chill"
            required
          />

          <label>Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="4"
            placeholder="Write a short note..."
          />

          <label>Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          />

          <div style={{ marginTop: 12 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Emoji</label>
          <div style={{ padding: 8, background: "var(--card-inner)", borderRadius: 8 }}>
            <EmojiSelector onSelect={(emoji) => setSelectedEmoji(emoji)} />
            {selectedEmoji && (
              <p style={{ fontSize: "1.5rem", marginTop: 8 }}>
                Selected: {selectedEmoji}
              </p>
            )}
          </div>
        </div>

          <label>Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image link (e.g. https://...jpg)"
          />

          {message && <p style={{ marginTop: 10 }}>{message}</p>}
          <button type="submit">Save Mood</button>
        </form>
      </div>
    </div>
  );
}