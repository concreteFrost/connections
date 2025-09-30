import { useState } from "react";
import s from "./OperationsTable.module.scss";
import { v4 as uuid } from "uuid";
import TableRow from "./TableRow/TableRow";
import { RowElement, RowState } from "store/interfaces/IVisualMapping";
import { TreeType } from "store/enums/enums";

export default function OperationsTable() {
  const [rows, setRows] = useState<RowState[]>([]);

  function addNewRow() {
    const newRow: RowState = {
      row_id: uuid(),
      input: null,
      operation: "",
      output: null,
    };
    setRows((prev) => [...prev, newRow]);
  }

  function deleteRow(id: string) {
    const filtered = rows.filter((row: RowState) => row.row_id !== id);
    setRows(filtered);
  }

  function setRowData(row_id: string, data: RowElement) {
    setRows((prev) =>
      prev.map((row) =>
        row.row_id === row_id
          ? {
              ...row,
              [data.type]: data,
            }
          : row
      )
    );
  }

  function clearRowData(row_id: string, type: TreeType) {
    setRows((prev) =>
      prev.map((row) =>
        row.row_id === row_id
          ? {
              ...row,
              [type]: null,
            }
          : row
      )
    );
  }

  return (
    <div className={s.table_wrapper}>
      <div className={s.add_row_btn}>
        <button onClick={addNewRow}>+</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>INPUT</th>
            <th>FUNCTION</th>
            <th>OUTPUT</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 &&
            rows.map((row: RowState) => (
              <TableRow
                key={row.row_id}
                row={row}
                deleteRow={deleteRow}
                setRowData={setRowData}
                clearRowData={clearRowData}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
