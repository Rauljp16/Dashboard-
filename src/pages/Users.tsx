import Table from "../components/Table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteThunk,
  fetchAllThunk,
  updateThunk,
} from "../slices/users/usersThunk";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { Column } from "../types/global";
import { AppDispatch, RootState } from "../store";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function Users() {
  const dataUser = useSelector((state: RootState) => state.userSlice.dataUser);
  const dispatch: AppDispatch = useDispatch();
  const [fetched, setFectched] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchAllThunk()).unwrap();
      setFectched(true);
    };
    initialFetch();
  }, [dispatch]);

  const dataUserState = useMemo(() => {
    if (!dataUser.length) return [];
    return dataUser;
  }, [dataUser]);

  if (!fetched) return <h1>Loading</h1>;

  function deleteItem(_id: string) {
    dispatch(deleteThunk(_id));
  }

  const order = ["All user", "Active user", "Inactive user"];
  const columns: Column[] = [
    {
      headerColumn: "Name",
      columnsData: "name",
      columnRenderer: (row) => (
        <Link to={row._id}>
          <div>
            <img
              src={row.foto}
              alt="User"
              style={{ width: "70px", borderRadius: "100%" }}
            />
            <div>
              <p>{row.name}</p>
              <p>#{row._id}</p>
              <p>{row.startDate}</p>
            </div>
          </div>
        </Link>
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
      columnRenderer: (row) =>
        row.status === "ACTIVE" ? (
          <p style={{ color: "green" }}>{row.status}</p>
        ) : (
          <p style={{ color: "red" }}>{row.status}</p>
        ),
    },
    {
      headerColumn: "",
      columnsData: "delete",
      columnRenderer: (row) => (
        <>
          <Link to={`/users/edit/${row._id}`}>
            <RiEdit2Line to="/users/edit" style={{ margin: "5px" }} />
          </Link>
          <RiDeleteBin5Line
            style={{ margin: "5px" }}
            onClick={() => deleteItem(row._id)}
          />
        </>
      ),
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
        <Link to="/users/create">
          <Button color="green" name="Create User" />
        </Link>
      </div>
      <Table columns={columns} data={dataUserState} />
    </div>
  );
}

export default Users;
