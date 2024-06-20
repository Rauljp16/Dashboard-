import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
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
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const [open, setOpen] = useState(false);
  const AUTH_KEY = "log";
  const [auth, setAuth] = useState(localStorage.getItem(AUTH_KEY) !== null);

  useEffect(() => {
    if (auth) {
      localStorage.setItem(AUTH_KEY, "1");
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [auth]);

  const appStyle = {
    display: "flex",
    width: "100%",
    height: "100vh",
    backgroundColor: "#EBEBEB",
  };
  const containerStyle = {
    width: "100%",
  };

  return (
    <div style={appStyle}>
      <Sidebar open={open} />
      <div style={containerStyle}>
        <Header setOpen={setOpen} open={open} setAuth={setAuth} />
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route
            path="/"
            element={
              <PrivateRoute auth={auth}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute auth={auth}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute auth={auth}>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <PrivateRoute auth={auth}>
                <Rooms />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms/:id"
            element={
              <PrivateRoute auth={auth}>
                <Room />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute auth={auth}>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute auth={auth}>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute auth={auth}>
                <Contact />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
