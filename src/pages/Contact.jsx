import contactJson from "../../contact.json";
function Contact() {
  const tabsStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    width: "50%",
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
            All Contacts
          </p>
          <p
            style={{
              borderBottom: "2px solid #cccc",
              width: "100%",
              textAlign: "center",
            }}
          >
            Archived
          </p>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Asunto</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contactJson.map((message) => (
            <tr key={message.id}>
              <td>
                <p>{message.date}</p>
                <p>{message.id}</p>
              </td>
              <td>
                <p>{message.name}</p>
                <p>{message.email}</p>
                <p>{message.phone}</p>
              </td>
              <td>{message.asunto}</td>
              <td>{message.comment}</td>
              <td>
                <button>ARCHIVE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Contact;
