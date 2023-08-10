import * as React from "react";

interface TableProps<T> {
  columnNames: string[];
  rowData: T[];
  renderRow: (item: T, index: number) => JSX.Element;
}

function Table<T>({ columnNames, rowData, renderRow }: TableProps<T>) {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          {columnNames.map((name, index) => (
            <th
              key={index}
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white ">
        {rowData.map((item, index) => renderRow(item, index))}
      </tbody>
    </table>
  );
}

export default Table;
