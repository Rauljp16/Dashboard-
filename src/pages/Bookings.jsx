import Table from "../components/Table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/bookings/bookingsThunk";
import { RiDeleteBin5Line } from "react-icons/ri";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";

function Bookings() {
  const dataBooking = useSelector((state) => state.bookingSlice.dataBooking);
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const [dataFinal, setDataFinal] = useState([]);
  const [infoPopup, setInfoPopup] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});

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

  function viewNote(e) {
    setOpenPopup(true);
    setInfoPopup({
      title: "special request",
      info: e,
    });
  }

  function deleteItem(_id) {
    dispatch(deleteThunk(_id));
  }
  const test = (e) => console.log(e);
  const columns = [
    {
      headerColumn: "Guest",
      columnsData: "Guest",
      columnRenderer: (row) => (
        <div>
          <Link to={`booking/${row._id}`}>{row.Name}</Link>
          <p>{row._id}</p>
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
        <button onClick={() => viewNote(row.SpecialRequest)}>View Notes</button>
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
        <RiDeleteBin5Line onClick={() => deleteItem(row._id)} />
      ),
    },
  ];
  const order = ["All Bookings", "Checking In", "Checking Out", "In Progress"];
  const handleFiltered = (e) => {
    const value = e.target.innerText;
    switch (value) {
      case "All Bookings":
        setDataFinal(dataBookingState);
        break;
      case "Checking In":
        setDataFinal(
          dataBookingState.filter((item) => item.Status === "Check In")
        );
        break;
      case "Checking Out":
        setDataFinal(
          dataBookingState.filter((item) => item.Status === "Check Out")
        );
        break;
      case "In Progress":
        setDataFinal(
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
      {openPopup && <Popup infoPopup={infoPopup} setOpenPopup={setOpenPopup} />}
    </div>
  );
}

export default Bookings;
