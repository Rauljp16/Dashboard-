import roomsJson from "../../dbRooms.json";
import Table from "../components/Table";

function Rooms() {
  const data = roomsJson;
  const headerColumns = [
    "Room Name",
    "Bed Type",
    "Room Floor",
    "Amenities",
    "Rate",
    "Status"
  ];
  const columnsData = [
    "RoomName",
    "BedType",
    "RoomFloor",
    "Amenities",
    "Rate",
    "Status"
  ];
  const columnRenderers = {
    RoomName: (row) => <div> <img src={row.Foto} alt="Room" style={{ width: "50%", height: "100%" }} /><p>#{row.id}</p><div><p>{row.number}</p>
    </div></div>,
    Amenities: (row) => <p>{row.Amenities.join(", ")}</p>,
    Rate: (row) => <div><p>${row.Rate}</p><p>/night</p></div>,
    Status: (row) => row.Status === "Available"
      ? <button style={{ backgroundColor: "green" }}>{row.Status}</button>
      : <button style={{ backgroundColor: "red" }}>{row.Status}</button>
  };

  return (
    <div>
      <Table headerColumns={headerColumns} columnsData={columnsData} data={data} columnRenderers={columnRenderers} />
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
