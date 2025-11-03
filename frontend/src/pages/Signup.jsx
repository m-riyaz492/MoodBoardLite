import { useState } from 'react';
import { signup } from '../services/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const { data } = await signup(form);
      localStorage.setItem('mood_token', data.token);
      localStorage.setItem('mood_user', JSON.stringify(data.user));
      navigate('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container" role="main">
      <div className="card" style={{ maxWidth: 520, margin: '40px auto' }}>
        <h2>Create account</h2>
        <form onSubmit={submit}>
          <label>Username</label>
          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />

          <label style={{ marginTop: 10 }}>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

          <label style={{ marginTop: 10 }}>Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />

          {err && <div style={{ color: 'var(--danger)', marginTop: 8 }}>{err}</div>}
          <button type="submit" style={{ marginTop: 12 }}>Sign up</button>
        </form>
        <p style={{ marginTop: 12, color: 'var(--muted)' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}