import { HiMenu } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi";
import { useLocation } from "react-router-dom";

function Header({ setOpen, open }) {
  const headerStyle = {
    width: "100%",
    height: "50px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    paddingLeft: "5px",
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const title = useLocation().pathname;

  function getRouteName(title) {
    switch (title) {
      case "/":
        return "Dashboard";
      case "/bookings":
        return "Booking";
      case "/rooms":
        return "Rooms";
      case "/contact":
        return "Contact";
      case "/users":
        return "Users";
      default:
        return "Unknown";
    }
  }

  return (
    <div style={headerStyle}>
      {open ? (
        <HiArrowLeft onClick={handleClick} />
      ) : (
        <HiMenu onClick={handleClick} />
      )}
      <h3 style={{ marginLeft: "5px" }}>{getRouteName(title)}</h3>
    </div>
  );
}

export default Header;
