function Table({ data, columns }) {

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
