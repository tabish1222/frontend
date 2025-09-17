// src/pages/Dashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import StudentCard from "../components/StudentCard";
import TeacherDashboardCard from "../components/TeacherDashboardCard";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        if (user.role === "parent") {
          // Fetch children + their teachers
          const res = await API.get("/students");
          setStudents(res.data);
        } else if (user.role === "teacher") {
          // Fetch teacher profile + subjects + students
          const res = await API.get(`/teachers/${user.id}`); // Create this endpoint in backend
          setTeacherData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        {user.role === "parent" && (
          <>
            <h1>Welcome, {user.role.toUpperCase()}</h1>
            {students.length === 0 ? (
              <p>No students found</p>
            ) : (
              students.map((student) => (
                <StudentCard key={student.id} student={student} role={user.role} />
              ))
            )}
          </>
        )}

        {user.role === "teacher" && teacherData && (
          <>
            <h1>Welcome, {user.role.toUpperCase()}</h1>
            <TeacherDashboardCard teacher={teacherData} />
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
};
