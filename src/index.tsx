import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Home" />} />
        <Route path="/:selectedCategory" element={<App />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
