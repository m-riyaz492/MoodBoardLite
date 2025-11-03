import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/entry/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("mood_token")}`,
          },
        });
        setEntries(data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container">
      <h2>Entry History</h2>
      {entries.length > 0 ? (
        entries.map((entry) => (
          <div key={entry._id} className="card">
            <p><strong>Mood:</strong> {entry.mood}</p>
            <p><strong>Note:</strong> {entry.note}</p>
            <p><strong>Date:</strong> {new Date(entry.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No history found.</p>
      )}
    </div>
  );
}