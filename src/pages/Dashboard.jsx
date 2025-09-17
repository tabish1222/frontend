import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api, setToken } from "../api/api.js";
import Navbar from "../components/Navbar.jsx";
import StudentCard from "../components/StudentCard.jsx";
import TeacherCard from "../components/TeacherCard.jsx";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    setToken(token);
    api.get("/students").then((res) => setStudents(res.data || []));
    api.get("/teachers").then((res) => setTeachers(res.data || []));
  }, [token]);

  return (
    <div>
      <Navbar logout={logout} />
      <h2>Students</h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {students.map((s) => <StudentCard key={s.id} student={s} />)}
      </div>
      <h2>Teachers</h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {teachers.map((t) => <TeacherCard key={t.id} teacher={t} />)}
      </div>
    </div>
  );
}
