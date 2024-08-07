import Table from "../components/Table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/rooms/roomsThunk";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { Column } from "../types/global";
import { AppDispatch, RootState } from "../store";
import { Link } from "react-router-dom";
import Button from "../components/Button";



function Rooms() {
  const dataRoom = useSelector((state: RootState) => state.roomSlice.dataRoom);
  const dispatch: AppDispatch = useDispatch();
  const [fetched, setFectched] = useState(false)


  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchAllThunk()).unwrap();
      setFectched(true);
    };
    initialFetch();
  }, [dispatch]);

  function deleteItem(_id: string) {
    dispatch(deleteThunk(_id))
  }

  const dataRoomState = useMemo(() => {
    if (!dataRoom.length) return [];
    return dataRoom;
  }, [dataRoom]);
  if (!fetched) return <h1>Loading</h1>;

  const columns: Column[] = [
    {
      headerColumn: "Room Name",
      columnsData: "RoomName",
      columnRenderer: (row) => (
        <Link to={row._id}>
          <div>
            <img src={row.Foto} alt="Room" style={{ width: "90px" }} />
            <p>#{row._id}</p>
            <div>
              <p>{row.number}</p>
            </div>
          </div>
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
        <>
          <Link to={`/rooms/edit/${row._id}`}><RiEdit2Line to="/users/edit" style={{ margin: "5px" }} /></Link>
          <RiDeleteBin5Line style={{ margin: "5px" }} onClick={() => deleteItem(row._id)} />
        </>
      ),
    },
  ];

  return (
    <>
      <div>
        <input type="text" />
        <Link to="/rooms/create"><Button color="green" name="Create Room" /></Link>
      </div>
      <Table columns={columns} data={dataRoomState} />
    </>
  );
}

export default Rooms;
