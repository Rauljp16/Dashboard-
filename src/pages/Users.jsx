import usersJson from "../../users.json";
function Users() {
  const tabsStyle = {
    display: "flex",
    justifyContent: "space-evenly",
  };

  return (
    <div>
      <div style={{ padding: "20px", backgroundColor: "#cccc" }}>
        <div style={tabsStyle}>
          <p
            style={{
              borderBottom: "2px solid green",
              width: "100%",
              textAlign: "center",
              paddingBottom: "10px",
              color: "green",
            }}
          >
            All user
          </p>
          <p
            style={{
              borderBottom: "2px solid #cccc",
              width: "100%",
              textAlign: "center",
            }}
          >
            Active user
          </p>
          <p
            style={{
              borderBottom: "2px solid #cccc",
              width: "100%",
              textAlign: "center",
            }}
          >
            Inactive user
          </p>
          <input type="text" />
        </div>
      </div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre completo</th>
            <th>ID de empleado</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>Description</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {usersJson.map((user) => (
            <tr key={user["ID de empleado"]}>
              <td>
                <img
                  style={{ width: "100px" }}
                  src={user.Foto}
                  alt="Foto del empleado"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.startDate}</td>
              <td>{user.description}</td>
              <td>{user.contact}</td>
              <td
                style={{
                  color:
                    user.status === "ACTIVE"
                      ? "#00cd00"
                      : user.status === "INACTIVE"
                      ? "#d30000"
                      : "#000000",
                }}
              >
                {user.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
