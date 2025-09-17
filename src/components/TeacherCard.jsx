// src/components/TeacherCard.jsx
import React from "react";

export default function TeacherCard({ teacher }) {
  return (
    <div style={styles.card}>
      <h3>{teacher.name}</h3>
      <p><b>Role:</b> {teacher.role}</p>
      {teacher.Subjects?.length > 0 && (
        <div style={styles.subjects}>
          <p><b>Subjects:</b></p>
          <ul>
            {teacher.Subjects.map((subject) => (
              <li key={subject.id}>{subject.name}</li>
            ))}
          </ul>
        </div>
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
    backgroundColor: "#e3f2fd",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  subjects: {
    marginTop: "10px",
  },
};
