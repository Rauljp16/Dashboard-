import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleThunk } from "../slices/bookings/bookingsThunk";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../store";

function BookingDetails() {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const singleBooking = useSelector((state: RootState) => state.bookingSlice.singleBooking);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleThunk(id));
    }
  }, [dispatch, id]);

  if (!singleBooking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p>
        <strong>Name:</strong> {singleBooking.Name}
      </p>
      <p>
        <strong>ID:</strong> {singleBooking.id}
      </p>
      <p>
        <strong>Order Date:</strong> {singleBooking.OrderDate}
      </p>
      <p>
        <strong>Check-In:</strong> {singleBooking.CheckIn}
      </p>
      <p>
        <strong>Check-Out:</strong> {singleBooking.CheckOut}
      </p>
      <p>
        <strong>Special Request:</strong> {singleBooking.SpecialRequest}
      </p>
      <p>
        <strong>Room Type:</strong> {singleBooking.RoomType}
      </p>
      <p>
        <strong>Room Number:</strong> {singleBooking.RoomNumber}
      </p>
      <p>
        <strong>Status:</strong> {singleBooking.Status}
      </p>
    </div>
  );
}

export default BookingDetails;
