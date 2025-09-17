import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api, setToken } from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, JSON.parse(atob(res.data.token.split('.')[1])).role);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
