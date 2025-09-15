import React, { useEffect, useState } from "react";
import { getStudents, addStudent } from "../services/students";

export default function Students({ token }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudents(token);
        setStudents(data);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.name} - {s.class}</li>
        ))}
      </ul>
    </div>
  );
}
