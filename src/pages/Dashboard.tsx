import styled from "styled-components";
import Comments from "../components/Comments";
import KPIs from "../components/KPIs";

function Dashboard() {
  const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  `;
  const SectionComments = styled.article`
  width: 100%;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.5);
  `;
  const SectionKpis = styled.article`
  width: 100%;
  background-color: transparent;
  `;
  const TitleComments = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 30px;
  letter-spacing: 0.4px;
  `;
  return (
    <DashboardContainer>
      <SectionKpis>
        <KPIs />
      </SectionKpis>
      <SectionComments >
        <TitleComments>Latest Review by Customers</TitleComments>
        <Comments />
      </SectionComments>
    </DashboardContainer>
  );
}

export default Dashboard;
