import Table from "../components/Table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/rooms/roomsThunk";
import { RiDeleteBin5Line } from "react-icons/ri";

function Rooms() {
  const dataRoom = useSelector((state) => state.roomSlice.dataRoom);
  const dispatch = useDispatch();
  const [fetched, setFectched] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchAllThunk()).unwrap();
      setFectched(true);
    };
    initialFetch();
  }, [dispatch]);

  function deleteItem(id) {
    dispatch(deleteThunk(id));
  }
  function openNote(e) {
    alert(e);
  }

  const dataRoomState = useMemo(() => {
    if (!dataRoom.length) return [];
    return dataRoom;
  }, [dataRoom]);
  if (!fetched) return <h1>Loading</h1>;

  const columns = [
    {
      headerColumn: "Room Name",
      columnsData: "RoomName",
      columnRenderer: (row) => (
        <div>
          {" "}
          <img src={row.Foto} alt="Room" style={{ width: "90px" }} />
          <p>#{row.id}</p>
          <div>
            <p>{row.number}</p>
          </div>
        </div>
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
      columnRenderer: (row) => <p>{row.Amenities.join(", ")}</p>,
    },
    {
      headerColumn: "Special Request",
      columnsData: "SpecialRequest",
      columnRenderer: (row) => (
        <button onClick={() => openNote(row.SpecialRequest)}>View Notes</button>
      ),
    },
    {
      headerColumn: "Rate",
      columnsData: "Rate",
      columnRenderer: (row) => (
        <div>
          <p>${row.Rate}</p>
          <p>/night</p>
        </div>
      ),
    },
    {
      headerColumn: "Status",
      columnsData: "Status",
      columnRenderer: (row) =>
        row.Status === "Available" ? (
          <button style={{ backgroundColor: "green" }}>{row.Status}</button>
        ) : (
          <button style={{ backgroundColor: "red" }}>{row.Status}</button>
        ),
    },
    {
      headerColumn: "",
      columnsData: "delete",
      columnRenderer: (row) => (
        <RiDeleteBin5Line onClick={() => deleteItem(row.id)} />
      ),
    },
  ];

  return (
    <div>
      <Table data={dataRoomState} columns={columns} />
    </div>
  );
}

export default Rooms;
