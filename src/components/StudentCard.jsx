export default function StudentCard({ student }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 5, width: 200 }}>
      <h3>{student.name}</h3>
      <p>Class: {student.class}</p>
      <p>Age: {student.age}</p>
    </div>
  );
}
