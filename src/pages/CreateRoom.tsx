import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { ChangeEvent, FormEvent, useState } from "react";
import { DataRooms } from "../types/global";
import { createThunk } from "../slices/rooms/roomsThunk";
import Popup from "../components/Popup";
import styled from "styled-components";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import photo from "../../public/hab.webp";
import photoSingle from "../../public/single.webp";
import photoDouble from "../../public/double.webp";
import photoDoubleSup from "../../public/doubleSup.webp";
import photoSuite from "../../public/suite.webp";

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
  gap: 5px;
  padding: 40px;
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

const Select = styled.select`
  padding: 6px;
  width: 100%;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #007455;
  background: transparent;
  color: #00000081;
  outline: none;
`;
const SelectFacilities = styled.select`
  width: 100%;
  height: 90px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #007455;
  background: transparent;
  color: #00000081;
  outline: none;
  overflow: hidden;
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

const initialDataRoom = {
  Foto: "",
  number: "",
  BedType: "",
  Facilities: ["TV"],
  Rate: "",
  OfferPrice: "",
  Status: "",
  RoomFloor: "",
};

export interface InfoPopup {
  title: string;
  info: string;
}

function CreateRoom() {
  const dispatch: AppDispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [infoPopup, setInfoPopup] = useState<InfoPopup>({
    title: "",
    info: "",
  });

  const [dataRoom, setDataRoom] = useState<DataRooms>(initialDataRoom);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "number" || name === "Rate" || name === "OfferPrice") {
      const formatted = /^\d{0,3}$/.test(value)
        ? value
        : dataRoom[name as keyof DataRooms];
      setDataRoom({ ...dataRoom, [name]: formatted });
    } else {
      setDataRoom({ ...dataRoom, [name]: value });
    }
  };

  const handleSelectChange = (event: any) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option: any) => option.value
    );
    setDataRoom({
      ...dataRoom,
      Facilities: selectedValues,
    });
  };
  const handleChangeBed = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "BedType") {
      let imageUrl = "";

      switch (value) {
        case "SingleBed":
          imageUrl = photoSingle;
          break;
        case "DoubleBed":
          imageUrl = photoDouble;
          break;
        case "DoubleSuperior":
          imageUrl = photoDoubleSup;
          break;
        case "Suite":
          imageUrl = photoSuite;
          break;
        default:
          imageUrl = photo;
      }

      setDataRoom({ ...dataRoom, Foto: imageUrl, BedType: value });
    }
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !dataRoom.BedType ||
      !dataRoom.Facilities ||
      !dataRoom.Foto ||
      !dataRoom.OfferPrice ||
      !dataRoom.Rate ||
      !dataRoom.Status ||
      !dataRoom.RoomFloor ||
      !dataRoom.number
    ) {
      setOpenPopup(true);
      setInfoPopup({
        title: "Formulario no valido",
        info: "Rellena todos los campos correctamente",
      });
    } else {
      setDataRoom(initialDataRoom);
      dispatch(createThunk(dataRoom));
      setOpenPopup(true);
      setInfoPopup({
        title: "Room",
        info: "Room creada correctamente",
      });
    }
  };

  return (
    <Container>
      <ImgStyled src={photo} alt="imagen de habitacion predeterminada" />
      <FormWrapper onSubmit={handleSubmit}>
        <TitleContainer>
          <Title>Create Room</Title>
        </TitleContainer>

        <DivForm>
          <DivInput>
            <Label>Room Number</Label>
            <Input
              type="text"
              name="number"
              value={dataRoom.number}
              autoComplete="disabled"
              onChange={handleChange}
              placeholder="Room Number"
            />
          </DivInput>
          <DivInput>
            <Label>Bed Type</Label>
            <Select
              name="BedType"
              onChange={handleChangeBed}
              value={dataRoom.BedType}
            >
              <option value="">Select Bed Type</option>
              <option value="SingleBed">Single Bed</option>
              <option value="DoubleBed">Double Bed</option>
              <option value="DoubleSuperior">Double Superior</option>
              <option value="Suite">Suite</option>
            </Select>
          </DivInput>
        </DivForm>
        <DivForm>
          <DivInput>
            <Label>Facilities</Label>
            <SelectFacilities
              multiple
              name="Facilities"
              value={dataRoom.Facilities}
              onChange={handleSelectChange}
            >
              <option value="Wifi">Wifi</option>
              <option value="TV">TV</option>
              <option value="Minibar">Minibar</option>
              <option value="AireAcondicionado">Aire Acondicionado</option>
              <option value="Jacuzzi">Jacuzzi</option>
            </SelectFacilities>
          </DivInput>
        </DivForm>
        <DivForm>
          <DivInput>
            <Label>Rate</Label>
            <Input
              type="text"
              name="Rate"
              value={dataRoom.Rate}
              autoComplete="disabled"
              placeholder="Rate"
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <Label>Offer Price</Label>
            <Input
              type="text"
              name="OfferPrice"
              value={dataRoom.OfferPrice}
              autoComplete="disabled"
              placeholder="Offer Price"
              onChange={handleChange}
            />
          </DivInput>
        </DivForm>
        <DivForm>
          <DivInput>
            <Label>Status</Label>
            <Select
              name="Status"
              onChange={handleChange}
              value={dataRoom.Status}
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </Select>
          </DivInput>
          <DivInput>
            <Label>Room Floor</Label>
            <Select
              name="RoomFloor"
              onChange={handleChange}
              value={dataRoom.RoomFloor}
            >
              <option value="">Select Floor</option>
              <option value="Floor 1">Floor 1</option>
              <option value="Floor 2">Floor 2</option>
              <option value="Floor 3">Floor 3</option>
              <option value="Floor 4">Floor 4</option>
            </Select>
          </DivInput>
        </DivForm>
        <DivButton>
          <ButtonStyled type="submit">Create</ButtonStyled>
        </DivButton>
        <LinkTo to="/rooms">
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

export default CreateRoom;
