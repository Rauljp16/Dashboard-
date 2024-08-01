import Comment from "../components/Comments"
import Table from "../components/Table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/contact/contactThunk";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AppDispatch, RootState } from "../store";
import { Column } from "../types/global";


function Contact() {
  const dataContact = useSelector((state: RootState) => state.contactSlice.dataContact);
  const dispatch: AppDispatch = useDispatch();
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

  function deleteItem(_id: string) {
    dispatch(deleteThunk(_id))
  }


  const order = ["All Contacts", "Archived",];
  const columns: Column[] = [
    {
      headerColumn: "Date",
      columnsData: "Date",
      columnRenderer: (row) => <div><p>{row.date}</p><p>#{row._id}</p></div>,

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
      columnRenderer: (row) => <RiDeleteBin5Line onClick={() => deleteItem(row._id)} />
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
