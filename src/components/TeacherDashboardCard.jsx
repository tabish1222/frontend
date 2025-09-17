// src/components/TeacherDashboardCard.jsx
import React from "react";

export default function TeacherDashboardCard({ teacher }) {
  return (
    <div style={styles.card}>
      <h2>{teacher.name}</h2>
      <p><b>Role:</b> {teacher.role}</p>

      {teacher.Subjects?.length > 0 && (
        <div style={styles.section}>
          <h3>Subjects</h3>
          <ul>
            {teacher.Subjects.map((subject) => (
              <li key={subject.id}>
                {subject.name}
                {subject.Students?.length > 0 && (
                  <ul>
                    {subject.Students.map((student) => (
                      <li key={student.id}>{student.name} (Class {student.class})</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    margin: "15px 0",
    backgroundColor: "#fff8e1",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },
  section: {
    marginTop: "15px",
  },
};
