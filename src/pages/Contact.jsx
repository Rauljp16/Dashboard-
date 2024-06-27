import Comment from "../components/Comments"
import Table from "../components/Table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/contact/contactThunk";
import { RiDeleteBin5Line } from "react-icons/ri";


function Contact() {
  const dataContact = useSelector((state) => state.contactSlice.dataContact);
  const dispatch = useDispatch();
  const [fetched, setFectched] = useState(false)


  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchAllThunk()).unwrap()
      setFectched(true)
    }
    initialFetch()
  }, [dispatch]);

  const dataContactState = useMemo(() => {
    if (!dataContact.length) return []
    return dataContact
  }, [dataContact]);

  if (!fetched) return (<h1>Loading</h1>)

  function deleteItem(id) {
    dispatch(deleteThunk(id))
  }


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
    {
      headerColumn: "",
      columnsData: "delete",
      columnRenderer: (row) => <RiDeleteBin5Line onClick={() => deleteItem(row.id)} />
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
      <Table data={dataContactState} columns={columns} />

    </div>
  );
}

export default Contact;
