import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleThunk } from "../slices/users/usersThunk";
import Loading from "../components/Loading";
import styled from "styled-components";
import image from "../../public/fondo.webp";
import { HiArrowLeft } from "react-icons/hi";

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: 650px;
  margin: 0 auto;
  position: relative;
  display: flex;
  box-shadow: 0px 0px 18px #0033256a;
  border-radius: 9px;
  overflow: hidden;
`;
const FondoUser = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0%;
`;
const DetailsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 60px 28px 40px;
  background-color: #ffffffed;
  border-radius: 8px 0px 0px 8px;
  overflow: auto;
`;
const TitleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #007455;
  text-align: center;
  padding: 8px;
`;

const Title = styled.h2`
  font-size: 28px;
  letter-spacing: 1px;
`;
const DivImg = styled.div`
  width: 90px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;

const ImgUser = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const DivUpper = styled.div`
  padding: 25px 0;
  border-bottom: 1px solid #969696;
`;

const ContainerName = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Name = styled.p`
  font-size: 26px;
  font-weight: 600;
`;

const Id = styled.p`
  font-size: 13px;
  color: #799283;
`;
const DivLower = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 0 0;
  gap: 10px;
  border-top: 1px solid #969696;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 100%;
`;
const PTitle = styled.p`
  font-size: 14px;
  color: #6e6e6e;
`;

const PInfo = styled.p`
  font-weight: 500;
`;
const DivButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 6px 0 0 12px;
  &:hover {
    scale: 1.1;
    filter: drop-shadow(0px 0px 4px #007455);
  }
`;

const LinkTo = styled(Link)`
  color: #007455;
  font-size: 33px;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
`;
const DivImgUser = styled.div`
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-radius: 0px 8px 8px 0px;
`;
const Status = styled.div<{ status: string }>`
  width: 300px;
  position: absolute;
  top: 36px;
  right: -89px;
  transform: rotate(45deg);
  text-align: center;
  background-color: ${({ status }) =>
    status === "Active" ? "#007455" : "#e23428"};
  color: white;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 1px;
`;

function user() {
  const dispatch: AppDispatch = useDispatch();
  const { _id } = useParams<{ _id: string }>();
  const singleUser = useSelector(
    (state: RootState) => state.userSlice.singleUser
  );
  useEffect(() => {
    if (_id) {
      dispatch(fetchSingleThunk(_id));
    }
  }, [dispatch, _id]);

  if (!singleUser) {
    return <Loading />;
  }
  return (
    <Container>
      <FondoUser src={image} alt="Room image" />
      <DetailsWrapper>
        <TitleContainer>
          <Title>User Details</Title>
        </TitleContainer>
        <DivImg>
          <ImgUser src={`/${singleUser.foto}`} alt="Imagen de usuario" />
        </DivImg>
        <DivUpper>
          <ContainerName>
            <Name>{singleUser.name}</Name>
            <Id>ID {singleUser._id}</Id>
          </ContainerName>
        </DivUpper>
        <DivLower>
          <Detail>
            <PTitle>Phone Contact</PTitle>
            <PInfo>{singleUser.contact}</PInfo>
          </Detail>
          <Detail>
            <PTitle>Email</PTitle>
            <PInfo>{singleUser.email}</PInfo>
          </Detail>
          <Detail>
            <PTitle>Start Date</PTitle>
            <PInfo>{singleUser.startDate}</PInfo>
          </Detail>
          <Detail>
            <PTitle>Description</PTitle>
            <PInfo>{singleUser.description}</PInfo>
          </Detail>
        </DivLower>
        <DivButton>
          <LinkTo to="/users">
            <HiArrowLeft />
          </LinkTo>
        </DivButton>
      </DetailsWrapper>
      <DivImgUser>
        <Status status={singleUser.status}>{singleUser.status}</Status>
      </DivImgUser>
    </Container>
  );
}

export default user;
