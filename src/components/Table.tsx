import React from 'react';
import styled from 'styled-components';
import { Column, DataBookings, DataContacts, DataRooms, DataUsers } from '../types/global';

// Estilos
const TableContainer = styled.div`
  width: 100%; 
   overflow-x: auto; 
background-color: #ffffff;
border-radius: 10px;
box-shadow: 0px 0px 2px 0px #0000001A;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

`;

const TableHead = styled.thead`
  background-color: #ffffff; 
`;

const TableRow = styled.tr`
  box-shadow: 0px 0px 2px 0px #0000001A;

&:hover{
  background-color: #ffffff;
  box-shadow: 0px 0px 10px -3px #000000;
}
`;

const TableHeader = styled.th`
  padding:  20px ;
  text-align: left;
  height: 55px;
`;

const TableData = styled.td`
  padding:  20px;
  height: 75px;
`;

interface TableProps {
  data: (DataBookings | DataRooms | DataUsers | DataContacts)[];
  columns: Column[];
}

function Table({ data, columns }: TableProps) {
  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableHeader key={index}>{column.headerColumn}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((row) => (
            <TableRow key={row._id}>
              {columns.map((col, colIndex) => (
                <TableData key={colIndex}>
                  {col.columnRenderer ? col.columnRenderer(row) : (row as any)[col.columnsData]}
                </TableData>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

export default Table;
