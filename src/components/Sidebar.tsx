import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import styled from "styled-components";
import hotelSvg from "../svg/hotel.svg";

interface sidebarProps {
  open: boolean
}

const SidebarStyled = styled.div`
    //height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #00c3ff;
  `;

function Sidebar({ open }: sidebarProps) {
  const linkStyle: React.CSSProperties = {
    color: "#E23428",
    margin: "24px",
    width: "100%",
    textAlign: "center",
    textDecoration: "none",
  };
  const pStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginLeft: "40px",
    gap: "16px",
  };

  return (
    <>
      <SidebarStyled>
        <div style={{ display: "flex" }}>
          <img style={{ width: "40px" }} src={hotelSvg} alt="logo hotel" />
          <div>
            {/* <p>travl</p>
            <p>Hotel Admin Dashboard</p> */}
          </div>
        </div>
        <Link to="/dashboard" style={linkStyle}>
          {open ? (
            <p style={pStyle}>
              <RiDashboardLine style={{ width: "28px", height: "28px" }} />{" "}
              Dashboard
            </p>
          ) : (
            <RiDashboardLine style={{ width: "28px", height: "28px" }} />
          )}
        </Link>
        <Link to="/bookings" style={linkStyle}>
          {open ? (
            <p style={pStyle}>
              <FaRegCalendarAlt style={{ width: "28px", height: "28px" }} />
              Bookings
            </p>
          ) : (
            <FaRegCalendarAlt style={{ width: "28px", height: "28px" }} />
          )}
        </Link>
        <Link to="/rooms" style={linkStyle}>
          {open ? (
            <p style={pStyle}>
              <IoKeyOutline style={{ width: "28px", height: "28px" }} />
              Rooms
            </p>
          ) : (
            <IoKeyOutline style={{ width: "28px", height: "28px" }} />
          )}
        </Link>
        <Link to="/contact" style={linkStyle}>
          {open ? (
            <p style={pStyle}>
              <MdOutlineContactPhone
                style={{ width: "28px", height: "28px" }}
              />
              Contact
            </p>
          ) : (
            <MdOutlineContactPhone style={{ width: "28px", height: "28px" }} />
          )}
        </Link>
        <Link to="/users" style={linkStyle}>
          {open ? (
            <p style={pStyle}>
              <HiOutlineUser style={{ width: "28px", height: "28px" }} />
              Users
            </p>
          ) : (
            <HiOutlineUser style={{ width: "28px", height: "28px" }} />
          )}
        </Link>
      </SidebarStyled>
    </>
  );
}
export default Sidebar;
