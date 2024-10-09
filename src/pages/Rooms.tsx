import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/rooms/roomsThunk";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { Column, DataRooms } from "../types/global";
import { AppDispatch, RootState } from "../store";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Table from "../components/Table";
import Loading from "../components/Loading";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
  margin-bottom: 20px;
`;

const SelectInput = styled.select`
  padding: 8px;
  border: 1px solid #007455;
  border-radius: 4px;
  font-size: 1rem;
  color: #007455;
`;

const StyledButton = styled(Button)`
  /* Add styles for button if needed */
`;

const RoomItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  img {
    width: 90px;
    border-radius: 4px;
  }
`;

const RoomItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledLink = styled(Link)`
  transform: scaleY(1.4);
`;

const PStyledLink = styled.p`
  color: #007455;
  font-size: 12px;
`;

const StatusAvailable = styled.button`
  background-color: #5ad07a;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
`;
const StatusBooked = styled.button`
  background-color: #e23428;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 5px;
  font-size: 18px;
`;

const DivPrice = styled.div`
  display: flex;
  gap: 4px;
  align-items: flex-end;
`;

function Rooms() {
  const dataRoom = useSelector((state: RootState) => state.roomSlice.dataRoom);
  const dispatch: AppDispatch = useDispatch();
  const [fetched, setFectched] = useState(false);
  const [dataFinal, setDataFinal] = useState<DataRooms[]>([]);

  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchAllThunk()).unwrap();
      setFectched(true);
    };
    initialFetch();
  }, [dispatch]);

  function deleteItem(_id: string) {
    dispatch(deleteThunk(_id));
  }

  const dataRoomState = useMemo(() => {
    if (!dataRoom.length) return [];
    setDataFinal(dataRoom);
    return dataRoom;
  }, [dataRoom]);

  if (!fetched) return <Loading />;

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    switch (value) {
      case "Status":
        setDataFinal(
          [...dataRoomState].sort((a, b) => a.Status.localeCompare(b.Status))
        );
        break;
      case "OfferPrice":
        setDataFinal(
          [...dataRoomState].sort((a, b) => Number(a.OfferPrice) - Number(b.OfferPrice)));
        console.log(dataFinal);
        break;
      default:
        setDataFinal(
          [...dataRoomState].sort((a, b) => a.number.localeCompare(b.number))
        );
    }
  };

  const columns: Column[] = [
    {
      headerColumn: "Room Name",
      columnsData: "RoomName",
      columnRenderer: (row) => (
        <Link to={row._id} style={{ textDecoration: "none" }}>
          <RoomItem>
            <img src={row.Foto} alt="Room" />
            <RoomItemInfo>
              <PStyledLink>#{row._id}</PStyledLink>
              <PStyledLink>Nº {row.number}</PStyledLink>
            </RoomItemInfo>
          </RoomItem>
        </Link>
      ),
    },
    {
      headerColumn: "Bed Type",
      columnsData: "BedType",
    },
    {
      headerColumn: "Room Floor",
      columnsData: "RoomFloor",
    },
    {
      headerColumn: "Amenities",
      columnsData: "Amenities",
      columnRenderer: (row) => <p>{row.Facilities.join(", ")}</p>,
    },
    {
      headerColumn: "Price",
      columnsData: "Price",
      columnRenderer: (row) => (
        <DivPrice>
          <p style={{ fontWeight: "600" }}>${row.OfferPrice}</p>
          <p style={{ color: "#007455", fontSize: "14px" }}>/night</p>
        </DivPrice>
      ),
    },
    {
      headerColumn: "Status",
      columnsData: "Status",
      columnRenderer: (row) =>
        row.Status === "Available" ? (
          <StatusAvailable>{row.Status}</StatusAvailable>
        ) : (
          <StatusBooked>{row.Status}</StatusBooked>
        ),
    },
    {
      headerColumn: "",
      columnsData: "delete",
      columnRenderer: (row) => (
        <IconContainer>
          <Link to={`/rooms/edit/${row._id}`}>
            <RiEdit2Line style={{ textDecoration: "none", color: "#009e74" }} />
          </Link>
          <RiDeleteBin5Line
            onClick={() => deleteItem(row._id)}
            style={{ color: "#9c0e0e", cursor: "pointer" }}
          />
        </IconContainer>
      ),
    },
  ];

  return (
    <>
      <Container>
        <SelectInput onChange={onChange} defaultValue="">
          <option value="" >
            Order by
          </option>
          <option value="Status">Status</option>
          <option value="OfferPrice">Price</option>
        </SelectInput>
        <StyledLink to="/rooms/create">
          <StyledButton color="green" name="New Room" />
        </StyledLink>
      </Container>
      <Table
        data={dataFinal.length ? dataFinal : dataRoomState}
        columns={columns}
      />
    </>
  );
}

export default Rooms;
