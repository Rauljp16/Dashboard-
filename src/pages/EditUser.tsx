import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchSingleThunk, updateThunk } from "../slices/users/usersThunk";
import { DataUsers } from "../types/global";
import Button from "../components/Button";
import { InfoPopup } from "./CreateUser";
import Popup from "../components/Popup";

function EditUser() {
    const dispatch: AppDispatch = useDispatch();
    const { _id } = useParams<{ _id: string }>();
    const singleUser = useSelector((state: RootState) => state.userSlice.singleUser);
    const [openPopup, setOpenPopup] = useState(false);
    const [infoPopup, setInfoPopup] = useState<InfoPopup>({ title: '', info: '' });

    const [dataUser, setDataUser] = useState<DataUsers>({
        foto: "",
        name: "",
        job: "",
        email: "",
        contact: "",
        startDate: "",
        description: "",
        status: "",
        password: "",
    });

    useEffect(() => {
        if (_id) {
            dispatch(fetchSingleThunk(_id));
        }
    }, [dispatch, _id]);

    useEffect(() => {
        if (singleUser) {
            setDataUser(singleUser);
        }
    }, [singleUser]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name !== "contact") {
            setDataUser(prevDataUser => ({ ...prevDataUser, [name]: value }));
        } else {
            const cleaned = value.replace(/\D/g, '');
            const formatted = cleaned.replace(/(.{3})(?=.)/g, '$1-');
            setDataUser(prevDataUser => ({ ...prevDataUser, [name]: formatted }));
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
                title: "Formulario no válido",
                info: "Rellena todos los campos correctamente"
            });
        } else {
            dispatch(updateThunk(dataUser));
        }
    };

    if (!singleUser) {
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
                <div>
                    <img
                        style={{ width: "60px", height: "60px" }}
                        src={`/${dataUser.foto}`}
                        alt="imagen de usuario predeterminada"
                    />
                </div>
                <input
                    type="text"
                    name="name"
                    value={dataUser.name}
                    autoComplete="off"
                    placeholder="Name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="contact"
                    value={dataUser.contact}
                    autoComplete="off"
                    placeholder="Phone"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    value={dataUser.email}
                    autoComplete="off"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    value={dataUser.description}
                    autoComplete="off"
                    placeholder="Description"
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="startDate"
                    value={dataUser.startDate}
                    autoComplete="off"
                    placeholder="Start Date"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    value={dataUser.password}
                    autoComplete="off"
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
                <Button color="green" type="submit" name="Update" />
                {openPopup && <Popup infoPopup={infoPopup} setOpenPopup={setOpenPopup} openPopup={openPopup} />}
            </form>
        </>
    );
}

export default EditUser;
