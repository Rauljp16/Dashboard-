import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import styled from "styled-components";
import { AuthContext } from "./Auth";

interface Props {
  setOpen: (open: boolean) => void;
  open: boolean;
}

const HeaderContainer = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  transition: all 0.8s ease-in-out;
`;

const Title = styled.h3`
  font-size: 26px;
  letter-spacing: 1px;
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  gap: 50px;
  font-size: 26px;
`;
const ContainerTitle = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
`;

const IconStyle = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

function Header({ setOpen, open }: Props) {
  const handleClick = () => {
    setOpen(!open);
  };

  const title = useLocation().pathname;
  const navigate = useNavigate();

  const { dispatch }: any = useContext(AuthContext);

  function getRouteName(title: string): string {
    switch (true) {
      case title === "/":
      case title === "/dashboard":
        return "Dashboard";
      case title.includes("/bookings"):
        return "Bookings";
      case title.includes("/rooms"):
        return "Rooms";
      case title === "/contact":
        return "Contact";
      case title.includes("/users"):
        return "Users";
      default:
        return "Unknown";
    }
  }

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <HeaderContainer open={open} setOpen={setOpen}>
      <ContainerTitle>
        {open ? (
          <IoChevronBackOutline onClick={handleClick} style={{ cursor: "pointer" }} />
        ) : (
          <HiOutlineMenuAlt1 onClick={handleClick} style={{ cursor: "pointer" }} />
        )}
        <Title>{getRouteName(title)}</Title>
      </ContainerTitle>
      <IconContainer>
        <CiMail />
        <IoMdNotificationsOutline />
        {/* <IconStyle> */}
        <TbLogout onClick={logOut} style={{ cursor: "pointer" }} />
        {/* </IconStyle> */}
      </IconContainer>
    </HeaderContainer>
  );
}

export default Header;
