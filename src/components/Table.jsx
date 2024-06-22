function Table({ headerColumns, columnsData, data, columnRenderers }) {

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headerColumns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columnsData.map((column, colIndex) => (
                <td key={colIndex}>
                  {columnRenderers[column] ? columnRenderers[column](row) : row[column]}
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
