import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Today from "./pages/Today";
import History from "./pages/History";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import EmojiSelector from "./components/EmojiSelector";
import GifSearch from "./components/GifSearch";
import MoodCard from "./components/MoodCard";
import ProtectedRoute from "./components/ProtectedRoute";

import './styles/globals.css';
import './styles/theme.css';

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          {/* ✅ Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/today"
            element={
              <ProtectedRoute>
                <Today />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          {/* ✅ Optional feature routes */}
          <Route
            path="/emoji"
            element={
              <ProtectedRoute>
                <EmojiSelector />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gif"
            element={
              <ProtectedRoute>
                <GifSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mood"
            element={
              <ProtectedRoute>
                <MoodCard mood={{ mood: "happy", emojis: ["😊"], note: "Sample mood" }} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}