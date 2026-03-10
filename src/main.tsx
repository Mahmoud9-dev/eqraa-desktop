import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initDb } from "./lib/database/init";

initDb();

createRoot(document.getElementById("root")!).render(<App />);
