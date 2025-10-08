import s from "./OperationsTable.module.scss";
import TableRow from "./TableRow/TableRow";
import { Operations } from "store/interfaces/IVisualMapping";
import useStore from "store/store";
import { RFState } from "store/types/rfState";
import MappingNameForm from "./MappingNameForm/MappingNameForm";

export default function OperationsTable() {
  const { mappingState, addNewRow } = useStore(
    (state: RFState) => state.visualMappingSlice
  );

  function handleAddNewRow() {
    addNewRow();
  }

  return (
    <div className={s.table_wrapper}>
      <MappingNameForm></MappingNameForm>
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
          {mappingState.operations.length > 0 &&
            mappingState.operations.map((row: Operations) => (
              <TableRow key={row.rowId} row={row} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
