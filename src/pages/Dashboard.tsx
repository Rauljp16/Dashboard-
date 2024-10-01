import styled from "styled-components";
import Comments from "../components/Comments";

function Dashboard() {
  // const kpisStyle = {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   margin: "30px",
  // };
  // const kpisArticleStyle = {
  //   display: "flex",
  //   gap: "10px",
  //   minWidth: "20%",
  //   alignItems: "center",
  //   padding: "16px 40px 16px 16px",
  //   backgroundColor: "#ffffff",
  //   borderRadius: "8px",
  // };
  const SectionComments = styled.article`
  width: 100%;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.5);

  `;
  const TitleComments = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 30px;
  letter-spacing: 0.4px;
  `;
  return (
    <SectionComments >
      <TitleComments>Latest Review by Customers</TitleComments>
      <Comments />
    </SectionComments>
  );
}

export default Dashboard;
