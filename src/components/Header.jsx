import { HiArrowLeft } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";

function Header({ setOpen, open, setAuth }) {
  const headerStyle = {
    width: "100%",
    height: "50px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const title = useLocation().pathname;
  const navigate = useNavigate();

  function getRouteName(title) {
    switch (title) {
      case "/":
        return "Dashboard";
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
      <h3 style={{ marginLeft: "30px" }}>{getRouteName(title)}</h3>
      <div
        style={{
          position: "absolute",
          right: "30px",
          display: "flex",
          gap: "30px",
        }}
      >
        <CiMail style={{ width: "20px", height: "20px" }} />
        <IoMdNotificationsOutline style={{ width: "20px", height: "20px" }} />
        <TbLogout onClick={logOut} style={{ width: "20px", height: "20px" }} />
      </div>
    </div>
  );
}

export default Header;
