// src/pages/Register.js
import React, { useState } from "react";
import { register } from "../services/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "parent" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await register(form); // returns { message, user }
      setMsg(res.message || "Registered");
    } catch (err) {
      setMsg("Error: " + (err.message || "Registration failed"));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input name="name" value={form.name} onChange={onChange} required />
        <input name="email" type="email" value={form.email} onChange={onChange} required />
        <input name="password" type="password" value={form.password} onChange={onChange} required />
        <select name="role" value={form.role} onChange={onChange}>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
