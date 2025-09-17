import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
