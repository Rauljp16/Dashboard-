import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { InfoPopup } from "./CreateBooking";
import { DataBookings } from "../types/global";
import {
  fetchSingleThunk,
  updateThunk,
} from "../slices/bookings/bookingsThunk";
import Button from "../components/Button";
import Popup from "../components/Popup";

function EditBooking() {
  const dispatch: AppDispatch = useDispatch();
  const { _id } = useParams<{ _id: string }>();
  const singleBooking = useSelector(
    (state: RootState) => state.bookingSlice.singleBooking
  );
  const [openPopup, setOpenPopup] = useState(false);
  const [infoPopup, setInfoPopup] = useState<InfoPopup>({
    title: "",
    info: "",
  });

  const [dataBooking, setDataBooking] = useState<DataBookings>({
    Name: "",
    OrderDate: "",
    CheckIn: "",
    CheckOut: "",
    SpecialRequest: "",
    RoomType: "",
    RoomNumber: "",
    Status: "",
  });

  useEffect(() => {
    if (_id) {
      dispatch(fetchSingleThunk(_id));
    }
  }, [dispatch, _id]);

  useEffect(() => {
    if (singleBooking) {
      setDataBooking(singleBooking);
    }
  }, [singleBooking]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name !== "contact") {
      setDataBooking((prevDataBooking) => ({
        ...prevDataBooking,
        [name]: value,
      }));
    } else {
      const cleaned = value.replace(/\D/g, "");
      const formatted = cleaned.replace(/(.{3})(?=.)/g, "$1-");
      setDataBooking((prevDataBooking) => ({
        ...prevDataBooking,
        [name]: formatted,
      }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !dataBooking.Name ||
      !dataBooking.CheckIn ||
      !dataBooking.CheckOut ||
      !dataBooking.OrderDate ||
      !dataBooking.RoomNumber ||
      !dataBooking.RoomType ||
      !dataBooking.SpecialRequest ||
      !dataBooking.Status
    ) {
      setOpenPopup(true);
      setInfoPopup({
        title: "Formulario no válido",
        info: "Rellena todos los campos correctamente",
      });
    } else {
      dispatch(updateThunk(dataBooking));
    }
  };

  if (!singleBooking) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <label>Full Name</label>

        <input
          type="text"
          name="Name"
          value={dataBooking.Name}
          autoComplete="disabled"
          placeholder="Name"
          onChange={handleChange}
        />

        <label>Order Date</label>

        <input
          type="date"
          name="OrderDate"
          value={dataBooking.OrderDate}
          autoComplete="disabled"
          onChange={handleChange}
        />

        <label>Check In</label>

        <input
          type="date"
          name="CheckIn"
          value={dataBooking.CheckIn}
          autoComplete="disabled"
          onChange={handleChange}
        />

        <label>Check Out</label>

        <input
          type="date"
          name="CheckOut"
          value={dataBooking.CheckOut}
          autoComplete="disabled"
          onChange={handleChange}
        />

        <label>Special Request</label>

        <input
          type="text"
          name="SpecialRequest"
          value={dataBooking.SpecialRequest}
          autoComplete="disabled"
          placeholder="Special Request"
          onChange={handleChange}
        />

        <label>Room Type</label>

        <select
          name="RoomType"
          onChange={handleChange}
          value={dataBooking.RoomType}
        >
          <option value="">Select Room Type</option>
          <option value="SingleRoom">Single Room</option>
          <option value="DoubleRoom">Double Room</option>
          <option value="TripleRoom">Triple Room</option>
          <option value="FamilyRoom">Family Room</option>
          <option value="JuniorSuite">Junior Suite</option>
          <option value="SuperiorRoom">Superior Room</option>
        </select>

        <label>Status</label>

        <select
          name="Status"
          onChange={handleChange}
          value={dataBooking.Status}
        >
          <option value="">Select Status</option>
          <option value="checkin">Check In</option>
          <option value="checkout">Check Out</option>
          <option value="inprogress">In Progress</option>
        </select>

        <label>Room Number</label>

        <input
          type="text"
          name="RoomNumber"
          value={dataBooking.RoomNumber}
          autoComplete="disabled"
          placeholder="Room Number"
          onChange={handleChange}
        />

        <Button color="green" type="submit" name="Update" />
        {openPopup && (
          <Popup
            infoPopup={infoPopup}
            setOpenPopup={setOpenPopup}
            openPopup={openPopup}
          />
        )}
      </form>
    </>
  );
}

export default EditBooking;
