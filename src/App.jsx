import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
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
import PrivateRoute from "./pages/PrivateRoute";
import "./App.css";
import { AuthContext } from "./components/Auth";
import BookingDetails from "./pages/BookingDetails";

function App() {
  const [open, setOpen] = useState(false);
  const { state } = useContext(AuthContext);

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
        <Header setOpen={setOpen} open={open} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute auth={state.isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute auth={state.isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute auth={state.isAuthenticated}>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings/:id"
            element={
              <PrivateRoute auth={state.isAuthenticated}>
                <BookingDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <PrivateRoute auth={state.isAuthenticated}>
                <Rooms />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms/:id"
            element={
              <PrivateRoute auth={state.isAuthenticated}>
                <Room />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute auth={state.isAuthenticated}>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute auth={state.isAuthenticated}>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute auth={state.isAuthenticated}>
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
