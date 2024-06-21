import roomJson from "../../room.json";
function Rooms() {
  return (
    <div>
      <section>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Bed Type</th>
              <th>Room Floor</th>
              <th>Facilities</th>
              <th>Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {roomJson.map((room) => (
              <tr key={room.id}>
                <td style={{ display: "flex", margin: "10px 0" }}>
                  <img
                    style={{ width: "100px" }}
                    src={room.Foto}
                    alt="Habitacion de hotel"
                  />
                  <div>
                    <p>{`#${room.id}`}</p>
                    <p> {room.number}</p>
                  </div>
                </td>
                <td>{room.BedType}</td>
                <td>{room.RoomFloor}</td>
                <td>{room.Facilities.join(", ")}</td>
                <td>
                  {`$${room.Rate}`}
                  <p>/nigh</p>
                </td>
                <td>{room.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Rooms;
