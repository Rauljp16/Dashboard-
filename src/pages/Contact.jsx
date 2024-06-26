import Comment from "../components/Comments"
import Table from "../components/Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllThunk } from "../slices/contact/contactThunk";


function Contact() {
  const contactStatus = useSelector((state) => state.contactSlice.status);
  const dataContact = useSelector((state) => state.contactSlice.dataContact);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contactStatus === "idle") {
      dispatch(fetchAllThunk());
    }
  }, [contactStatus, dispatch]);

  const order = ["All Contacts", "Archived",];
  const columns = [
    {
      headerColumn: "Date",
      columnsData: "Date",
      columnRenderer: (row) => <div><p>{row.date}</p><p>#{row.id}</p></div>,

    },
    {
      headerColumn: "Customer",
      columnsData: "Customer",
      columnRenderer: (row) => <div><p>{row.name}</p><p>{row.email}</p><p>{row.phone}</p></div>,

    },
    {
      headerColumn: "Asunto",
      columnsData: "Asunto",
      columnRenderer: (row) => <div><p>{row.asunto}</p><p>{row.comment}</p></div>,

    },
    {
      headerColumn: "Boton",
      columnsData: "Boton",
      columnRenderer: () => <button>Archive</button>
    },

  ];

  return (
    <div>
      <Comment />
      <ul>
        {order.map((ord, orderIndex) => (
          <li key={orderIndex}>{ord}</li>
        ))}
        <button>Archive</button>
      </ul>
      <Table data={dataContact} columns={columns} />

    </div>
  );
}

export default Contact;
