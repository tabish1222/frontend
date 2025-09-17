export default function TeacherCard({ teacher }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 5, width: 200 }}>
      <h3>{teacher.name}</h3>
      <p>Subject: {teacher.subject || "N/A"}</p>
    </div>
  );
}
