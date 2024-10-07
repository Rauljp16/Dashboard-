import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleThunk } from "../slices/bookings/bookingsThunk";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../store";
import Loading from "../components/Loading";
import styled from "styled-components";

const BookingDetailsWrapper = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Detail = styled.p`
  margin: 8px 0;
  font-size: 16px;

  strong {
    font-weight: 600;
  }
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
    <BookingDetailsWrapper>
      <Title>Order Details</Title>
      <Detail>
        <strong>Name:</strong> {singleBooking.Name}
      </Detail>
      <Detail>
        <strong>ID:</strong> {singleBooking._id}
      </Detail>
      <Detail>
        <strong>Order Date:</strong> {singleBooking.OrderDate}
      </Detail>
      <Detail>
        <strong>Check-In:</strong> {singleBooking.CheckIn}
      </Detail>
      <Detail>
        <strong>Check-Out:</strong> {singleBooking.CheckOut}
      </Detail>
      <Detail>
        <strong>Special Request:</strong> {singleBooking.SpecialRequest}
      </Detail>
      <Detail>
        <strong>Room Type:</strong> {singleBooking.RoomType}
      </Detail>
      <Detail>
        <strong>Room Number:</strong> {singleBooking.RoomNumber}
      </Detail>
      <Detail>
        <strong>Status:</strong> {singleBooking.Status}
      </Detail>
    </BookingDetailsWrapper>
  );
}

export default BookingDetails;
