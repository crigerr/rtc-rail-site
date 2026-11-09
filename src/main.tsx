import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Корневой элемент #root не найден");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
