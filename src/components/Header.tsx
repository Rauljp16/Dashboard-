import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi";
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
  background-color: #f89494;
  width: 50%;
  position: relative;
  display: flex;
  gap: 30px;
`;
const ContainerTitle = styled.div`
width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
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
    <HeaderContainer open={open} setOpen={setOpen}>
      <ContainerTitle>
        {open ? (
          <HiArrowLeft onClick={handleClick} />
        ) : (
          <HiArrowRight onClick={handleClick} />
        )}
        <Title>{getRouteName(title)}</Title>
      </ContainerTitle>
      <IconContainer>
        <CiMail style={{ width: "20px", height: "20px" }} />
        <IoMdNotificationsOutline style={{ width: "20px", height: "20px" }} />
        <IconStyle>
          <TbLogout onClick={logOut} />
        </IconStyle>
      </IconContainer>
    </HeaderContainer>
  );
}

export default Header;
