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
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import CreateBooking from "./pages/CreateBooking";
import EditBooking from "./pages/EditBooking";
import CreateRoom from "./pages/CreateRoom";
import EditRoom from "./pages/EditRoom";

function App() {
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.error("AuthContext is undefined");
    return null;
  }

  const { state } = authContext;

  const appStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100vh",
    backgroundColor: "#EBEBEB",
  };

  const containerStyle: React.CSSProperties = {
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
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings/:_id"
            element={
              <PrivateRoute>
                <BookingDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings/create"
            element={
              <PrivateRoute>
                <CreateBooking />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings/edit/:_id"
            element={
              <PrivateRoute>
                <EditBooking />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <PrivateRoute>
                <Rooms />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms/:_id"
            element={
              <PrivateRoute>
                <Room />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms/create"
            element={
              <PrivateRoute>
                <CreateRoom />
              </PrivateRoute>
            }
          />
          <Route
            path="/rooms/edit/:_id"
            element={
              <PrivateRoute>
                <EditRoom />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:_id"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/create"
            element={
              <PrivateRoute>
                <CreateUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/edit/:_id"
            element={
              <PrivateRoute>
                <EditUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
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
