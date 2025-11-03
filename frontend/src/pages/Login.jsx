import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("mood_token", data.token);
      localStorage.setItem("mood_user", JSON.stringify(data.user));
      navigate("/"); // or navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 500, margin: "40px auto" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <p style={{ color: "var(--danger)", marginTop: 10 }}>{error}</p>}
          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: 12, color: "var(--muted)", textAlign: "center" }}>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}