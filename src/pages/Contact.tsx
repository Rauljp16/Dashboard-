import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThunk, fetchAllThunk } from "../slices/contact/contactThunk";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AppDispatch, RootState } from "../store";
import { Column } from "../types/global";
import Comment from "../components/Comments";
import Table from "../components/Table";
import Loading from "../components/Loading";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ListItem = styled.li<{ isActive: boolean }>`
  padding: 10px;
  border-bottom: ${(props) =>
    props.isActive ? "3px solid #007455" : "3px solid #00000036"};
  cursor: pointer;
`;

const DeleteIcon = styled(RiDeleteBin5Line)`
font-size: 20px;
  color: #9c0e0e;
  cursor: pointer;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 14px;
`;

const NameParagraph = styled.p`
font-weight: 600;
color: #007455;
`;

const BoldParagraph = styled.p`
  margin: 0;
  font-weight: 600;
`;
const IdParagraph = styled.p`
font-size: 13px;
color: #007455;
`;
const Archived = styled.p`
  color: #e23428;
  background-color: #e2342821;
  border: none;
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
`;
const Publish = styled.p`
  color: #007455;
  background-color: #00745521;
  border: none;
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
`;

function Contact() {
  const dataContact = useSelector(
    (state: RootState) => state.contactSlice.dataContact
  );
  const dispatch: AppDispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const [activeItem, setActiveItem] = useState("All Contacts");

  useEffect(() => {
    const initialFetch = async () => {
      await dispatch(fetchAllThunk()).unwrap();
      setFetched(true);
    };
    initialFetch();
  }, [dispatch]);

  const filteredData = useMemo(() => {
    if (activeItem === "All Contacts") return dataContact;
    return dataContact.filter((contact) =>
      activeItem === "Archived"
        ? contact.action === "archived"
        : contact.action === "publish"
    );
  }, [dataContact, activeItem]);

  if (!fetched) return <Loading />;

  const deleteItem = (_id: string) => {
    dispatch(deleteThunk(_id));
  };

  // Opciones de filtro: All Contacts, Archived, Publish
  const order = ["All Contacts", "Archived", "Publish"];
  const columns: Column[] = [
    {
      headerColumn: "Date",
      columnsData: "Date",
      columnRenderer: (row) => (
        <ColumnContainer>
          <Paragraph>{row.date}</Paragraph>
          <IdParagraph>#{row._id}</IdParagraph>
        </ColumnContainer>
      ),
    },
    {
      headerColumn: "Customer",
      columnsData: "Customer",
      columnRenderer: (row) => (
        <ColumnContainer>
          <NameParagraph>{row.name}</NameParagraph>
          <Paragraph>{row.email}</Paragraph>
          <Paragraph>{row.phone}</Paragraph>
        </ColumnContainer>
      ),
    },
    {
      headerColumn: "Affair",
      columnsData: "Affair",
      columnRenderer: (row) => (
        <ColumnContainer>
          <BoldParagraph>{row.asunto}</BoldParagraph>
          <Paragraph>{row.comment}</Paragraph>
        </ColumnContainer>
      ),
    },
    {
      headerColumn: "Action",
      columnsData: "Action",
      columnRenderer: (row) =>
        row.action === "archived" ? (
          <Archived>{row.action}</Archived>
        ) : (
          <Publish>{row.action}</Publish>
        )
      ,
    },
    {
      headerColumn: "",
      columnsData: "delete",
      columnRenderer: (row) => (
        <DeleteIcon onClick={() => deleteItem(row._id)} />
      ),
    },
  ];

  const handleFiltered = (item: string) => {
    setActiveItem(item);
  };

  return (
    <Container>
      <Comment />
      <List>
        {order.map((ord, orderIndex) => (
          <ListItem
            key={orderIndex}
            isActive={activeItem === ord}
            onClick={() => handleFiltered(ord)}
          >
            {ord}
          </ListItem>
        ))}
      </List>
      <Table data={filteredData} columns={columns} />
    </Container>
  );
}

export default Contact;
