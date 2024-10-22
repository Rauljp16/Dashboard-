import { Link, matchPath, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuCalendarDays } from "react-icons/lu";
import { IoKeyOutline } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi";
import styled from "styled-components";
import logo from "../../public/logo.png";
import { useContext, useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { AuthContext } from "./Auth";
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
  justify-content: space-between;
  width: ${(props) => (props.open ? "250px" : "60px")};
  min-width: ${(props) => (props.open ? "250px" : "60px")};
  transition: all 1s ease;
  overflow: hidden;
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px #0000002b;
  padding-bottom: 80px;
  gap: 20px;

  @media (max-width: 1000px) {
    width: 60px;
  min-width: 60px;
  }
`;

const LogoWrapper = styled.div<SidebarProps>`
  display: flex;
  align-items: center;
  width: ${(props) => (props.open ? "70px" : "55px")};
  transition: all 1s ease;
  padding: 6px 0;
  margin: 0 auto 10px;

  @media (max-width: 1000px) {
    width: 50px;
  }

`;

const ImgStyled = styled.img`
  width: 100%;
`;
const DivLinks = styled.div`
  width: 100%;
  margin-top: -20px;
`;
const LinkStyled = styled(Link) <LinkStyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${(props) =>
    props.open ? "10px 0px 10px 40px" : "10px 0px 10px 9px"};
  width: 100%;
  text-align: center;
  text-decoration: none;
  border-left: ${(props) =>
    props.isActive ? "4px solid red" : "4px solid transparent"};
  color: ${(props) => (props.isActive ? "red" : "#135846")};
  transition: padding 1s ease-in-out;

  @media (max-width: 1000px) {
    padding: 10px 0px 10px 9px;

  }

`;

const PStyled = styled.div<SidebarProps>`
  position: absolute;
  left: 120px;
  transform: ${(props) =>
    props.open
      ? "translate(0) rotate(0deg)"
      : "translate(-250px) rotate(-90deg)"};
  transition: transform 1s ease-in-out;

  @media (max-width: 1000px) {
    transform: translate(-250px) rotate(-90deg);

  }

`;

const UserProfile = styled.div<SidebarProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  margin: 10px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 18px;
  box-shadow: 0px 20px 30px #00000014;
  gap: 14px;
  transform: ${(props) =>
    props.open
      ? "translate(0) rotate(0deg)"
      : "translate(-250px) rotate(-90deg)"};
  transition: transform 1s ease-in-out;

  @media (max-width: 1000px) {
    transform: translate(-250px) rotate(-90deg);

  }

`;
const DivImg = styled.div`
position: relative;
`;
const UserImg = styled.img<SidebarProps>`
  position: absolute;
    top: 12px;
    left: 100px;
    z-index: 2;
  width: ${(props) => (props.open ? "55px" : "50px")};
  height: ${(props) => (props.open ? "55px" : "50px")};
  border-radius: 8px;
  transform: ${(props) =>
    props.open
      ? "translate(0) rotate(0deg)"
      : "translate(-96px) rotate(0deg)"};
  transition: all 0.8s ease-in-out;

  @media (max-width: 1000px) {
    width: 50px;
  height: 50px;
  left: 5px;
  }

`;

const UserInfo = styled.div<SidebarProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0 0;
`;

const UserName = styled.p`
  color: #393939;
  font-weight: 600;
  text-align: center;
`;

const UserEmail = styled.p`
  color: #b2b2b2;
  font-size: 12px;
`;
const DivButton = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  color: #007455;
  height: 30px;
`;
const InfoHeader = styled.div`
  position: relative;
  width: 80%;
  height: 140px;
  margin-left: 30px;
`;
const DivRights = styled.div<SidebarProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  color: #007455;
  transform: ${(props) =>
    props.open
      ? "translate(0) rotate(0deg)"
      : "translate(-350px) rotate(-90deg)"};
  transition: transform 1s ease-in-out;
  @media (max-width: 1000px) {
    transform: translate(-250px) rotate(-90deg);
  }

`;
const PRights = styled.p`
  color: #799283;
  font-size: 12px;
`;
const PTitle = styled.p`
  color: #212121;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
`;
const Made = styled.p`
  color: #799283;
  font-size: 14px;
`;

function Sidebar({ open }: SidebarProps) {
  const authContext = useContext(AuthContext);

  const location = useLocation();

  if (!authContext) {
    console.error("AuthContext is undefined");
    return null;
  }
  const { state } = authContext;
  const userData = state.userData

  if (!userData) {
    return <div>Loading...</div>; // Muestra un mensaje de carga si los datos aún no están disponibles
  }

  return (
    <>
      <SidebarStyled open={open}>
        <LogoWrapper open={open}>
          <ImgStyled src={logo} alt="logo hotel" />
        </LogoWrapper>
        <DivLinks>
          <LinkStyled
            open={open}
            to="/dashboard"
            isActive={
              location.pathname === "/dashboard" || location.pathname === "/"
            }
          >
            <RxDashboard style={{ width: "32px", height: "32px" }} />
            <PStyled open={open}>Dashboard</PStyled>
          </LinkStyled>

          <LinkStyled
            open={open}
            to="/bookings"
            isActive={
              location.pathname === "/bookings" ||
              location.pathname === "/bookings/create" ||
              !!matchPath("/bookings/edit/:id", location.pathname) ||
              !!matchPath("/bookings/:id", location.pathname)
            }
          >
            <LuCalendarDays style={{ width: "32px", height: "32px" }} />
            <PStyled open={open}>Bookings</PStyled>
          </LinkStyled>

          <LinkStyled
            open={open}
            to="/rooms"
            isActive={
              location.pathname === "/rooms" ||
              location.pathname === "/rooms/create" ||
              !!matchPath("/rooms/edit/:id", location.pathname) ||
              !!matchPath("/rooms/:id", location.pathname)
            }
          >
            <IoKeyOutline style={{ width: "32px", height: "32px" }} />
            <PStyled open={open}>Rooms</PStyled>
          </LinkStyled>

          <LinkStyled
            open={open}
            to="/contact"
            isActive={location.pathname === "/contact"}
          >
            <RiContactsBook3Line style={{ width: "32px", height: "32px" }} />
            <PStyled open={open}>Contact</PStyled>
          </LinkStyled>

          <LinkStyled
            open={open}
            to="/users"
            isActive={
              location.pathname === "/users" ||
              location.pathname === "/users/create" ||
              !!matchPath("/users/edit/:id", location.pathname) ||
              !!matchPath("/users/:id", location.pathname)
            }
          >
            <HiOutlineUser style={{ width: "32px", height: "32px" }} />
            <PStyled open={open}>Users</PStyled>
          </LinkStyled>
        </DivLinks>
        <>
          <DivImg>
            <UserImg
              src={`/${userData.foto}`}
              alt={userData.name}
              open={open}
            />
          </DivImg>
          <UserProfile open={open}>
            <UserInfo open={open}>
              <UserName>{userData.name}</UserName>
              <UserEmail>{userData.email}</UserEmail>
            </UserInfo>
            <DivButton>
              <a
                href="https://www.linkedin.com/in/ra%C3%BAl-jerez-pag%C3%A1n-35570927a/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  width: "30px",
                  height: "30px",
                }}
              >
                <FaLinkedin style={{ width: "30px", height: "30px" }} />
              </a>
              <a
                href="https://github.com/Rauljp16"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <FaSquareGithub style={{ width: "30px", height: "30px" }} />
              </a>
            </DivButton>
          </UserProfile>
        </>
        <InfoHeader>
          <DivRights open={open}>
            <div>
              <PTitle>Travl Hotel Admin Dashboard</PTitle>
              <PRights>© 2024 All Rights Reserved</PRights>
            </div>
            <Made>Made with ♥ by Raúl</Made>
          </DivRights>
        </InfoHeader>
      </SidebarStyled>
    </>
  );
}

export default Sidebar;
