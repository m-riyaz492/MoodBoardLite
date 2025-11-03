import { useState } from "react";

const emojiMap = {
  Happy: ["😊", "😄", "😁", "🥳", "😎"],
  Sad: ["😢", "😭", "😞", "😔", "🥺"],
  Tired: ["😴", "🥱", "😩", "😓", "😪"],
  Angry: ["😠", "😡", "🤬", "😤", "😾"],
  Chill: ["😌", "🧘‍♂️", "🌿", "😇", "😶‍🌫️"],
};

export default function EmojiSelector({ onSelect }) {
  const [category, setCategory] = useState("Happy");

  return (
    <div className="card">
      <h3>Select Emoji for Your Mood</h3>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        {Object.keys(emojiMap).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: category === cat ? "var(--primary)" : "var(--card)",
              color: category === cat ? "#fff" : "var(--text)",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {emojiMap[category].map((emoji, index) => (
          <span
            key={index}
            onClick={() => onSelect(emoji)}
            style={{
              fontSize: "2rem",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "12px",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}