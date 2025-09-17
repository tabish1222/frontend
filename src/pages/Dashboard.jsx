import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get("/students").then(res => setStudents(res.data));
  }, []);

  return (
    <div>
      <h1>Dashboard ({user.role})</h1>
      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <div>
          {students.map((student) => (
            <div key={student.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
              <p><b>Name:</b> {student.name}</p>
              <p><b>Class:</b> {student.class}</p>
              <p><b>Age:</b> {student.age}</p>
              {user.role === "parent" && (
                <>
                  <p><b>Teachers:</b></p>
                  <ul>
                    {student.teachers?.map(t => (
                      <li key={t.id}>{t.name} - {t.Subjects?.map(s => s.name).join(", ")}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
