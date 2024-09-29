import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/rooms/roomsThunk";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { Column } from "../types/global";
import { AppDispatch, RootState } from "../store";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Table from "../components/Table";
import Loading from "../components/Loading";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  /* Add styles for input */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
    /* Customize image styles */
  }
`;

const RoomItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PStyledLink = styled.p`
  color: #007455;
  font-size: 12px;
`;

const StatusAvailable = styled.button`
  background-color: #5AD07A;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
`;
const StatusBooked = styled.button`
  background-color: #E23428;
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
    return dataRoom;
  }, [dataRoom]);

  if (!fetched) return <Loading />;

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
      headerColumn: "Facilities",
      columnsData: "Facilities",
      columnRenderer: (row) => <p>{row.Facilities.join(", ")}</p>,
    },
    {
      headerColumn: "Rate",
      columnsData: "Rate",
      columnRenderer: (row) => (
        <DivPrice>
          <p style={{ fontWeight: "600" }}>${row.Rate}</p>
          <p style={{ color: "#007455", fontSize: "14px" }}>/night</p>
        </DivPrice>
      ),
    },
    {
      headerColumn: "Status",
      columnsData: "Status",
      columnRenderer: (row) =>
        row.Status === "Booked" ? (
          <StatusAvailable >{row.Status}</StatusAvailable>
        ) : (
          <StatusBooked >{row.Status}</StatusBooked>
        ),
    },
    {
      headerColumn: "",
      columnsData: "delete",
      columnRenderer: (row) => (
        <IconContainer>
          <Link to={`/rooms/edit/${row._id}`} >
            <RiEdit2Line style={{ textDecoration: "none", color: "black" }} />
          </Link>
          <RiDeleteBin5Line onClick={() => deleteItem(row._id)} />
        </IconContainer>
      ),
    },
  ];

  return (
    <>
      <Container>
        <StyledInput type="text" placeholder="Search..." />
        <Link to="/rooms/create">
          <StyledButton color="green" name="New Room" />
        </Link>
      </Container>
      <Table columns={columns} data={dataRoomState} />
    </>
  );
}

export default Rooms;
