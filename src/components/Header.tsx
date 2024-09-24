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
  position: absolute;
  width: 100%;
  height: ${(props) => (props.open ? "90px" : "70px")};
  /* height: 90px; */
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: all 0.8s ease-in-out;
`;

const Title = styled.h3`
  margin-left: 30px;
`;

const IconContainer = styled.div`
  background-color: red;
  position: relative;
  right: 30px;
  display: flex;
  gap: 30px;
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
    <HeaderContainer open={open}>
      <div>
        {open ? (
          <HiArrowLeft onClick={handleClick} />
        ) : (
          <HiArrowRight onClick={handleClick} />
        )}
        <Title>{getRouteName(title)}</Title>
      </div>
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
