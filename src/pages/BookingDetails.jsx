import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleThunk } from "../slices/bookings/bookingsThunk";
import { useParams } from "react-router-dom";

function BookingDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleBooking = useSelector(
    (state) => state.bookingSlice.singleBooking
  );

  useEffect(() => {
    dispatch(fetchSingleThunk(id));
  }, [dispatch, id]);

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
