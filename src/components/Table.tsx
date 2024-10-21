import React from "react";
import styled from "styled-components";
import {
  Column,
  DataBookings,
  DataContacts,
  DataRooms,
  DataUsers,
} from "../types/global";


const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  border-radius: 10px;
  `;

const StyledTable = styled.table`
  width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    background-color: #ffffff;
    overflow: auto;
`;

const TableHead = styled.thead`
`;

const TableRowHead = styled.tr`
font-size: 18px;
`;

const TableRowBody = styled.tr`
vertical-align: bottom;
  &:hover {
    box-shadow: 0px 0px 10px -3px #000000;
  }
`;

const TableHeader = styled.th`
   box-shadow: 0px 2px 0px 0px #f8f8f8;
  padding: 12px 14px;
  text-align: left;
  font-weight: 600;
`;

const TableData = styled.td`
  padding: 14px;
  box-shadow: 0px 2px 0px 0px #f8f8f8;
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
          <TableRowHead>
            {columns.map((column, index) => (
              <TableHeader key={index}>{column.headerColumn}</TableHeader>
            ))}
          </TableRowHead>
        </TableHead>
        <tbody>
          {data.map((row) => (
            <TableRowBody key={row._id}>
              {columns.map((col, colIndex) => (
                <TableData key={colIndex}>
                  {col.columnRenderer
                    ? col.columnRenderer(row)
                    : (row as any)[col.columnsData]}
                </TableData>
              ))}
            </TableRowBody>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

export default Table;
