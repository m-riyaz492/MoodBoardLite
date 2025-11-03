export default function MoodCard({ mood }) {
  return (
    <div
      className="card"
      style={{
        borderColor: mood.color,
        borderWidth: 2,
        borderStyle: "solid",
        padding: 24,
        borderRadius: 16,
        boxShadow: "0 8px 24px var(--shadow)",
        background: "var(--card)",
      }}
    >
      {/* Header: Color dot, Emojis */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: mood.color,
          }}
          aria-hidden="true"
        />
        <div style={{ fontSize: "1.8rem" }}>
          {Array.isArray(mood.emojis)
            ? mood.emojis.join(" ")
            : mood.emojis || "🙂"}
        </div>
      </div>

      {/* ✅ Image */}
      {mood.imageUrl && (
        <div style={{ marginTop: 16 }}>
          <img
            src={mood.imageUrl}
            alt="Mood visual"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 12,
              objectFit: "cover",
              maxHeight: "300px",
            }}
          />
        </div>
      )}

      {/* Note */}
      {mood.note && (
        <p style={{ marginTop: 12, color: "#cfd2d6", fontSize: "0.95rem" }}>
          {mood.note}
        </p>
      )}
    </div>
  );
}