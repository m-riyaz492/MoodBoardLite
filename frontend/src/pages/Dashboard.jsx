// import { useEffect, useState } from "react";
// import axios from "axios";
// import MoodCard from "../components/MoodCard";
// import DeleteButton from "../components/DeleteButton";

// export default function Dashboard() {
//   const [todayEntry, setTodayEntry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const fetchTodayEntry = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/entry/today", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("mood_token")}`,
//         },
//       });
//       setTodayEntry(data || null);
//     } catch (err) {
//       console.error("Error fetching today's entry:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     setTodayEntry(null);
//     setMessage("Mood entry deleted.");
//     setTimeout(() => setMessage(""), 3000);
//   };

//   useEffect(() => {
//     fetchTodayEntry();
//   }, []);

//   return (
//     <div className="container">
//       <h2>Today's Mood</h2>
//       {message && <p style={{ color: "var(--muted)", marginBottom: 12 }}>{message}</p>}
//       {loading ? (
//         <p>Loading...</p>
//       ) : todayEntry ? (
//         <>
//           <MoodCard mood={todayEntry} />
//           <DeleteButton entryId={todayEntry._id} onDelete={handleDelete} />
//         </>
//       ) : (
//         <p>No entry yet.</p>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import MoodCard from "../components/MoodCard";
import DeleteButton from "../components/DeleteButton";

export default function Dashboard() {
  const [todayEntries, setTodayEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchTodayEntries = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/entry/today", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("mood_token")}`,
        },
      });
      setTodayEntries(data || []);
    } catch (err) {
      console.error("Error fetching today's entries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/entry/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("mood_token")}`,
        },
      });
      setTodayEntries((prev) => prev.filter((entry) => entry._id !== id));
      setMessage("Mood entry deleted.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  useEffect(() => {
    fetchTodayEntries();
  }, []);

  return (
    <div className="container">
      <h2>Today's Moods</h2>
      {message && <p style={{ color: "var(--muted)", marginBottom: 12 }}>{message}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : todayEntries.length > 0 ? (
        todayEntries.map((entry) => (
          <div key={entry._id} style={{ marginBottom: 24 }}>
            <MoodCard mood={entry} />
            <DeleteButton entryId={entry._id} onDelete={handleDelete} />
          </div>
        ))
      ) : (
        <p>No entries yet.</p>
      )}
    </div>
  );
}