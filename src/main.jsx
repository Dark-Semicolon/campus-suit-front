import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./components/errorPage/ErrorPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
