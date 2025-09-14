import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./Layout/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Plan from "./pages/TripPlanner/TripPlanner.jsx";
import FindingTripModal from "./pages/FindingTripModal/FindingTripModal.jsx";
import Trips from "./pages/Trips/Trips.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/search" element={<FindingTripModal />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
