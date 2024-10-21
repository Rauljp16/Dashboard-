import styled from "styled-components";
import Comments from "../components/Comments";
import KPIs from "../components/KPIs";
import MyCalendar from "../components/Calendar";
import MyBarChart from "../components/Metrics";

function Dashboard() {
  const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;
  const SectionComments = styled.article`
    width: 100%;
    padding: 20px 0 0;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.5);
  `;
  const SectionKpis = styled.article`
    width: 100%;
    overflow: auto;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.5);
    border-radius: 10px;
  `;
  const TitleComments = styled.h1`
    font-size: 22px;
    font-weight: 600;
    padding-left: 20px;
    letter-spacing: 0.4px;
  `;
  const DatesHotel = styled.div`
    display: flex;
    height: 300px;
    gap: 30px;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.5);
    border-radius: 10px;
    padding: 20px;
  `;
  return (
    <DashboardContainer>
      <SectionKpis>
        <KPIs />
      </SectionKpis>
      <SectionComments>
        <TitleComments>Latest Review by Customers</TitleComments>
        <Comments />
      </SectionComments>
      <DatesHotel>
        <MyCalendar />
        <MyBarChart />
      </DatesHotel>
    </DashboardContainer>
  );
}

export default Dashboard;
