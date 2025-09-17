// src/components/StudentCard.jsx
import React from "react";

export default function StudentCard({ student, role }) {
  return (
    <div style={styles.card}>
      <h3>{student.name}</h3>
      <p><b>Class:</b> {student.class}</p>
      <p><b>Age:</b> {student.age}</p>

      {role === "parent" && student.teachers?.length > 0 && (
        <div style={styles.teachers}>
          <p><b>Teachers & Subjects:</b></p>
          <ul>
            {student.teachers.map((teacher) => (
              <li key={teacher.id}>
                {teacher.name} - {teacher.Subjects?.map(s => s.name).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {role === "teacher" && student.parent && (
        <p><b>Parent:</b> {student.parent.name}</p>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    margin: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  teachers: {
    marginTop: "10px",
  },
};
