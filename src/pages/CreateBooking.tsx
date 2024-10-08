import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { ChangeEvent, FormEvent, useState } from "react";
import { DataBookings } from "../types/global";
import { createThunk } from "../slices/bookings/bookingsThunk";
import Button from "../components/Button";
import Popup from "../components/Popup";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import createImage from "../images/create.webp";

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
    background-color: #e9e9e9c3;
    border-radius: 4px;
    box-shadow: 0px 0px 18px #0033256a;
    margin: 30px;
    overflow: auto;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    flex-direction: column;
    justify-content: space-between;
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
  /* border-bottom: 2px solid #007455; */
  background: #00745589;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #00000029; 
  }

`;
const InputDate = styled.input`
  padding: 6px 8px;
  margin-bottom: 20px;
  width: 100%;
  border: none;
  border-radius: 4px;
  /* border-bottom: 2px solid #007455; */
  background: #00745589;
  &:focus {
    outline: none;
  }
  &::-webkit-datetime-edit {
    color: #00000029; 
  }
`;

const Select = styled.select`
  padding: 6px;
  width: 100%;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  /* border-bottom: 2px solid #007455; */
  background: #00745589;
  color: #00000029;
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
border-radius: 4px;
object-fit: cover;
`;
const LinkTo = styled(Link)`
position: absolute;
display: flex;
align-items: center;
gap: 6px;
right: 30px;
top: 30px;
color: red;
font-size: 22px;
font-weight: 600;
z-index: 1;
text-decoration:none;
background-color: #e9e9e9c3;
padding: 0px 6px;
border-radius: 4px;
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
    }
  };

  return (
    <Container>
      <ImgStyled src={createImage} alt="habitacion de hotel" />
      <FormWrapper onSubmit={handleSubmit}>
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
              <option value="checkin">Check In</option>
              <option value="checkout">Check Out</option>
              <option value="inprogress">In Progress</option>
            </Select>{" "}
          </DivInput>
        </DivForm>

        <DivButton>
          <ButtonStyled type="submit" name="Crear">Create</ButtonStyled>
        </DivButton>
        {openPopup && (
          <Popup
            infoPopup={infoPopup}
            setOpenPopup={setOpenPopup}
            openPopup={openPopup}
          />
        )}
      </FormWrapper>
      <LinkTo to="/bookings">
        <TbArrowBackUp />
        Back
      </LinkTo>
    </Container>
  );
}

export default CreateBooking;
