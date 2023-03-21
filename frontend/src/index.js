import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RequestsContextProvider } from "./context/RequestContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RequestsContextProvider>
        <App />
      </RequestsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
