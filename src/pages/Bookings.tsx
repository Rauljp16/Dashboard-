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

interface liStyledProps {
  isActive: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 0 0 20px 0;
`;

const List = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
`;

const ListItem = styled.li<liStyledProps>`
  padding: 10px;
  border-bottom: ${(props) =>
    props.isActive
      ? "3px solid #007455"
      : "3px solid #00000036"};
  cursor: pointer;
`;

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
`;

const TextInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 2px 0px #007455;
  outline: none;
`;

const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  top: 8px;
  left: 155px;
  font-size: 22px;
`;

const SelectInput = styled.select`
  padding: 8px;
  border: 1px solid #007455;
  border-radius: 4px;
  font-size: 1rem;
  color: #007455;
`;

const StyledLink = styled(Link)`
  transform: scaleY(1.4);
`;
const DivGuest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const LinkGuest = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: 600;
`;
const IdGuest = styled.p`
  color: #007455;
  font-size: 12px;
`;
const ButtonViewNote = styled.button`
  background-color: transparent;
  cursor: pointer;
  color: #007455;
  border: 1px solid #007455;
  border-radius: 4px;
  padding: 6px 8px;
`;
const ButtonStatusOut = styled.button`
  color: #e23428;
  background-color: #e2342821;
  border: none;
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
`;
const ButtonStatusIn = styled.button`
  color: #007455;
  background-color: #00745521;
  border: none;
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
`;
const ButtonStatusProgress = styled.button`
  color: rgb(255, 196, 35);
  background-color: rgb(251 159 68 / 20%);
  border: none;
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
`;
const DivIcon = styled.div`
  display: flex;
  gap: 10px;
  width: fit-content;
  height: 100%;
  font-size: 20px;
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
  const [activeItem, setActiveItem] = useState("All Bookings");

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
        <DivGuest>
          <LinkGuest to={`${row._id}`}>{row.Name}</LinkGuest>
          <IdGuest>{row._id}</IdGuest>
        </DivGuest>
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
        <ButtonViewNote onClick={() => viewNote(row.SpecialRequest)}>
          View Notes
        </ButtonViewNote>
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
          <ButtonStatusIn>{row.Status}</ButtonStatusIn>
        ) : row.Status === "Check Out" ? (
          <ButtonStatusOut>{row.Status}</ButtonStatusOut>
        ) : (
          <ButtonStatusProgress>{row.Status}</ButtonStatusProgress>
        ),
    },
    {
      headerColumn: "",
      columnsData: "delete",
      columnRenderer: (row) => (
        <DivIcon>
          <Link to={`/bookings/edit/${row._id}`} style={{ color: "#009e74" }}>
            <RiEdit2Line to="/bookings/edit" />
          </Link>
          <RiDeleteBin5Line
            onClick={() => deleteItem(row._id)}
            style={{ color: "#9c0e0e", cursor: "pointer" }}
          />
        </DivIcon>
      ),
    },
  ];

  const order = ["All Bookings", "Checking In", "Check Out", "In Progress"];
  const handleFiltered = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.currentTarget as HTMLLIElement).innerText;
    setActiveItem(value);
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
    } else {
      setDataFinal(filteredData);
    }
  };

  return (
    <div>
      <Container>
        <List>
          {order.map((ord, orderIndex) => (
            <ListItem
              key={orderIndex}
              onClick={handleFiltered}
              isActive={activeItem === ord}
            >
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
            <Button color="green" name="New Booking" />
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
