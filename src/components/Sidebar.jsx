import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";

function Sidebar({ open }) {
  const sidebarStyle = {
    width: open ? "150px" : "50px",
    height: "100vh",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
  };
  const margin = {
    color: "#E23428",
    margin: "20px",
  };

  return (
    <>
      <div style={sidebarStyle}>
        <Link to="/" style={margin}>
          {open ? "Dashboard" : <RiDashboardLine />}
        </Link>
        <Link to="/bookings" style={margin}>
          {open ? "Bookings" : <FaRegCalendarAlt />}
        </Link>
        <Link to="/rooms" style={margin}>
          {open ? "Rooms" : <IoKeyOutline />}
        </Link>
        <Link to="/contact" style={margin}>
          {open ? "Contact" : <MdOutlineContactPhone />}
        </Link>
        <Link to="/users" style={margin}>
          {open ? "Users" : <HiOutlineUser />}
        </Link>
      </div>
    </>
  );
}
export default Sidebar;
