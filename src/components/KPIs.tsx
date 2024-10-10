import { IoBedOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbLogout, TbLogin } from "react-icons/tb";
import styled from "styled-components";

const SectionKPIs = styled.section`
width: 100%;
  display: flex;
  gap: 30px;
`;

const Article = styled.article`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.5);
  border-radius: 8px;
  padding: 20px;
  gap: 20px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  padding: 12px;
  border-radius: 8px;
  background-color: #FFEDEC;
  color: #E23428;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #E23428; 
    color: #ffffff; 
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
    gap: 4px;

  p:first-child {
    font-size: 24px;
    font-weight: bold;
  }

  p:last-child {
    font-size: 14px;
    color: #787878;
  }
`;

function KPIs() {
    return (
        <SectionKPIs>
            <Article>
                <IconWrapper >
                    <IoBedOutline size="24px" />
                </IconWrapper>
                <TextWrapper>
                    <p>8,461</p>
                    <p>New Booking</p>
                </TextWrapper>
            </Article>

            <Article>
                <IconWrapper >
                    <FaRegCalendarAlt size="24px" />
                </IconWrapper>
                <TextWrapper>
                    <p>963</p>
                    <p>Scheduled Room</p>
                </TextWrapper>
            </Article>

            <Article>
                <IconWrapper >
                    <TbLogin size="24px" />
                </IconWrapper>
                <TextWrapper>
                    <p>753</p>
                    <p>Check In</p>
                </TextWrapper>
            </Article>

            <Article>
                <IconWrapper >
                    <TbLogout size="24px" />
                </IconWrapper>
                <TextWrapper>
                    <p>516</p>
                    <p>Check Out</p>
                </TextWrapper>
            </Article>
        </SectionKPIs>
    );
}

export default KPIs;
