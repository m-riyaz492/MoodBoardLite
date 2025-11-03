import axios from "axios";

export default function DeleteButton({ entryId, onDelete }) {
  const handleDelete = async () => {
    if (!entryId) return alert("No entry ID provided.");

    const confirm = window.confirm("Are you sure you want to delete this mood entry?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/entry/${entryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("mood_token")}`,
        },
      });
      if (onDelete) onDelete(entryId);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete mood entry.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        marginTop: 12,
        padding: "8px 14px",
        background: "var(--danger)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  );
}