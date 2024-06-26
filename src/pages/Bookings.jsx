import Table from "../components/Table";
import Select from "../components/Select";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllThunk } from "../slices/bookings/bookingsThunk";

function Bookings() {
  const bookingsStatus = useSelector((state) => state.bookingSlice.status);
  const dataBooking = useSelector((state) => state.bookingSlice.dataBooking);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchAllThunk());
    }
  }, [bookingsStatus, dispatch]);

  const order = ["All Bookings", "Checking In", "Checking Out", "In Progress"];
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

  ];
  function openNote(e) {
    alert(e);
  }

  const options = ["Guest", "Order Date", "Check In", "Check Out"];

  function onChange(e) {
    console.log(e);
  }

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
        data={dataBooking}
      />
    </div>
  );
}

export default Bookings;
