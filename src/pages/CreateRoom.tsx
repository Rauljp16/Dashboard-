import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { ChangeEvent, FormEvent, useState } from "react";
import { DataRooms } from "../types/global";
import { createThunk } from "../slices/rooms/roomsThunk";
import photo from "../images/hab.webp";
import Button from "../components/Button";
import Popup from "../components/Popup";


const initialDataRoom = {
    Foto: "",
    number: "",
    BedType: "",
    Facilities: [],
    Rate: undefined,
    OfferPrice: undefined,
    Status: "",
    RoomFloor: "",

}

export interface InfoPopup {
    title: string;
    info: string;
}


function CreateRoom() {
    const dispatch: AppDispatch = useDispatch();
    const [openPopup, setOpenPopup] = useState(false);
    const [infoPopup, setInfoPopup] = useState<InfoPopup>({ title: '', info: '' });

    const [dataRoom, setDataRoom] = useState<DataRooms>({
        Foto: "",
        number: "",
        BedType: "",
        Facilities: [],
        Rate: undefined,
        OfferPrice: undefined,
        Status: "",
        RoomFloor: "",

    })

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, } = e.target;
        if (name !== "number") {
            setDataRoom({ ...dataRoom, [name]: value });
        } else {

            const formatted = /^\d{0,3}$/.test(value) ? value : dataRoom[name]

            setDataRoom({ ...dataRoom, [name]: formatted });
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !dataRoom.BedType ||
            !dataRoom.Facilities ||
            !dataRoom.Foto ||
            !dataRoom.OfferPrice ||
            !dataRoom.Rate ||
            !dataRoom.Status ||
            !dataRoom.RoomFloor ||
            !dataRoom.number
        ) {
            setOpenPopup(true);
            setInfoPopup({
                title: "Formulario no valido",
                info: "Rellena todos los campos correctamente"
            })
        } else {
            setDataRoom(initialDataRoom);
            dispatch(createThunk(dataRoom));
        }

    };




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
                type="number"
                name="number"
                value={dataRoom.number}
                autoComplete="disabled"
                onChange={handleChange}
            />

            <label>Bed Type</label>

            <select
                name="BedType"
                onChange={handleChange}
                value={dataRoom.BedType}
            >
                <option value="">Select Room Type</option>
                <option value="SingleBed">Single Bed</option>
                <option value="DoubleBed">Double Bed</option>
                <option value="DoubleSuperior">Double Superior</option>
                <option value="Suite">Suite</option>
            </select>

            <label>Facilities</label>

            <select
                name="Facilities"
                onChange={handleChange}
                value={dataRoom.Facilities}
                multiple={true}

            >
                <option value="">Select Facilities</option>
                <option value="Jacuzzi">Jacuzzi </option>
                <option value="MiniBar">Mini bar</option>
                <option value="Nespresso">Nespresso</option>
                <option value="Wifi">Wifi</option>
                <option value="CajaFuerte">Caja fuerte</option>
                <option value="TVSatelite">TV satelite</option>
            </select>

            <label>Rate</label>

            <input
                type="number"
                name="Rate"
                value={dataRoom.Rate}
                autoComplete="disabled"
                placeholder="Rate"
                onChange={handleChange}
            />

            <label>Offer Price</label>

            <input
                type="number"
                name="OfferPrice"
                value={dataRoom.OfferPrice}
                autoComplete="disabled"
                placeholder="Offer Price"
                onChange={handleChange}
            />

            <label>Status</label>

            <select
                name="Status"
                onChange={handleChange}
                value={dataRoom.Status}
            >
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

            <Button color="green" type="submit" name="Crear" />
            {openPopup && (
                <Popup
                    infoPopup={infoPopup}
                    setOpenPopup={setOpenPopup}
                    openPopup={openPopup}
                />
            )}
        </form>
    )
}

export default CreateRoom