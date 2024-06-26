import Table from "../components/Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllThunk } from "../slices/rooms/roomsThunk"

function Rooms() {
  const roomsStatus = useSelector((state) => state.roomSlice.status);
  const dataRoom = useSelector((state) => state.roomSlice.dataRoom);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomsStatus === "idle") {
      dispatch(fetchAllThunk());
    }
  }, [roomsStatus, dispatch]);

  const columns = [
    {
      headerColumn: "Room Name",
      columnsData: "RoomName",
      columnRenderer: (row) => <div> <img src={row.Foto} alt="Room" style={{ width: "50%", height: "100%" }} /><p>#{row.id}</p><div><p>{row.number}</p>
      </div></div>,

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
      columnRenderer: (row) => <div><p>${row.Rate}</p><p>/night</p></div>,

    },
    {
      headerColumn: "Status",
      columnsData: "Status",
      columnRenderer: (row) => row.Status === "Available"
        ? <button style={{ backgroundColor: "green" }}>{row.Status}</button>
        : <button style={{ backgroundColor: "red" }}>{row.Status}</button>

    },

  ];



  return (
    <div>
      <Table data={dataRoom} columns={columns} />
    </div>
    // <div>
    //   <section>
    //     <table style={{ width: "100%" }}>
    //       <thead>
    //         <tr>
    //           <th>Room Name</th>
    //           <th>Bed Type</th>
    //           <th>Room Floor</th>
    //           <th>Facilities</th>
    //           <th>Rate</th>
    //           <th>Status</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {roomJson.map((room) => (
    //           <tr key={room.id}>
    //             <td style={{ display: "flex", margin: "10px 0" }}>
    //               <img
    //                 style={{ width: "100px" }}
    //                 src={room.Foto}
    //                 alt="Habitacion de hotel"
    //               />
    //               <div>
    //                 <p>{`#${room.id}`}</p>
    //                 <p> {room.number}</p>
    //               </div>
    //             </td>
    //             <td>{room.BedType}</td>
    //             <td>{room.RoomFloor}</td>
    //             <td>{room.Facilities.join(", ")}</td>
    //             <td>
    //               {`$${room.Rate}`}
    //               <p>/nigh</p>
    //             </td>
    //             <td>{room.Status}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </section>
    // </div>
  );
}

export default Rooms;
