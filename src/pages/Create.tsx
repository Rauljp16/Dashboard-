import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '../components/Button';


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
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [job, setJob] = useState<string>("")
    const [phone, setPhone] = useState<string>("")


    const [formData, setFormData] = useState<FormData>({
        file: null,
        name: '',
        job: '',
        email: '',
        phone: '',
        startDate: '',
        description: '',
        state: '',
        password: '',
    });
    const [preview, setPreview] = useState<string>('');

    const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        //setFormData({ ...formData, name: name });
    };
    const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };
    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };
    const jobChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setJob(e.target.value)
    };
    const phoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };


    console.log("name: " + name);
    console.log("email:" + email);
    console.log("password:" + password);
    console.log("job:" + job);
    console.log("phone:" + phone);



    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        if (selectedFile) {
            setFormData({ ...formData, file: selectedFile });
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreview(fileReader.result as string);
            };
            fileReader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Aquí puedes manejar el envío del formulario
        // Por ejemplo, puedes usar FormData para enviar el archivo al servidor
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        if (formData.file) {
            formDataToSend.append('file', formData.file);
        }
        // Realiza la solicitud al servidor con formDataToSend
        console.log(formDataToSend);
    };

    return (
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: "center", gap: "10px" }} onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={nameChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={emailChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                onChange={passwordChange}
            />
            <select onChange={jobChange}>
                <option value="" >Seleccione una opción</option>
                <option value="Manager">Manager</option>
                <option value="Receptión ">Receptión</option>
                <option value="Rooms service">Rooms service</option>
            </select>
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={phoneChange}
            />
            <div>
                <label htmlFor="file">Subir foto:</label>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            {preview && (
                <img src={preview} alt="Vista previa" />
            )}
            <Button color="green" type="submit" name="Crear" />
        </form>
    );
};

export default Create;
