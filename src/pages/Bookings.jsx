import Table from "../components/Table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/bookings/bookingsThunk";
import { RiDeleteBin5Line } from "react-icons/ri";

function Bookings() {
  const dataBooking = useSelector((state) => state.bookingSlice.dataBooking);
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const [dataFinal, setDataFinal] = useState([]);
  const [filter, setFilter] = useState("All Bookings");

  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchAllThunk()).unwrap();
      setFetched(true);
    };
    initialFetch();
  }, [dispatch]);

  const dataBookingState = useMemo(() => {
    if (!dataBooking.length) return [];
    setDataFinal(dataBooking);
    return dataBooking;
  }, [dataBooking]);

  if (!fetched) return <h1>Loading</h1>;

  const onChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case "Guest":
        setDataFinal(
          [...dataBookingState].sort((a, b) => a.Name.localeCompare(b.Name))
        );
        break;
      case "Order Date":
        setDataFinal(
          [...dataBookingState].sort(
            (a, b) => new Date(a.OrderDate) - new Date(b.OrderDate)
          )
        );
        break;
      case "Check In":
        setDataFinal(
          [...dataBookingState].sort(
            (a, b) => new Date(a.CheckIn) - new Date(b.CheckIn)
          )
        );
        break;
      case "Check Out":
        setDataFinal(
          [...dataBookingState].sort(
            (a, b) => new Date(a.CheckOut) - new Date(b.CheckOut)
          )
        );
        break;
      default:
        setDataFinal(dataBookingState);
    }
  };

  function openNote(e) {
    alert(e);
  }

  function deleteItem(id) {
    dispatch(deleteThunk(id));
  }

  const columns = [
    {
      headerColumn: "Guest",
      columnsData: "Guest",
      columnRenderer: (row) => (
        <div onClick={() => openNote(row.Name)}>
          <p>{row.Name}</p>
          <p>{row.id}</p>
        </div>
      ),
    },
    {
      headerColumn: "Order Date",
      columnsData: "OrderDate",
    },
    {
      headerColumn: "Check In",
      columnsData: "CheckIn",
    },
    {
      headerColumn: "Check Out",
      columnsData: "CheckOut",
    },
    {
      headerColumn: "Special Request",
      columnsData: "SpecialRequest",
      columnRenderer: (row) => (
        <button onClick={() => openNote(row.SpecialRequest)}>View Notes</button>
      ),
    },
    {
      headerColumn: "Room Type",
      columnsData: "RoomType",
      columnRenderer: (row) => `${row.RoomType}-${row.RoomNumber}`,
    },
    {
      headerColumn: "Status",
      columnsData: "Status",
      columnRenderer: (row) =>
        row.Status === "Check In" ? (
          <p style={{ color: "green" }}>{row.Status}</p>
        ) : row.Status === "Check Out" ? (
          <p style={{ color: "red" }}>{row.Status}</p>
        ) : (
          <p style={{ color: "yellow" }}>{row.Status}</p>
        ),
    },
    {
      headerColumn: "",
      columnsData: "delete",
      columnRenderer: (row) => (
        <RiDeleteBin5Line onClick={() => deleteItem(row.id)} />
      ),
    },
  ];
  const order = ["All Bookings", "Checking In", "Checking Out", "In Progress"];
  const handleFiltered = (e) => {
    const value = e.target.innerText;
    // let itemFiltered = dataBookingState.filter((item) => item.Status === value);
    // console.log(value);
    // console.log(itemFiltered);
    switch (value) {
      case "All Bookings":
        console.log(dataBookingState);
        setDataFinal(dataBookingState);
        break;
      case "Checking In":
        console.log(
          dataBookingState.filter((item) => item.Status === "Check In")
        );
        break;
      case "Checking Out":
        console.log(
          dataBookingState.filter((item) => item.Status === "Check Out")
        );
        break;
      case "In Progress":
        console.log(
          dataBookingState.filter((item) => item.Status === "In Progress")
        );
        break;
      default:
        setDataFinal(dataBookingState);
    }
  };
  return (
    <div>
      <ul>
        {order.map((ord, orderIndex) => (
          <li key={orderIndex} onClick={handleFiltered}>
            {ord}
          </li>
        ))}
      </ul>
      <select onChange={onChange} defaultValue="">
        <option value="" disabled>
          Order by
        </option>
        <option value="Guest">Guest</option>
        <option value="Order Date">Order Date</option>
        <option value="Check In">Check In</option>
        <option value="Check Out">Check Out</option>
      </select>
      <Table
        columns={columns}
        data={dataFinal.length ? dataFinal : dataBookingState}
      />
    </div>
  );
}

export default Bookings;
