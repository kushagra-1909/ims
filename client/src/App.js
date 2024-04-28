import "./StyleSheets/Login.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FacultyDashboard from "./pages/FacultyDashboard/FacultyDashboard";
import Login from "./pages/Login/Login";
import "./StyleSheets/FacultyDashboard.css";
import "./StyleSheets/admindashboard.css";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import { Profile } from "./pages/FacultyDashboard/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-dashboard/:id" element={<FacultyDashboard />} />
          <Route path="/admin-dashboard/:id" element={<AdminDashboard />} />
          <Route path="/user-dashboard/:id/profile" element={<Profile />} />
          <Route path="/admin-dashboard/:id/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
