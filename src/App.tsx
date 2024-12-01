// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ExplorePage } from "./pages/Explore";
import { CreateRiskPage } from "./pages/CreateRisk";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/explore" replace />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route
          path="/events/:id"
          element={<div>Event Details Page (TODO)</div>}
        />
        <Route path="/createRisk" element={<CreateRiskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
