import Table from "../components/Table";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/bookings/bookingsThunk";
import { RiDeleteBin5Line } from "react-icons/ri";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";
import { Column, DataBookings } from '../types/global';
import { AppDispatch, RootState } from "../store";


function Bookings() {
  const dataBooking = useSelector((state: RootState) => state.bookingSlice.dataBooking);
  const dispatch: AppDispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const [dataFinal, setDataFinal] = useState<DataBookings[]>([]);
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

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
            (a, b) => new Date(a.OrderDate).getTime() - new Date(b.OrderDate).getTime()
          )
        );
        break;
      case "Check In":
        setDataFinal(
          [...dataBookingState].sort(
            (a, b) => new Date(a.CheckIn).getTime() - new Date(b.CheckIn).getTime()
          )
        );
        break;
      case "Check Out":
        setDataFinal(
          [...dataBookingState].sort(
            (a, b) => new Date(a.CheckOut).getTime() - new Date(b.CheckOut).getTime()
          )
        );
        break;
      default:
        setDataFinal(dataBookingState);
    }
  };

  function viewNote(e: string) {
    setOpenPopup(true);
    setInfoPopup({
      title: "special request",
      info: e,
    });
  }

  function deleteItem(id: string) {
    dispatch(deleteThunk(id));
  }
  const test = (e: ChangeEvent<HTMLInputElement>) => console.log(e);
  const columns: Column[] = [
    {
      headerColumn: "Guest",
      columnsData: "Guest",
      columnRenderer: (row) => (
        <div>
          <Link to={`booking/${row.id}`}>{row.Name}</Link>
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
        <RiDeleteBin5Line onClick={() => deleteItem(row.id)} />
      ),
    },
  ];
  const order = ["All Bookings", "Checking In", "Checking Out", "In Progress"];
  const handleFiltered = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.currentTarget as HTMLLIElement).innerText
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
        data={dataFinal.length ? dataFinal : dataBookingState} columns={columns}
      />
      {openPopup && <Popup infoPopup={infoPopup} setOpenPopup={setOpenPopup} />}
    </div>
  );
}

export default Bookings;
