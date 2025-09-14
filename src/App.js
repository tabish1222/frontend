import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, AppBar, Toolbar, Paper, Box } from "@mui/material";
import { post, get, setAuthHeader } from "./api";
import { saveToken, getToken, clearToken } from "./auth";

export default function App() {
  const [email, setEmail] = useState("teacher@example.com");
  const [password, setPassword] = useState("Passw0rd!");
  const [type, setType] = useState("teacher");
  const [token, setTokenState] = useState(getToken());
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => { const t = getToken(); if (t) { setAuthHeader(t); setTokenState(t); } }, []);

  async function login() {
    try {
      const res = await post("/auth/login", { email, password, type });
      saveToken(res.token);
      setAuthHeader(res.token);
      setTokenState(res.token);
      alert("Logged as " + res.role);
    } catch (e) { alert("Login failed"); }
  }

  async function loadStudents() {
    try {
      if (type === "teacher") {
        const s = await get("/teacher/students");
        setStudents(s);
      } else {
        const s = await get("/parent/children");
        setStudents(s);
      }
    } catch (e) { console.error(e); alert("Load failed"); }
  }

  async function markAttendance(id, status) {
    await post(`/teacher/attendance/${id}`, { status });
    alert("Marked " + status);
  }

  async function sendFeedback(id) {
    if (!feedback) return alert("Enter feedback");
    await post(`/teacher/feedback/${id}`, { text: feedback });
    setFeedback("");
    alert("Feedback sent");
  }

  async function viewDashboard(id) {
    if (type === "teacher") {
      const res = await get(`/teacher/dashboard/${id}`);
      alert("Attendance:\n" + res.attendance.map(a => `${a.date}: ${a.status}`).join("\n") + "\n\nFeedback:\n" + res.feedbacks.map(f => f.text).join("\n"));
    } else {
      const res = await get(`/parent/dashboard/${id}`);
      alert("Attendance:\n" + res.attendance.map(a => `${a.date}: ${a.status}`).join("\n") + "\n\nFeedback:\n" + res.feedbacks.map(f => f.text).join("\n"));
    }
  }

  if (!token) {
    return (
      <Container maxWidth="xs" sx={{ mt: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Login</Typography>
          <TextField label="Email" fullWidth sx={{ my: 1 }} value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth sx={{ my: 1 }} value={password} onChange={e => setPassword(e.target.value)} />
          <TextField label="Type (teacher/parent)" fullWidth sx={{ my: 1 }} value={type} onChange={e => setType(e.target.value)} />
          <Button variant="contained" fullWidth onClick={login}>Login</Button>
        </Paper>
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static"><Toolbar><Typography>School App</Typography></Toolbar></AppBar>
      <Container sx={{ mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={loadStudents}>Load Students</Button>
          <Button sx={{ ml: 2 }} color="secondary" onClick={() => { clearToken(); setTokenState(null); }}>Logout</Button>
        </Box>

        <Box>
          {students.map(s => (
            <Paper key={s.id} sx={{ p: 2, my: 1 }}>
              <Typography variant="subtitle1">{s.name} (Grade {s.grade})</Typography>
              <Button size="small" onClick={() => markAttendance(s.id, "present")}>Present</Button>
              <Button size="small" onClick={() => markAttendance(s.id, "absent")}>Absent</Button>
              <Button size="small" onClick={() => viewDashboard(s.id)}>View Dashboard</Button>
              {type === "teacher" && (
                <>
                  <TextField fullWidth multiline rows={2} value={feedback} onChange={e => setFeedback(e.target.value)} sx={{ mt: 1 }} placeholder="Enter feedback" />
                  <Button onClick={() => sendFeedback(s.id)} variant="contained" sx={{ mt: 1 }}>Send Feedback</Button>
                </>
              )}
            </Paper>
          ))}
        </Box>
      </Container>
    </>
  );
}
