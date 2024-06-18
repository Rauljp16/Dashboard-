import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Booking from "./pages/Bookings";
import Rooms from "./pages/Rooms";
import Users from "./pages/Users";
import Contact from "./pages/Contact";
import Room from "./pages/Room";
import User from "./pages/User";
import Login from "./pages/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [open, setOpen] = useState(true);
  const auth_key = "rauljp16";
  const [auth, setAuth] = useState(localStorage.getItem(auth_key) !== null);

  const appStyle = {
    display: "flex",
    width: "100%",
    backgroundColor: "#EBEBEB",
  };
  const containerStyle = {
    width: "100%",
  };

  return (
    <div style={appStyle}>
      <Sidebar open={open} />
      <div style={containerStyle}>
        <Header setOpen={setOpen} open={open} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
