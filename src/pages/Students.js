import React, { useEffect, useState } from "react";
import { api } from "../api";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      <h2>Students List</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - Grade {s.grade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;
