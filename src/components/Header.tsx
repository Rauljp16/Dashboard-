import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { AuthContext } from "./Auth";

interface Props {
  setOpen: (open: boolean) => void;
  open: boolean;
}

function Header({ setOpen, open }: Props) {

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

  const { dispatch }: any = useContext(AuthContext);
  //cambiar el tipo any que ahora no lo he conseguido

  function getRouteName(title: string): string {
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
    dispatch({ type: "LOGOUT" });
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
        <TbLogout onClick={logOut} style={{ width: "20px", height: "20px", cursor: "pointer" }} />
      </div>
    </div>
  );
}

export default Header;
