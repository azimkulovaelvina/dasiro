import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Hash routes refresh safely on GitHub Pages without server rewrites. */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
