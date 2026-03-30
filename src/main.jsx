import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ suppose que main.jsx est dans /src
import "./index.css";

// Création du root React
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);