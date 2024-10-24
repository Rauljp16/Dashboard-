import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { ChangeEvent, FormEvent, useState } from "react";
import { DataBookings } from "../types/global";
import { createThunk } from "../slices/bookings/bookingsThunk";
import Button from "../components/Button";
import Popup from "../components/Popup";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import createImage from "../../public/create.webp";

const Container = styled.div`
max-width: 1200px;
max-height: 650px;
margin: 0 auto;
position: relative;
display: flex;
height: 100%;
`;

const FormWrapper = styled.form`
position: relative;
    width: 50%;
    display: flex;
    gap: 5px;
    padding: 80px 40px 40px;
    background-color: #ffffffc0;
    border-radius: 8px 0px 0px 8px;
    box-shadow: 0px 0px 18px #0033256a;
    overflow: auto;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    flex-direction: column;
    justify-content: center;
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
const InputDate = styled.input`
  padding: 6px 8px;
  margin-bottom: 20px;
  width: 100%;
  border: none;
  border-bottom: 2px solid #007455;
  background: transparent;
  &:focus {
    outline: none;
  }
  &::-webkit-datetime-edit {
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
margin-top: 20px;
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
width:100%;
height: 100%;
border-radius: 16px;
object-fit: cover;
object-position: 0% 0%;
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

  const [dataBooking, setDataBooking] =
    useState<DataBookings>(initialDataBooking);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name !== "RoomNumber") {
      setDataBooking({ ...dataBooking, [name]: value });
    } else {
      const formatted = /^\d{0,3}$/.test(value) ? value : dataBooking[name];
      setDataBooking({ ...dataBooking, [name]: formatted });
    }
  };

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
      setOpenPopup(true);
      setInfoPopup({
        title: "Booking",
        info: "Booking creada correctamente",
      });

    }
  };

  return (
    <Container>
      <ImgStyled src={createImage} alt="habitacion de hotel" />
      <FormWrapper onSubmit={handleSubmit}>
        <TitleContainer>
          <Title>Create Bookings</Title>
        </TitleContainer>
        <DivForm>
          <DivInput>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="Name"
              value={dataBooking.Name}
              autoComplete="off"
              placeholder="Name"
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <Label>Order Date</Label>
            <InputDate
              type="date"
              name="OrderDate"
              value={dataBooking.OrderDate}
              autoComplete="off"
              onChange={handleChange}
            />
          </DivInput>
        </DivForm>
        <DivForm>
          <DivInput>
            <Label>Check In</Label>
            <InputDate
              type="date"
              name="CheckIn"
              value={dataBooking.CheckIn}
              autoComplete="off"
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <Label>Check Out</Label>
            <InputDate
              type="date"
              name="CheckOut"
              value={dataBooking.CheckOut}
              autoComplete="off"
              onChange={handleChange}
            />
          </DivInput>
        </DivForm>
        <DivForm>
          <DivInput>
            <Label>Special Request</Label>
            <Input
              type="text"
              name="SpecialRequest"
              value={dataBooking.SpecialRequest}
              autoComplete="off"
              placeholder="Special Request"
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <Label>Room Number</Label>
            <Input
              type="text"
              name="RoomNumber"
              value={dataBooking.RoomNumber}
              autoComplete="off"
              placeholder="Room Number"
              onChange={handleChange}
            />
          </DivInput>
        </DivForm>
        <DivForm>
          <DivInput>
            <Label>Room Type</Label>
            <Select
              name="RoomType"
              onChange={handleChange}
              value={dataBooking.RoomType}
            >
              <option value="">Select Room Type</option>
              <option value="SingleBed">Single Bed</option>
              <option value="DoubleBed">Double Bed</option>
              <option value="DoubleSuperior">Double Superior</option>
              <option value="Suite">Suite</option>
            </Select>{" "}
          </DivInput>
          <DivInput>
            <Label>Status</Label>
            <Select
              name="Status"
              onChange={handleChange}
              value={dataBooking.Status}
            >
              <option value="">Select Status</option>
              <option value="Checking In">Check In</option>
              <option value="Check Out">Check Out</option>
              <option value="In Progress">In Progress</option>
            </Select>{" "}
          </DivInput>
        </DivForm>

        <DivButton>
          <ButtonStyled type="submit" name="Crear">Create</ButtonStyled>
        </DivButton>
        <LinkTo to="/bookings">
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

export default CreateBooking;
