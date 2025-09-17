export default function Navbar({ logout }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 10, background: "#eee" }}>
      <h1>School App</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
