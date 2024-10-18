import Table from "../components/Table";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/users/usersThunk";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { Column, DataUsers } from "../types/global";
import { AppDispatch, RootState } from "../store";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Loading from "../components/Loading";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const TextInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 2px 0px #007455;
  outline: none;
  margin-right:15px;
`;


const FilterList = styled.ul`
  display: flex;
  gap: 10px;
  list-style-type: none;
`;
const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  top: 8px;
  left: 156px;
  font-size: 22px;
`;
const DivName = styled.div`
display: flex;
align-items: center;
gap: 30px;
`;
const DivNameInfo = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
color: black;
`;
const NameParagraph = styled.p`
  margin: 0;
  font-weight: 600;
  /* text-decoration: none; */
`;
const IdParagraph = styled.p`
color: #007455;
font-size: 12px;
`;
const Paragraph = styled.p`
margin: 0;
font-size: 14px;
`;
const Img = styled.img`
width: 70px;
height: 70px;
border-radius: 8px;
`;
const ListItem = styled.li<{ isActive: boolean }>`
  padding: 10px;
  cursor: pointer;
  border-bottom: ${(props) => (props.isActive ? "3px solid #007455" : "none")};
`;

const DeleteIcon = styled(RiDeleteBin5Line)`
  color: #9c0e0e;
  cursor: pointer;
`;

const EditIcon = styled(RiEdit2Line)`
  color: #007455;
  cursor: pointer;
  margin-right: 5px;
`;
const Inactive = styled.p`
  color: #e23428;
  background-color: #e2342821;
  border: none;
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
`;
const Active = styled.p`
  color: #007455;
  background-color: #00745521;
  border: none;
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
`;
const DivSearch = styled.div`
position: relative;
margin-left: auto;
`;
const DivIcon = styled.div`
font-size: 20px;
`;


function Users() {
  const dataUser = useSelector((state: RootState) => state.userSlice.dataUser);
  const dispatch: AppDispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const [dataFinal, setDataFinal] = useState<DataUsers[]>([]);
  const [activeItem, setActiveItem] = useState("All Users");

  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchAllThunk()).unwrap();
      setFetched(true);
    };
    initialFetch();
  }, [dispatch]);

  const dataUsersState = useMemo(() => {
    if (!dataUser.length) return [];
    setDataFinal(dataUser);
    return dataUser;
  }, [dataUser]);

  if (!fetched) return <Loading />;

  const deleteItem = (_id: string) => {
    dispatch(deleteThunk(_id));
  };

  const columns: Column[] = [
    {
      headerColumn: "Name",
      columnsData: "name",
      columnRenderer: (row) => (
        <Link to={row._id} style={{ textDecoration: "none" }}>
          <DivName>
            <Img
              src={row.foto}
              alt="User"
            />
            <DivNameInfo>
              <NameParagraph>{row.name}</NameParagraph>
              <IdParagraph>#{row._id}</IdParagraph>
              <Paragraph>{row.startDate}</Paragraph>
            </DivNameInfo>
          </DivName>
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
        row.status === "Active" ? (
          <Active>{row.status}</Active>
        ) : (
          <Inactive>{row.status}</Inactive>
        ),
    },
    {
      headerColumn: "",
      columnsData: "delete",
      columnRenderer: (row) => (
        <DivIcon>
          <Link to={`/users/edit/${row._id}`}>
            <EditIcon />
          </Link>
          <DeleteIcon onClick={() => deleteItem(row._id)} />
        </DivIcon>
      ),
    },
  ];

  const order = ["All Users", "Active Users", "Inactive Users"];
  const handleFiltered = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = (e.currentTarget as HTMLLIElement).innerText;
    setActiveItem(value);
    switch (value) {
      case "All Users":
        setDataFinal(dataUsersState);
        break;
      case "Active Users":
        setDataFinal(
          dataUsersState.filter((item) => item.status === "Active")
        );
        break;
      case "Inactive Users":
        setDataFinal(
          dataUsersState.filter((item) => item.status === "Inactive")
        );
        break;
      default:
        setDataFinal(dataUsersState);
    }
  };
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const filterText = e.target.value.toLowerCase();
    const filteredData = dataUsersState.filter((item) =>
      item.name.toLowerCase().includes(filterText)
    );

    if (filteredData.length === 0) {
    } else {
      setDataFinal(filteredData);
    }
  };

  return (
    <Container>
      {/* Filter Section */}
      <FilterContainer>
        <FilterList>
          {order.map((ord, orderIndex) => (
            <ListItem
              key={orderIndex}
              onClick={handleFiltered}
              isActive={activeItem === ord}
            >
              {ord}
            </ListItem>
          ))}
        </FilterList>
        <DivSearch>
          <SearchIcon />
          <TextInput type="text" onChange={handleFilter} />
        </DivSearch>
        <Link to="/users/create">
          <Button color="green" name="New User" />
        </Link>
      </FilterContainer>

      <Table
        data={dataFinal.length ? dataFinal : dataUsersState}
        columns={columns}
      />
    </Container>
  );
}

export default Users;
