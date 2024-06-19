import { HiArrowLeft } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { TbLogout } from "react-icons/tb";

function Header({ setOpen, open, setAuth }) {
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
  const navigate = useNavigate();

  function getRouteName(title) {
    switch (title) {
      case "/":
        return "Home";
      case "/dashboard":
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
  const logOut = () => {
    setAuth("");
    navigate("/login");
  };

  return (
    <div style={headerStyle}>
      {open ? (
        <HiArrowLeft onClick={handleClick} />
      ) : (
        <HiArrowRight onClick={handleClick} />
      )}
      <h3 style={{ marginLeft: "5px" }}>{getRouteName(title)}</h3>
      <TbLogout
        onClick={logOut}
        style={{
          position: "absolute",
          right: "10px",
          width: "28px",
          height: "28px",
        }}
      />
    </div>
  );
}

export default Header;
