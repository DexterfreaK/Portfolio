import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";


// if ("scrollRestoration" in window.history) {
//   window.history.scrollRestoration = "manual";
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      
    </BrowserRouter>
  </React.StrictMode>
);
