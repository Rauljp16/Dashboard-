import { Column, DataBookings, DataComments, DataContacts, DataRooms, DataUsers } from '../types/global';




interface TableProps extends Column {
  data: (DataBookings | DataRooms | DataUsers | DataContacts)[]
  columns: Column[]
}


function Table({ data, columns }: TableProps) {

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
        {data.map((row) => (
          <tbody key={row.id}>
            <tr >
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.columnRenderer ? col.columnRenderer(row) : row[col.columnsData]}
                </td>
              ))}
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default Table;
