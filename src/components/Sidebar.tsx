import { Link, useLocation } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import styled from "styled-components";
import logo from "../images/logo.png";

interface SidebarProps {
  open: boolean;
}
interface LinkStyledProps {
  isActive: boolean;
  open: boolean;
}

const SidebarStyled = styled.div<SidebarProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => (props.open ? "300px" : "85px")};
  transition: all 1s ease;
  overflow: hidden;
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px #0000002b;
`;

const LogoWrapper = styled.div<SidebarProps>`
  display: flex;
  align-items: center;
  width: ${(props) => (props.open ? "100px" : "50px")};
  transition: all 1s ease;
  padding: 6px 0;
  margin-bottom: 20px;
`;

const ImgStyled = styled.img`
  width: 100%;
`;

const LinkStyled = styled(Link) <LinkStyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  margin: 12px;
  padding:${(props) => (props.isActive ? "2px 0px 2px 11px" : "2px 0px 2px 16px")};
  width: 100%;
  text-align: center;
  text-decoration: none;
  border-left:${(props) => (props.isActive ? "4px solid red" : "")};
  color:${(props) => (props.isActive ? "red" : "#135846")};

`;

const PStyled = styled.p<SidebarProps>`
position: absolute;
left: 60px;
transform: ${(props) => (props.open ? "translate(0) rotate(0deg)" : "translate(-120px) rotate(-90deg)")};
transition: transform 1s ease-in-out;
`;

function Sidebar({ open }: SidebarProps) {
  const location = useLocation()

  return (
    <SidebarStyled open={open}>
      <LogoWrapper open={open}>
        <ImgStyled src={logo} alt="logo hotel" />
      </LogoWrapper>

      <LinkStyled open={open} to="/dashboard" isActive={location.pathname === "/dashboard" || location.pathname === "/"}>
        <RiDashboardLine style={{ width: "28px", height: "28px" }} />
        <PStyled open={open}>Dashboard</PStyled>
      </LinkStyled>

      <LinkStyled open={open} to="/bookings" isActive={location.pathname === "/bookings"}>
        <FaRegCalendarAlt style={{ width: "28px", height: "28px" }} />
        <PStyled open={open}>Bookings</PStyled>
      </LinkStyled>

      <LinkStyled open={open} to="/rooms" isActive={location.pathname === "/rooms"}>
        <IoKeyOutline style={{ width: "28px", height: "28px" }} />
        <PStyled open={open}>Rooms</PStyled>
      </LinkStyled>

      <LinkStyled open={open} to="/contact" isActive={location.pathname === "/contact"}>
        <MdOutlineContactPhone style={{ width: "28px", height: "28px" }} />
        <PStyled open={open}>Contact</PStyled>
      </LinkStyled>

      <LinkStyled open={open} to="/users" isActive={location.pathname === "/users"}>
        <HiOutlineUser style={{ width: "28px", height: "28px" }} />
        <PStyled open={open}>Users</PStyled>
      </LinkStyled>
    </SidebarStyled>
  );
}

export default Sidebar;
