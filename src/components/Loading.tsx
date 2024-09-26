import styled from "styled-components";
import loadingSvg from "../svg/loading.gif";

const LoadingImage = styled.img`
  width: 120px;
`;
const LoadingContainer = styled.div`
width: 100%;
height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


function Loading() {
    return (
        <LoadingContainer>
            <LoadingImage src={loadingSvg} alt="Logo" />
        </LoadingContainer>
    )
}

export default Loading
