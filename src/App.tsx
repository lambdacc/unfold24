// @ts-nocheck
// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ExplorePage } from "./pages/Explore";
import { CreateRiskPage } from "./pages/CreateRisk";
import { EventsPage } from "./pages/Events";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/events/:id" element={<EventsPage />} />
        <Route path="/createRisk" element={<CreateRiskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
