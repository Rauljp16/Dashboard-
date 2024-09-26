import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/bookings/bookingsThunk";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import Popup, { InfoPopup } from "../components/Popup";
import { Link } from "react-router-dom";
import { Column, DataBookings } from "../types/global";
import { AppDispatch, RootState } from "../store";
import Table from "../components/Table";
import Button from "../components/Button";
import Loading from "../components/Loading";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 20px 0;
`;

const List = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 2px solid #00000036;
  cursor: pointer;
  &:hover {
    color: #0a7e00;
    border-bottom: 2px solid #0d9900;
  }
`;

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const TextInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 2px 0px #0d990090;
  outline: none;
`;

const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  left: 155px;
  font-size: 22px;
`;

const SelectInput = styled.select`
  padding: 8px;
  border: 1px solid #0d9900;
  border-radius: 4px;
  font-size: 1rem;
  color:#0a7e00;
`;

const StyledLink = styled(Link)`
  transform: scaleY(1.4);
`;

function Bookings() {
  const dataBooking = useSelector(
    (state: RootState) => state.bookingSlice.dataBooking
  );
  const dispatch: AppDispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const [dataFinal, setDataFinal] = useState<DataBookings[]>([]);
  const [infoPopup, setInfoPopup] = useState<InfoPopup>({
    title: "",
    info: "",
  });
  const [openPopup, setOpenPopup] = useState(false);

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

  if (!fetched) return <Loading />;

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
            (a, b) =>
              new Date(a.OrderDate).getTime() - new Date(b.OrderDate).getTime()
          )
        );
        break;
      case "Check In":
        setDataFinal(
          [...dataBookingState].sort(
            (a, b) =>
              new Date(a.CheckIn).getTime() - new Date(b.CheckIn).getTime()
          )
        );
        break;
      case "Check Out":
        setDataFinal(
          [...dataBookingState].sort(
            (a, b) =>
              new Date(a.CheckOut).getTime() - new Date(b.CheckOut).getTime()
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
      title: "Special Request",
      info: e,
    });
  }

  function deleteItem(_id: string) {
    dispatch(deleteThunk(_id));
  }

  const columns: Column[] = [
    {
      headerColumn: "Guest",
      columnsData: "Guest",
      columnRenderer: (row) => (
        <div>
          <Link to={`${row._id}`}>{row.Name}</Link>
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
        row.Status === "Checking In" ? (
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
        <>
          <Link to={`/bookings/edit/${row._id}`}>
            <RiEdit2Line to="/bookings/edit" style={{ margin: "5px" }} />
          </Link>
          <RiDeleteBin5Line onClick={() => deleteItem(row._id)} />
        </>
      ),
    },
  ];

  const order = ["All Bookings", "Checking In", "Check Out", "In Progress"];
  const handleFiltered = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.currentTarget as HTMLLIElement).innerText;
    switch (value) {
      case "All Bookings":
        setDataFinal(dataBookingState);
        break;
      case "Checking In":
        setDataFinal(
          dataBookingState.filter((item) => item.Status === "Checking In")
        );
        break;
      case "Check Out":
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
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const filterText = e.target.value.toLowerCase();
    const filteredData = dataBookingState.filter((item) =>
      item.Name.toLowerCase().includes(filterText)
    );

    if (filteredData.length === 0) {
      alert("No se encuentran coincidencias");
    } else {
      setDataFinal(filteredData);
    }
  };

  return (
    <div>
      <Container>
        <List>
          {order.map((ord, orderIndex) => (
            <ListItem key={orderIndex} onClick={handleFiltered}>
              {ord}
            </ListItem>
          ))}
        </List>
        <FilterContainer>
          <SearchIcon />
          <TextInput type="text" onChange={handleFilter} />
          <SelectInput onChange={onChange} defaultValue="">
            <option value="" disabled>
              Order by
            </option>
            <option value="Guest">Guest</option>
            <option value="Order Date">Order Date</option>
            <option value="Check In">Check In</option>
            <option value="Check Out">Check Out</option>
          </SelectInput>
          <StyledLink to="/bookings/create">
            <Button color="green" name="Create Booking" />
          </StyledLink>
        </FilterContainer>
      </Container>
      <Table
        data={dataFinal.length ? dataFinal : dataBookingState}
        columns={columns}
      />
      {openPopup && (
        <Popup
          infoPopup={infoPopup}
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
        />
      )}
    </div>
  );
}

export default Bookings;
