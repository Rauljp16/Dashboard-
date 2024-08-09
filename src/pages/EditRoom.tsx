import { useParams } from "react-router-dom";
import { InfoPopup } from "./CreateUser";
import { DataRooms } from "../types/global";
import Button from "../components/Button";
import Popup from "../components/Popup";
import photo from "../images/hab.webp";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchSingleThunk, updateThunk } from "../slices/rooms/roomsThunk";

function EditRoom() {
  const dispatch: AppDispatch = useDispatch();
  const { _id } = useParams<{ _id: string }>();
  const singleRoom = useSelector(
    (state: RootState) => state.roomSlice.singleRoom
  );
  const [openPopup, setOpenPopup] = useState(false);
  const [infoPopup, setInfoPopup] = useState<InfoPopup>({
    title: "",
    info: "",
  });

  const [dataRoom, setDataRoom] = useState<DataRooms>({
    Foto: "",
    number: "",
    BedType: "",
    Facilities: ["TV"],
    Rate: "",
    OfferPrice: "",
    Status: "",
    RoomFloor: "",
  });

  useEffect(() => {
    if (_id) {
      dispatch(fetchSingleThunk(_id));
    }
  }, [dispatch, _id]);

  useEffect(() => {
    if (singleRoom) {
      setDataRoom(singleRoom);
    }
  }, [singleRoom]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "number" || name === "Rate" || name === "OfferPrice") {
      const formatted = /^\d{0,3}$/.test(value)
        ? value
        : dataRoom[name as keyof DataRooms];
      setDataRoom({ ...dataRoom, [name]: formatted });
    } else {
      setDataRoom({ ...dataRoom, [name]: value });
    }
  };
  const handleSelectChange = (event: any) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option: any) => option.value
    );
    setDataRoom({
      ...dataRoom,
      Facilities: selectedValues,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !dataRoom.BedType ||
      !dataRoom.Facilities ||
      !dataRoom.Foto ||
      !dataRoom.OfferPrice ||
      !dataRoom.number ||
      !dataRoom.Rate ||
      !dataRoom.RoomFloor ||
      !dataRoom.Status
    ) {
      setOpenPopup(true);
      setInfoPopup({
        title: "Formulario no válido",
        info: "Rellena todos los campos correctamente",
      });
    } else {
      dispatch(updateThunk(dataRoom));
    }
  };

  if (!singleRoom) {
    return <div>Loading...</div>;
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
      onSubmit={handleSubmit}
    >
      <label>Foto</label>

      <div>
        <img
          style={{ width: "60px", height: "60px" }}
          src={photo}
          alt="imagen de habitacion predeterminada"
        />
      </div>

      <label>Room Number</label>

      <input
        type="text"
        name="number"
        value={dataRoom.number}
        autoComplete="disabled"
        onChange={handleChange}
      />

      <label>Bed Type</label>

      <select name="BedType" onChange={handleChange} value={dataRoom.BedType}>
        <option value="">Select Room Type</option>
        <option value="SingleBed">Single Bed</option>
        <option value="DoubleBed">Double Bed</option>
        <option value="DoubleSuperior">Double Superior</option>
        <option value="Suite">Suite</option>
      </select>

      <label>RateFacilities</label>
      <div style={{ position: "relative" }}>
        <select
          style={{
            height: "auto",
            padding: "20px 0 20px 20px",
            width: "165px",
          }}
          size={5}
          multiple={true}
          name="Facilities"
          value={dataRoom.Facilities}
          onChange={handleSelectChange}
        >
          <option value="Wifi">Wifi</option>
          <option value="TV">TV</option>
          <option value="Minibar">Minibar</option>
          <option value="AireAcondicionado">Aire Acondicionado</option>
          <option value="Jacuzzi">Jacuzzi</option>
        </select>
        <div
          style={{
            position: "absolute",
            right: "1px",
            width: "20px",
            height: "98%",
            top: "1px",
            backgroundColor: "#ffffff",
          }}
        ></div>
      </div>

      <label>Rate</label>

      <input
        type="text"
        name="Rate"
        value={dataRoom.Rate}
        autoComplete="disabled"
        placeholder="Rate"
        onChange={handleChange}
      />

      <label>Offer Price</label>

      <input
        type="text"
        name="OfferPrice"
        value={dataRoom.OfferPrice}
        autoComplete="disabled"
        placeholder="Offer Price"
        onChange={handleChange}
      />

      <label>Status</label>

      <select name="Status" onChange={handleChange} value={dataRoom.Status}>
        <option value="">Select Status</option>
        <option value="Available ">Available</option>
        <option value="Booked ">Booked</option>
      </select>

      <label>Room Floor</label>

      <select
        name="RoomFloor"
        onChange={handleChange}
        value={dataRoom.RoomFloor}
      >
        <option value="">Select floor</option>
        <option value="Floor 1 ">Floor 1</option>
        <option value="Floor 2 ">Floor 2</option>
        <option value="Floor 3 ">Floor 3</option>
        <option value="Floor 4 ">Floor 4</option>
      </select>

      <Button color="green" type="submit" name="Update" />
      {openPopup && (
        <Popup
          infoPopup={infoPopup}
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
        />
      )}
    </form>
  );
}

export default EditRoom;
