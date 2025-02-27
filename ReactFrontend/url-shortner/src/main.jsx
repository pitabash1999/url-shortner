import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import ContextProvider from "./store/ContextProvider.jsx";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
