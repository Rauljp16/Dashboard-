import roomJson from "../../room.json";
function Rooms() {
  const data = roomJson;
  const headerColumns = [
    "Room Name",
    "Bed Type",
    "Room Floor",
    "Facilities",
    "Rate",
    "Status"
  ];
  const columnsData = [
    "RoomName",
    "BedType",
    "RoomFloor",
    "Facilities",
    "Rate",
    "Status"
  ];
  const columnRenderers = {
    "Room Name": (row) => <img src={row.Foto} alt="Room" style={{ width: 50, height: 50 }} />,
    SpecialRequest: (row) => <button onClick={() => openNote(row.SpecialRequest)}>View Notes</button>,
    RoomType: (row) => `${row.RoomType}-${row.RoomNumber}`,
    Status: (row) =>
      row.Status === "Check In"
        ? <p style={{ color: "green" }}>{row.Status}</p>
        : row.Status === "Check Out"
          ? <p style={{ color: "red" }}>{row.Status}</p>
          : <p style={{ color: "yellow" }}>{row.Status}</p>
  };

  return (
    <div></div>
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
