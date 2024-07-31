<<<<<<< HEAD:src/components/Table.jsx
function Table({ data, columns }) {
=======
import { Column, DataBookings, DataComments, DataContacts, DataRooms, DataUsers } from '../types/global';

interface TableProps {
  data: (DataBookings | DataRooms | DataUsers | DataContacts)[]
  columns: Column[]
}

function Table({ data, columns }: TableProps) {

>>>>>>> TypeScript:src/components/Table.tsx
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.headerColumn}</th>
            ))}
          </tr>
        </thead>
<<<<<<< HEAD:src/components/Table.jsx
        {data.map((row) => (
          <tbody key={row._id}>
            <tr>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.columnRenderer
                    ? col.columnRenderer(row)
                    : row[col.columnsData]}
=======
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.columnRenderer ? col.columnRenderer(row) : (row as any)[col.columnsData]}
>>>>>>> TypeScript:src/components/Table.tsx
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
