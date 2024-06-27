import Table from "../components/Table";
import Select from "../components/Select";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/bookings/bookingsThunk";
import { RiDeleteBin5Line } from "react-icons/ri";

function Bookings() {
  const dataBooking = useSelector((state) => state.bookingSlice.dataBooking);
  const dispatch = useDispatch();
  const [fetched, setFectched] = useState(false)


  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchAllThunk()).unwrap()
      setFectched(true)
    }
    initialFetch()
  }, [dispatch]);

  const dataBookingState = useMemo(() => {
    if (!dataBooking.length) return []
    return dataBooking
  }, [dataBooking]);

  if (!fetched) return (<h1>Loading</h1>)


  const order = ["All Bookings", "Checking In", "Checking Out", "In Progress"];
  const options = ["Guest", "Order Date", "Check In", "Check Out"];

  function onChange(e) {
    console.log(e);
  }
  function openNote(e) {
    alert(e);
  }
  function deleteItem(id) {
    dispatch(deleteThunk(id))
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
        row.Status === 'Check In' ? (
          <p style={{ color: 'green' }}>{row.Status}</p>
        ) : row.Status === 'Check Out' ? (
          <p style={{ color: 'red' }}>{row.Status}</p>
        ) : (
          <p style={{ color: 'yellow' }}>{row.Status}</p>
        ),

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
      <Select options={options} onChange={onChange} />
      <Table
        columns={columns}
        data={dataBookingState}
      />
    </div>
  );
}

export default Bookings;
