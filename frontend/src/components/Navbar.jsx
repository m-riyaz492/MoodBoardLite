import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const userRaw = localStorage.getItem("mood_user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  const logout = () => {
    localStorage.removeItem("mood_token");
    localStorage.removeItem("mood_user");
    navigate("/login");
  };

  return (
    <header
      className="nav"
      style={{
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.7)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#333",
            fontWeight: 700,
            fontSize: "1.2rem",
            letterSpacing: "0.5px",
          }}
        >
          MoodBoard Lite
        </Link>

        <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/today" className="nav-link">Today</Link>
          <Link to="/history" className="nav-link">History</Link>
          <ThemeToggle />
          {user ? (
            <button
              onClick={logout}
              className="nav-button"
              title={`Logout ${user.username}`}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login"><button className="nav-button">Login</button></Link>
              <Link to="/signup"><button className="nav-button">Signup</button></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}