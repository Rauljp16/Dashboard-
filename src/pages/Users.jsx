import Table from "../components/Table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/users/usersThunk";
import { RiDeleteBin5Line } from "react-icons/ri";


function Users() {
  const dataUser = useSelector((state) => state.userSlice.dataUser)
  const dispatch = useDispatch();
  const [fetched, setFectched] = useState(false)


  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchAllThunk()).unwrap()
      setFectched(true)
    }
    initialFetch()
  }, [dispatch]);

  const dataUserState = useMemo(() => {
    if (!dataUser.length) return []
    return dataUser
  }, [dataUser]);

  if (!fetched) return (<h1>Loading</h1>)

  function deleteItem(id) {
    dispatch(deleteThunk(id))
  }

  const order = ["All user", "Active user", "Inactive user"];
  const columns = [
    {
      headerColumn: "Name",
      columnsData: "name",
      columnRenderer: (row) => (
        <div>
          <img
            src={row.foto}
            alt="User"
            style={{ width: "50px" }}
          />
          <div>
            <p>{row.name}</p>
            <p>#{row.id}</p>
            <p>{row.startDate}</p>
          </div>
        </div>
      ),
    },
    {
      headerColumn: "Description",
      columnsData: "description",
    },
    {
      headerColumn: "Email",
      columnsData: "email",
    },
    {
      headerColumn: "Contact",
      columnsData: "contact",
    },
    {
      headerColumn: "Status",
      columnsData: "status",
      columnRenderer: (row) => row.status === "ACTIVE"
        ? <p style={{ color: "green" }}>{row.status}</p>
        : <p style={{ color: "red" }}>{row.status}</p>
    },
    {
      headerColumn: "",
      columnsData: "delete",
      columnRenderer: (row) => <RiDeleteBin5Line onClick={() => deleteItem(row.id)} />
    },

  ];

  return (
    <div>
      <ul>
        {order.map((ord, orderIndex) => (
          <li key={orderIndex}>{ord}</li>
        ))}
      </ul>
      <div>
        <input type="text" />
      </div>
      <Table columns={columns} data={dataUserState} />
    </div>
  );
}

export default Users;
