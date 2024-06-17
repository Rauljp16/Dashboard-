import { Link } from "react-router-dom";
function Home() {
  const dashboardStyle = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
  };
  const margin = {
    margin: "20px",
  };
  return (
    <>
      <h1>HOME</h1>
      <div style={dashboardStyle}>
        <Link to="/" style={margin}>
          Dashboard
        </Link>
        <Link to="/bookings" style={margin}>
          Bookings
        </Link>
        <Link to="/rooms" style={margin}>
          Rooms
        </Link>
        <Link to="/contact" style={margin}>
          Contact
        </Link>
        <Link to="/users" style={margin}>
          Users
        </Link>
      </div>
    </>
  );
}

export default Home;
