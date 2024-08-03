import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "../components/Button";
import photo from "../images/users.webp";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { createThunk } from "../slices/users/usersThunk";

interface UserData {
    foto: string;
    name: string;
    job: string;
    email: string;
    contact: string;
    startDate: string;
    description: string;
    status: string;
    password: string;
    _id?: string;
}
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
}

function Create() {
    const dispatch: AppDispatch = useDispatch()

    const [dataUser, setDataUser] = useState<UserData>({
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDataUser({ ...dataUser, [name]: value, });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDataUser(initialDataUser)
        dispatch(createThunk(dataUser))
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
            <select name="status" onChange={handleChange} value={dataUser.status}
            >
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
        </form>
    );
}

export default Create;
