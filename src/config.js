// src/config.js
const base = process.env.REACT_APP_API_URL || "http://localhost:10000";
export default base.replace(/\/$/, ""); // remove trailing slash if any
