import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "tailwindcss/tailwind.css";
import { BrowserRouter } from "react-router-dom";

// service workerの登録
import { registerSW } from "virtual:pwa-register";
registerSW();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
