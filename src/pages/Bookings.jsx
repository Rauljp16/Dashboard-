import bookingJson from "../../booking.json";
import Table from "../components/Table";
import Select from "../components/Select";

function Bookings() {

  const data = bookingJson;
  const order = ["All Bookings", "Checking In", "Checking Out", "In Progress"];

  const headerColumns = [
    "Guest",
    "Order Date",
    "Check In",
    "Check Out",
    "Special Request",
    "Room Type",
    "Status",
  ]; const columnsData = [
    "Guest",
    "OrderDate",
    "CheckIn",
    "CheckOut",
    "SpecialRequest",
    "RoomType",
    "Status",
  ];

  function openNote(e) {
    alert(e)
  }
  const columnRenderers = {
    Guest: (row) => <div onClick={() => openNote(row.Name)}><p>{row.Name}</p><p>{row.id}</p></div>,
    SpecialRequest: (row) => <button onClick={() => openNote(row.SpecialRequest)}>View Notes</button>,
    RoomType: (row) => `${row.RoomType}-${row.RoomNumber}`,
    Status: (row) =>
      row.Status === "Check In"
        ? <p style={{ color: "green" }}>{row.Status}</p>
        : row.Status === "Check Out"
          ? <p style={{ color: "red" }}>{row.Status}</p>
          : <p style={{ color: "yellow" }}>{row.Status}</p>
  };
  const options = ["Guest",
    "Order Date",
    "Check In",
    "Check Out",]
  function onChange(e) {
    console.log(e);
  }
  return (
    <div>
      <ul>
        {order.map((ord, orderIndex) => (
          <li key={orderIndex}>{ord}</li>
        ))}
      </ul>
      <Select options={options} onChange={onChange} />

      <Table headerColumns={headerColumns} columnsData={columnsData} data={data} columnRenderers={columnRenderers} />
    </div>

    // <div>
    //   <div style={{ padding: "20px", backgroundColor: "#cccc" }}>
    //     <div style={tabsStyle}>
    //       <p
    //         style={{
    //           borderBottom: "2px solid green",
    //           width: "100%",
    //           textAlign: "center",
    //           paddingBottom: "10px",
    //           color: "green",
    //         }}
    //       >
    //         All Bookings
    //       </p>
    //       <p
    //         style={{
    //           borderBottom: "2px solid #cccc",
    //           width: "100%",
    //           textAlign: "center",
    //         }}
    //       >
    //         Checking In
    //       </p>
    //       <p
    //         style={{
    //           borderBottom: "2px solid #cccc",
    //           width: "100%",
    //           textAlign: "center",
    //         }}
    //       >
    //         Checking Out
    //       </p>
    //       <p
    //         style={{
    //           borderBottom: "2px solid #cccc",
    //           width: "100%",
    //           textAlign: "center",
    //         }}
    //       >
    //         In Progress
    //       </p>
    //     </div>
    //   </div>
    //   <section>
    //     <table style={{ width: "100%" }}>
    //       <thead>
    //         <tr>
    //           <th>Guest</th>
    //           <th>Order Date</th>
    //           <th>Check in</th>
    //           <th>Check out</th>
    //           <th>Special Request</th>
    //           <th>Room Type</th>
    //           <th>Status</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {bookingJson.map((booking) => (
    //           <tr key={booking.id}>
    //             <td style={{ display: "flex", margin: "10px 0" }}>
    //               <img
    //                 style={{ width: "80px" }}
    //                 src={booking.foto}
    //                 alt="Habitacion de hotel"
    //               />
    //               <div>
    //                 <p>{booking.Name}</p>
    //                 <p>{`#${booking.id}`}</p>
    //               </div>
    //             </td>
    //             <td>{booking.OrderDate}</td>
    //             <td>{booking.CheckIn}</td>
    //             <td>{booking.CheckOut}</td>
    //             <td>
    //               <button onClick={() => alert(booking.SpecialRequest)}>
    //                 View Request
    //               </button>
    //             </td>
    //             <td>{`${booking.RoomType} (${booking.RoomNumber})`}</td>
    //             <td>
    //               <span
    //                 style={{
    //                   backgroundColor:
    //                     booking.Status === "Check In"
    //                       ? "#99ff99"
    //                       : booking.Status === "Check Out"
    //                       ? "#fb8787"
    //                       : "#ffff90",
    //                 }}
    //               >
    //                 {booking.Status}
    //               </span>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </section>{" "}
    // </div>
  );
}

export default Bookings;
