import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSingleThunk } from "../slices/rooms/roomsThunk";
import Loading from "../components/Loading";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

const DetailsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 50px 28px;
  background-color: #ffffffed;
  border-radius: 8px 0px 0px 8px;
  overflow: auto;
`;

const DivUpper = styled.div`
  padding: 30px 0 40px;
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

const PTitle = styled.p`
  font-size: 14px;
  color: #6e6e6e;
`;

const PInfo = styled.p`
  font-weight: 500;
`;

const DivLower = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 0;
  gap: 30px;
  border-top: 1px solid #969696;
`;

const RoomInfo = styled.div`
  display: flex;
`;

const FacilitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FacilityTag = styled.div`
  background-color: #abceb9;
  color: #135846;
  padding: 8px;
  border-radius: 4px;
`;

const DivImgRoom = styled.div`
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-radius: 0px 8px 8px 0px;
`;

const ImgRoom = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0%;
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

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;
const PInfoPrice = styled.div`
  display: flex;
  align-items: flex-end;
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

const Status = styled.div<{ status: string }>`
  width: 300px;
  position: absolute;
  top: 36px;
  right: -89px;
  transform: rotate(45deg);
  text-align: center;
  background-color: ${({ status }) =>
    status === "Available" ? "#007455" : "#e23428"};
  color: white;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 1px;
`;

function Room() {
  const dispatch: AppDispatch = useDispatch();
  const { _id } = useParams<{ _id: string }>();
  const singleRoom = useSelector(
    (state: RootState) => state.roomSlice.singleRoom
  );

  useEffect(() => {
    if (_id) {
      dispatch(fetchSingleThunk(_id));
    }
  }, [dispatch, _id]);

  if (!singleRoom) {
    return <Loading />;
  }

  return (
    <Container>
      <ImgRoom src={`/${singleRoom.Foto}`} alt="Room image" />

      <DetailsWrapper>
        <TitleContainer>
          <Title>Room Details</Title>
        </TitleContainer>
        <DivUpper>
          <ContainerName>
            <Name>{singleRoom.BedType}</Name>
            <Id>ID {singleRoom._id}</Id>
          </ContainerName>
        </DivUpper>
        <DivLower>
          <RoomInfo>
            <Detail>
              <PTitle>Bed Type</PTitle>
              <PInfo>{singleRoom.BedType}</PInfo>
            </Detail>
            <Detail>
              <PTitle>Price</PTitle>
              <PInfoPrice>
                {singleRoom.OfferPrice}
                <Id>/night</Id>
              </PInfoPrice>
            </Detail>
          </RoomInfo>
          <RoomInfo>
            <Detail>
              <PTitle>Room Floor</PTitle>
              <PInfo>{singleRoom.RoomFloor}</PInfo>
            </Detail>
            <Detail>
              <PTitle>Room Number</PTitle>
              <PInfo>{singleRoom.number}</PInfo>
            </Detail>
          </RoomInfo>
          <Detail>
            <PTitle>Facilities</PTitle>
            <FacilitiesContainer>
              {singleRoom.Facilities.map((facility: string, index: number) => (
                <FacilityTag key={index}>{facility}</FacilityTag>
              ))}
            </FacilitiesContainer>
          </Detail>
        </DivLower>
        <DivButton>
          <LinkTo to="/rooms">
            <HiArrowLeft />
          </LinkTo>
        </DivButton>
      </DetailsWrapper>
      <DivImgRoom>
        <Status status={singleRoom.Status}>{singleRoom.Status}</Status>
      </DivImgRoom>
    </Container>
  );
}

export default Room;
