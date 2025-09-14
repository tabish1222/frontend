import React, { useEffect, useState } from "react";
import API from "../api";

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "" });
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (role === "parent") {
          const res = await API.get("/students/my");
          setStudents(res.data);
        } else if (role === "teacher") {
          const res = await API.get("/students");
          setStudents(res.data);
        }
      } catch (err) {
        alert("Failed to load students");
      }
    };
    fetchStudents();
  }, [role]);

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await API.post("/students", form);
      setForm({ name: "", age: "" });
      const res = await API.get("/students/my");
      setStudents(res.data);
    } catch (err) {
      alert("Error adding student");
    }
  };

  return (
    <div>
      <h2>Students ({role})</h2>
      {role === "parent" && (
        <form onSubmit={addStudent}>
          <input placeholder="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="number" placeholder="Age" value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })} />
          <button type="submit">Add Student</button>
        </form>
      )}

      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.name} - Age {s.age}</li>
        ))}
      </ul>
    </div>
  );
}

export default Students;
