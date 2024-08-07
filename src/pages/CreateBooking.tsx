import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { ChangeEvent, FormEvent, useState } from "react";
import { DataBookings } from "../types/global";
import { createThunk } from "../slices/bookings/bookingsThunk";
import Button from "../components/Button";
import Popup from "../components/Popup";

const initialDataBooking = {
    Name: "",
    OrderDate: "",
    CheckIn: "",
    CheckOut: "",
    SpecialRequest: "",
    RoomType: "",
    RoomNumber: "",
    Status: "",
};

export interface InfoPopup {
    title: string;
    info: string;
}

function CreateBooking() {
    const dispatch: AppDispatch = useDispatch();
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

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name !== "RoomNumber") {
            setDataBooking({ ...dataBooking, [name]: value });
        } else {

            const formatted = /^\d{0,3}$/.test(value) ? value : dataBooking[name]

            setDataBooking({ ...dataBooking, [name]: formatted });
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !dataBooking.Name ||
            !dataBooking.OrderDate ||
            !dataBooking.CheckIn ||
            !dataBooking.CheckOut ||
            !dataBooking.SpecialRequest ||
            !dataBooking.RoomType ||
            !dataBooking.RoomNumber ||
            !dataBooking.Status
        ) {
            setOpenPopup(true);
            setInfoPopup({
                title: "Formulario no valido",
                info: "Rellena todos los campos correctamente",
            });
        } else {
            setDataBooking(initialDataBooking);
            dispatch(createThunk(dataBooking));
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
                <option value="SingleBed">Single Bed</option>
                <option value="DoubleBed">Double Bed</option>
                <option value="DoubleSuperior">Double Superior</option>
                <option value="Suite">Suite</option>
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

            <Button color="green" type="submit" name="Crear" />
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

export default CreateBooking;
