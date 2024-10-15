import React, { useState, ChangeEvent, FormEvent } from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { createThunk } from "../slices/users/usersThunk";
import { DataUsers } from "../types/global";
import Popup from "../components/Popup";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import createUser from "../../public/hotelNewUser.webp";
import userImage from "../../public/users.webp";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  height: 100%;
`;

const FormWrapper = styled.form`
  width: 50%;
  display: flex;
  gap: 5px;
  padding: 40px;
  background-color: #e9e9e9e8;
  border-radius: 8px 0px 0px 8px;
  box-shadow: 0px 0px 18px #0033256a;
  overflow: auto;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 7px 8px;
  margin-bottom: 20px;
  width: 100%;
  border: none;
  border-bottom: 2px solid #007455;
  background: transparent;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #00000081;
  }
`;

const Select = styled.select`
  padding: 6px;
  width: 100%;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #007455;
  background: transparent;
  color: #00000081;
`;

const DivButton = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const ButtonStyled = styled.button`
  width: 100%;
  background-color: #007455;
  border: none;
  border-radius: 4px;
  padding: 10px;
  color: #ffffff;
  letter-spacing: 1px;
  font-size: 22px;
  cursor: pointer;
  margin-top: 50px;
  transition: all 0.1s ease-in-out;
  &:hover {
    scale: 1.02;
    box-shadow: 0px 0px 18px #0033256a;
  }
`;

const DivForm = styled.div`
  width: 100%;
  display: flex;
  gap: 12%;
`;

const DivInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ImgStyled = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
  object-position: 0% 0%;
`;

const LinkTo = styled(Link)`
  position: absolute;
  left: 20px;
  top: 20px;
  color: #000000;
  font-size: 23px;
  z-index: 1;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
  &:hover {
    scale: 1.2;
  }
`;

const initialDataUser = {
    foto: userImage,
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

function CreateUser() {
    const dispatch: AppDispatch = useDispatch();
    const [openPopup, setOpenPopup] = useState(false);
    const [infoPopup, setInfoPopup] = useState<InfoPopup>({ title: "", info: "" });

    const [dataUser, setDataUser] = useState<DataUsers>(initialDataUser);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name !== "contact") {
            setDataUser({ ...dataUser, [name]: value });
        } else {
            const cleaned = value.replace(/\D/g, "");
            const formatted = cleaned.replace(/(.{3})(?=.)/g, "$1-");
            setDataUser({ ...dataUser, [name]: formatted });
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !dataUser.name ||
            !dataUser.job ||
            !dataUser.email ||
            !dataUser.contact ||
            !dataUser.startDate ||
            !dataUser.description ||
            !dataUser.status ||
            !dataUser.password
        ) {
            setOpenPopup(true);
            setInfoPopup({
                title: "Formulario no válido",
                info: "Rellena todos los campos correctamente",
            });
        } else {
            setDataUser(initialDataUser);
            dispatch(createThunk(dataUser));
            setOpenPopup(true);
            setInfoPopup({
                title: "Usuario",
                info: "Usuario creado correctamente",
            });

        }
    };

    return (
        <Container>
            <ImgStyled src={createUser} alt="imagen predeterminada de usuario" />
            <FormWrapper onSubmit={handleSubmit}>
                <DivForm>
                    <DivInput>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={dataUser.name}
                            autoComplete="off"
                            placeholder="Name"
                            onChange={handleChange}
                        />
                    </DivInput>
                    <DivInput>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={dataUser.email}
                            autoComplete="off"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                    </DivInput>
                </DivForm>
                <DivForm>
                    <DivInput>
                        <Label>Phone</Label>
                        <Input
                            type="text"
                            name="contact"
                            value={dataUser.contact}
                            autoComplete="off"
                            placeholder="Phone"
                            onChange={handleChange}
                        />
                    </DivInput>
                    <DivInput>
                        <Label>Start Date</Label>
                        <Input
                            type="date"
                            name="startDate"
                            value={dataUser.startDate}
                            autoComplete="off"
                            onChange={handleChange}
                        />
                    </DivInput>
                </DivForm>
                <DivForm>
                    <DivInput>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={dataUser.description}
                            autoComplete="off"
                            placeholder="Description"
                            onChange={handleChange}
                        />
                    </DivInput>
                    <DivInput>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={dataUser.password}
                            autoComplete="off"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </DivInput>
                </DivForm>
                <DivForm>
                    <DivInput>
                        <Label>Status</Label>
                        <Select
                            name="status"
                            onChange={handleChange}
                            value={dataUser.status}
                        >
                            <option value="">Select status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </Select>
                    </DivInput>
                    <DivInput>
                        <Label>Job</Label>
                        <Select name="job" onChange={handleChange} value={dataUser.job}>
                            <option value="">Select job</option>
                            <option value="Manager">Manager</option>
                            <option value="Reception">Reception</option>
                            <option value="Room service">Room service</option>
                        </Select>
                    </DivInput>
                </DivForm>

                <DivButton>
                    <ButtonStyled type="submit">Create</ButtonStyled>
                </DivButton>
                <LinkTo to="/users">
                    <HiArrowLeft />
                </LinkTo>
            </FormWrapper>
            {openPopup && (
                <Popup
                    infoPopup={infoPopup}
                    setOpenPopup={setOpenPopup}
                    openPopup={openPopup}
                />
            )}
        </Container>
    );
}

export default CreateUser;
