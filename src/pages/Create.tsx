import React, { useState, ChangeEvent, FormEvent, useMemo } from "react";
import Button from "../components/Button";
import photo from "../images/users.webp";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { createThunk } from "../slices/users/usersThunk";
import { DataUsers } from "../types/global";
import Popup from "../components/Popup";

const initialDataUser = {
    foto: photo,
    name: "",
    job: "",
    email: "",
    contact: "",
    startDate: "",
    description: "",
    status: "",
    password: "",
};
export interface InfoPopup {
    title: string;
    info: string;
}


function Create() {
    const dispatch: AppDispatch = useDispatch();
    const [openPopup, setOpenPopup] = useState(false);
    const [infoPopup, setInfoPopup] = useState<InfoPopup>({ title: '', info: '' });



    const [dataUser, setDataUser] = useState<DataUsers>({
        foto: photo,
        name: "",
        job: "",
        email: "",
        contact: "",
        startDate: "",
        description: "",
        status: "",
        password: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name !== "contact") {
            setDataUser({ ...dataUser, [name]: value });
        } else {
            const cleaned = value.replace(/\D/g, '');

            const formatted = cleaned.replace(/(.{3})(?=.)/g, '$1-');

            setDataUser({ ...dataUser, [name]: formatted });
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !dataUser.foto ||
            !dataUser.contact ||
            !dataUser.description ||
            !dataUser.email ||
            !dataUser.job ||
            !dataUser.name ||
            !dataUser.password ||
            !dataUser.startDate ||
            !dataUser.status
        ) {
            setOpenPopup(true);
            setInfoPopup({
                title: "Formulario no valido",
                info: "Rellena todos los campos correctamente"
            })
        } else {
            setDataUser(initialDataUser);
            dispatch(createThunk(dataUser));
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
            <div>
                <img
                    style={{ width: "60px", height: "60px" }}
                    src={photo}
                    alt="imagen de usuario predeterminada"
                />
            </div>
            <input
                type="text"
                name="name"
                value={dataUser.name}
                autoComplete="disabled"
                placeholder="Name"
                onChange={handleChange}
            />
            <input
                type="text"
                name="contact"
                value={dataUser.contact}
                autoComplete="disabled"
                placeholder="Phone"
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                value={dataUser.email}
                autoComplete="disabled"
                placeholder="Email"
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                value={dataUser.description}
                autoComplete="disabled"
                placeholder="Description"
                onChange={handleChange}
            />
            <input
                type="date"
                name="startDate"
                value={dataUser.startDate}
                autoComplete="disabled"
                placeholder="Start Date"
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                value={dataUser.password}
                autoComplete="disabled"
                placeholder="Password"
                onChange={handleChange}
            />
            <select name="status" onChange={handleChange} value={dataUser.status}>
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            <select name="job" onChange={handleChange} value={dataUser.job}>
                <option value="">Select job</option>
                <option value="Manager">Manager</option>
                <option value="Reception">Reception</option>
                <option value="Room service">Room service</option>
            </select>
            <Button color="green" type="submit" name="Crear" />
            {openPopup && <Popup infoPopup={infoPopup} setOpenPopup={setOpenPopup} openPopup={openPopup} />}

        </form>
    );
}

export default Create;
