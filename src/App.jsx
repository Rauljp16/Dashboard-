import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Bookings";
import Rooms from "./pages/Rooms";
import Users from "./pages/Users";
import Contact from "./pages/Contact";
import Room from "./pages/Room";
import User from "./pages/User";
import Login from "./pages/Login";
// import Header from "./components/Header";
import "./App.css";
// import { useState } from "react";

function App() {
  // const [display, setDisplay] = useState("none");
  // const Open = () => {
  //   setDisplay("block");
  // };

  return (
    <>
      {/* <Header open={Open()} /> */}
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
