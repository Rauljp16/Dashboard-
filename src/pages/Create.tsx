import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '../components/Button';
import photo from "../images/users.webp"


interface FormData {
    file: File | null;
    name: string;
    job: string;
    email: string;
    phone: string;
    startDate: string;
    description: string;
    state: string;
    password: string;
}

function Create() {
    const [name, setName] = useState<string>("")
    const [job, setJob] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [startDate, setStartDate] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [state, setState] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    // const [formData, setFormData] = useState<FormData>({
    //     photo: '',
    //     name: '',
    //     job: '',
    //     email: '',
    //     phone: '',
    //     startDate: '',
    //     description: '',
    //     state: '',
    //     password: '',
    // });

    const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        //setFormData({ ...formData, name: name });
    };
    const jobChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setJob(e.target.value)
    };
    const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };
    const phoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };
    const startDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };
    const descriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };
    const stateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setState(e.target.value);
    };
    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Aquí puedes manejar el envío del formulario
        // Por ejemplo, puedes usar FormData para enviar el archivo al servidor
        // const formDataToSend = new FormData();
        // formDataToSend.append('name', formData.name);
        // formDataToSend.append('email', formData.email);
        // formDataToSend.append('password', formData.password);
        // Realiza la solicitud al servidor con formDataToSend
        //console.log(formDataToSend);
        console.log("name: " + name);
        console.log("job:" + job);
        console.log("email:" + email);
        console.log("phone:" + phone);
        console.log("startDate:" + startDate);
        console.log("description:" + description);
        console.log("state:" + state);
        console.log("password:" + password);

    };

    return (
        <form autoComplete='off' style={{ display: 'flex', flexDirection: 'column', alignItems: "center", gap: "10px" }} onSubmit={handleSubmit}>
            <div >
                <img style={{ width: "60px", height: "60px" }} src={photo} alt="imagen de usuario" />
            </div>
            <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Name"
                onChange={nameChange}
            />
            <input
                type="text"
                name="phone"
                autoComplete="off"
                placeholder="Phone"
                onChange={phoneChange}
            />
            <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Email"
                onChange={emailChange}
            />
            <input
                type="text"
                name="description"
                autoComplete="off"
                placeholder="Description"
                onChange={descriptionChange}
            />
            <input
                type="date"
                name="startDate"
                autoComplete="off"
                placeholder="Start Date"
                onChange={startDateChange}
            />
            <input
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Password"
                onChange={passwordChange}
            />
            <select onChange={stateChange}>
                <option value="" >Select state</option>
                <option value="Active">Active</option>
                <option value="Inactive ">Inactive</option>
            </select>
            <select onChange={jobChange}>
                <option value="" >Select job</option>
                <option value="Manager">Manager</option>
                <option value="Receptión ">Receptión</option>
                <option value="Rooms service">Rooms service</option>
            </select>
            <Button color="green" type="submit" name="Crear" />
        </form>
    );
};

export default Create;
