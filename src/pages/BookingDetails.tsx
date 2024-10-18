import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleThunk } from "../slices/bookings/bookingsThunk";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../store";
import styled from "styled-components";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import imageRoom from "../../public/hab.webp";

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
`;

const DetailsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 50px 28px;
  background-color: #e9e9e9e6;
  border-radius: 8px 0px 0px 8px;
  overflow: auto;
`;
const DivUpper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
  padding: 30px 0;
  gap: 30px;
  border-bottom: 1px solid #969696;
`;
const NameOrder = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;
`;
const ContainerName = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const Name = styled.p`
  font-size: 28px;
  font-weight: 600;
`;
const Id = styled.p`
  font-size: 13px;
  color: #799283;
`;
const OrderDate = styled.div`
display: flex;
flex-direction: column;
justify-content: center;

`;

const PTitle = styled.p`
  font-size: 14px;
  color: #6e6e6e;
`;
const PInfo = styled.p`
  font-weight: 500;
`;
const InOutDates = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
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

const DivImgRoom = styled.div`
position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-radius: 0px 8px 8px 0px;
`;
const ImgRoom = styled.img`
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
  background-color: #007455;
  text-align: center;
  color: white;
  padding: 8px;
`;
const Title = styled.h2`
  font-size: 24px;
  letter-spacing: 1px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

const DivButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 6px 0 0 12px;
  &:hover {
    scale: 1.1;
    filter: drop-shadow(0px 0px 4px #ffffff);
  }

`;
const Status = styled.div<{ status: string }>`
width: 50%;
position: absolute;
top: 36px;
right: -89px;
transform: rotate(45deg);
  text-align: center;
  background-color: ${({ status }) =>
    status === "Checking In" ? "#007455" : status === "In Progress" ? "#ffc423" : "#e23428"};
  color: white;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 1px;
`;

const LinkTo = styled(Link)`
  color: #ffffff;
  font-size: 33px;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
`;

function BookingDetails() {
  const dispatch: AppDispatch = useDispatch();
  const { _id } = useParams<{ _id: string }>();
  const singleBooking = useSelector(
    (state: RootState) => state.bookingSlice.singleBooking
  );

  useEffect(() => {
    if (_id) {
      dispatch(fetchSingleThunk(_id));
    }
  }, [dispatch, _id]);

  if (!singleBooking) {
    return <Loading />;
  }

  return (
    <Container>
      <DetailsWrapper>
        <TitleContainer>
          <Title>Order Details</Title>
        </TitleContainer>
        <DivUpper>
          <NameOrder>
            <ContainerName>
              <Name>{singleBooking.Name}</Name>
              <Id>ID {singleBooking._id}</Id>
            </ContainerName>
            <OrderDate>
              <PTitle>Order Date</PTitle>
              <PInfo>{singleBooking.OrderDate}</PInfo>
            </OrderDate>
          </NameOrder>
          <InOutDates>
            <Detail>
              <PTitle>Check-In</PTitle>
              <PInfo>{singleBooking.CheckIn}</PInfo>
            </Detail>
            <Detail>
              <PTitle>Check-Out </PTitle>
              <PInfo>{singleBooking.CheckOut}</PInfo>
            </Detail>
          </InOutDates>
        </DivUpper>
        <DivLower>
          <RoomInfo>
            <Detail>
              <PTitle>Room Type</PTitle>
              <p>{singleBooking.RoomType}</p>
            </Detail>
            <Detail>
              <PTitle> Room Number</PTitle>
              <p>{singleBooking.RoomNumber}</p>
            </Detail>
          </RoomInfo>
          <Detail>
            <PTitle>Special Request</PTitle>
            <p>{singleBooking.SpecialRequest}</p>
          </Detail>
        </DivLower>
        <DivButton>
          <LinkTo to="/bookings">
            <HiArrowLeft />
          </LinkTo>
        </DivButton>
      </DetailsWrapper>
      <DivImgRoom>
        <ImgRoom src={imageRoom} alt="image room" />
        <Status status={singleBooking.Status}>{singleBooking.Status}</Status>
      </DivImgRoom>
    </Container>
  );
}

export default BookingDetails;
