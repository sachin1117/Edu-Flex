import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css"; // Import the new App.css
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext";
import { CourseContextProvider } from "./context/CourseContext.jsx";

export const server = "http://localhost:5000";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </UserContextProvider>
  </StrictMode>
);