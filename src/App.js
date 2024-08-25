import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import ManageBookings from "./Screens/ManageBookings";
import ManageBoats from "./Screens/ManageBoats";
import ManageMeals from "./Screens/ManageMeals";
import ManagePricing from "./Screens/ManagePricing";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manage-bookings" element={<ManageBookings />} />
            <Route path="/manage-boats" element={<ManageBoats />} />
            <Route path="/manage-meals" element={<ManageMeals />} />
            <Route path="/manage-pricing" element={<ManagePricing />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
