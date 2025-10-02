import s from "./OperationsTable.module.scss";
import TableRow from "./TableRow/TableRow";
import { MappingState } from "store/interfaces/IVisualMapping";
import useStore from "store/store";
import { RFState } from "store/types/rfState";

export default function OperationsTable() {
  const { mappingState: rows, addNewRow } = useStore(
    (state: RFState) => state.visualMappingSlice
  );

  function handleAddNewRow() {
    addNewRow();
  }

  return (
    <div className={s.table_wrapper}>
      <div className={s.add_row_btn}>
        <button onClick={handleAddNewRow}>+</button>
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
            rows.map((row: MappingState) => (
              <TableRow key={row.row_id} row={row} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
