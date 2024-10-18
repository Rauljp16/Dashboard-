import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchSingleThunk, updateThunk } from "../slices/users/usersThunk";
import { DataUsers } from "../types/global";
import Popup from "../components/Popup";
import styled from "styled-components";
import editImage from "../../public/edit.webp";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const Container = styled.div`
max-width: 1200px;
max-height: 650px;
margin: 0 auto;
position: relative;
display: flex;
height: 100%;
`;

const FormWrapper = styled.form`
  width: 50%;
  display: flex;
  padding: 70px 40px 40px;
  background-color: #ffffffab;
  border-radius: 8px 0px 0px 8px;
  box-shadow: 0px 0px 18px #0033256a;
  overflow: auto;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  flex-direction: column;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #007455;
  text-align: center;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 28px;
  letter-spacing: 1px;
`;

const DivImg = styled.div`
  width: 90px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto ;
`;

const EditImgStyled = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 7px 8px;
  margin-bottom: 10px;
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
  margin-bottom: 10px;
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
  margin-top: 25px;
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
  object-position: 0% 70%;
`;

const LinkTo = styled(Link)`
  position: absolute;
  left: 0px;
  top: 0px;
  color: #007455;
  font-size: 33px;
  z-index: 1;
  text-decoration: none;
  transition: all 0.1s ease-in-out;
  padding: 12px;

  &:hover {
    scale: 1.1;
    filter: drop-shadow(0px 0px 4px #007455);
  }
`;

export interface InfoPopup {
    title: string;
    info: string;
}

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
            setOpenPopup(true);
            setInfoPopup({
                title: "Edit",
                info: "User editado correctamente",
            });
        }
    };

    if (!singleUser) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <ImgStyled src={editImage} alt="Editar usuario" />
            <FormWrapper onSubmit={handleSubmit}>
                <TitleContainer>
                    <Title>Edit User</Title>
                </TitleContainer>
                <DivImg>
                    <EditImgStyled src={`/${dataUser.foto}`} alt="Imagen de usuario" />
                </DivImg>
                <DivForm>
                    <DivInput>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={dataUser.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                    </DivInput>
                    <DivInput>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={dataUser.email}
                            onChange={handleChange}
                            placeholder="Email"
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
                            onChange={handleChange}
                            placeholder="Phone"
                        />
                    </DivInput>
                    <DivInput>
                        <Label>Job</Label>
                        <Select name="job" onChange={handleChange} value={dataUser.job}>
                            <option value="">Select Job</option>
                            <option value="Manager">Manager</option>
                            <option value="Reception">Reception</option>
                            <option value="Room service">Room service</option>
                        </Select>
                    </DivInput>
                </DivForm>
                <DivForm>
                    <DivInput>
                        <Label>Status</Label>
                        <Select name="status" onChange={handleChange} value={dataUser.status}>
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </Select>
                    </DivInput>
                    <DivInput>
                        <Label>Start Date</Label>
                        <Input
                            type="date"
                            name="startDate"
                            value={dataUser.startDate}
                            onChange={handleChange}
                            placeholder="Start Date"
                        />
                    </DivInput>
                </DivForm>
                <DivForm>
                    <DivInput>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={dataUser.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </DivInput>
                    <DivInput>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            value={dataUser.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                    </DivInput>
                </DivForm>
                <DivButton>
                    <ButtonStyled type="submit">Edit User</ButtonStyled>
                </DivButton>
            </FormWrapper>
            <LinkTo to="/users">
                <HiArrowLeft />
            </LinkTo>

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

export default EditUser;
