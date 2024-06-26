import Table from "../components/Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllThunk } from "../slices/users/usersThunk";

function Users() {
  const usersStatus = useSelector((state) => state.userSlice.status);
  const dataUser = useSelector((state) => state.userSlice.dataUser)
  const dispatch = useDispatch();


  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchAllThunk());
    }
  }, [usersStatus, dispatch]);

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
      <Table columns={columns} data={dataUser} />
    </div>
  );
}

export default Users;
