import { useParams } from "react-router-dom";
import { DataRooms } from "../types/global";
import Popup from "../components/Popup";
import styled from "styled-components";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchSingleThunk, updateThunk } from "../slices/rooms/roomsThunk";
import editImage from "../../public/images/edit.webp";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import photo from "../images/hab.webp";

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
  background-color: #e9e9e9d8;
  border-radius: 8px 0px 0px 8px;
  box-shadow: 0px 0px 18px #0033256a;
  overflow: auto;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  flex-direction: column;
  justify-content: center;
`;

const DivImg = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto 16px;
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
  object-position: 0% 70%;
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

export interface InfoPopup {
  title: string;
  info: string;
}

function EditRoom() {
  const dispatch: AppDispatch = useDispatch();
  const { _id } = useParams<{ _id: string }>();
  const singleRoom = useSelector(
    (state: RootState) => state.roomSlice.singleRoom
  );
  const [openPopup, setOpenPopup] = useState(false);
  const [infoPopup, setInfoPopup] = useState<InfoPopup>({
    title: "",
    info: "",
  });

  const [dataRoom, setDataRoom] = useState<DataRooms>({
    Foto: "",
    number: "",
    BedType: "",
    Facilities: ["TV"],
    Rate: "",
    OfferPrice: "",
    Status: "",
    RoomFloor: "",
  });

  useEffect(() => {
    if (_id) {
      dispatch(fetchSingleThunk(_id));
    }
  }, [dispatch, _id]);

  useEffect(() => {
    if (singleRoom) {
      setDataRoom(singleRoom);
    }
  }, [singleRoom]);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !dataRoom.BedType ||
      !dataRoom.Facilities ||
      !dataRoom.Foto ||
      !dataRoom.OfferPrice ||
      !dataRoom.number ||
      !dataRoom.Rate ||
      !dataRoom.RoomFloor ||
      !dataRoom.Status
    ) {
      setOpenPopup(true);
      setInfoPopup({
        title: "Formulario no válido",
        info: "Rellena todos los campos correctamente",
      });
    } else {
      dispatch(updateThunk(dataRoom));
      setOpenPopup(true);
      setInfoPopup({
        title: "Edit",
        info: "Room editada correctamente",
      });

    }
  };

  if (!singleRoom) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ImgStyled src={editImage} alt="Editar habitación" />
      <FormWrapper onSubmit={handleSubmit}>
        <DivImg>
          <Label>Photo</Label>
          <EditImgStyled src={photo} alt="imagen de habitación" />
        </DivImg>
        <DivForm>
          <DivInput>
            <Label>Room Number</Label>
            <Input
              type="text"
              name="number"
              value={dataRoom.number}
              autoComplete="disabled"
              onChange={handleChange}
            />
          </DivInput>
          <DivInput>
            <Label>Bed Type</Label>
            <Select
              name="BedType"
              onChange={handleChange}
              value={dataRoom.BedType}
            >
              <option value="">Select Room Type</option>
              <option value="SingleBed">Single Bed</option>
              <option value="DoubleBed">Double Bed</option>
              <option value="DoubleSuperior">Double Superior</option>
              <option value="Suite">Suite</option>
            </Select>
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
              <option value="">Select floor</option>
              <option value="Floor 1">Floor 1</option>
              <option value="Floor 2">Floor 2</option>
              <option value="Floor 3">Floor 3</option>
              <option value="Floor 4">Floor 4</option>
            </Select>
          </DivInput>
        </DivForm>
        <DivButton>
          <ButtonStyled type="submit" aria-label="Editar habitación">
            Edit Room
          </ButtonStyled>
        </DivButton>
      </FormWrapper>

      <LinkTo to={`/rooms`}>
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

export default EditRoom;
