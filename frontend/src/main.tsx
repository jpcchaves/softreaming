import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// context
import { AuthProvider } from "./contexts/auth/AuthProvider";
// router
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Suspense>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.Suspense>
);
