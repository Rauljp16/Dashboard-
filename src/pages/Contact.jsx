import contactJson from "../../dbContact.json";
import Comment from "../components/Comments"
import Table from "../components/Table";
function Contact() {
  const data = contactJson;
  const order = ["All Contacts", "Archived",];

  const headerColumns = [
    "Date",
    "Customer",
    "Asunto",

  ];
  const columnsData = [
    "Date",
    "Customer",
    "Asunto",
    "Boton",
  ];
  const columnRenderers = {
    Date: (row) => <div><p>{row.date}</p><p>#{row.id}</p></div>,
    Customer: (row) => <div><p>{row.name}</p><p>{row.email}</p><p>{row.phone}</p></div>,
    Asunto: (row) => <div><p>{row.asunto}</p><p>{row.comment}</p></div>,
    Boton: () => <button>Archive</button>
  };

  return (
    <div>
      <Comment />
      <ul>
        {order.map((ord, orderIndex) => (
          <li key={orderIndex}>{ord}</li>
        ))}
        <button>Archive</button>
      </ul>
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
    //         All Contacts
    //       </p>
    //       <p
    //         style={{
    //           borderBottom: "2px solid #cccc",
    //           width: "100%",
    //           textAlign: "center",
    //         }}
    //       >
    //         Archived
    //       </p>
    //     </div>
    //   </div>
    //   <table style={{ width: "100%" }}>
    //     <thead>
    //       <tr>
    //         <th>Date</th>
    //         <th>Customer</th>
    //         <th>Asunto</th>
    //         <th>Comment</th>
    //         <th>Action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {contactJson.map((message) => (
    //         <tr key={message.id}>
    //           <td>
    //             <p>{message.date}</p>
    //             <p>{message.id}</p>
    //           </td>
    //           <td>
    //             <p>{message.name}</p>
    //             <p>{message.email}</p>
    //             <p>{message.phone}</p>
    //           </td>
    //           <td>{message.asunto}</td>
    //           <td>{message.comment}</td>
    //           <td>
    //             <button>ARCHIVE</button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}

export default Contact;
