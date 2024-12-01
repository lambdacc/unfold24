// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ExplorePage } from "./pages/Explore";

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
        <Route
          path="/createRisk"
          element={<div>Create Risk Page (TODO)</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
