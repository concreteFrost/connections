import { TreeType } from "store/enums/enums";
import { Operations } from "store/interfaces/IVisualMapping";
import useStore from "store/store";
import { RFState } from "store/types/rfState";
import OperationColumn from "../TableColumns/OperationColumn";

interface Props {
  row: Operations;
}

export default function TableRow({ row }: Props) {
  const { deleteRow, setRowData, clearRowData } = useStore(
    (state: RFState) => state.visualMappingSlice
  );

  function handleDrop(e: React.DragEvent, type: TreeType) {
    e.preventDefault();
    const data = e.dataTransfer.getData("treeItem");
    const parsed = JSON.parse(data);
    if (parsed.type !== type) return;

    setRowData(row.rowId, parsed, parsed.type);
  }

  return (
    <tr style={{ position: "relative", height: 40 }}>
      {/* INPUT COLUMN */}
      <td
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, TreeType.Input)}
      >
        <OperationColumn
          rowId={row.rowId}
          items={row.input}
          type={TreeType.Input}
        ></OperationColumn>
      </td>
      {/* OPERATION COLUMN */}
      <td style={{ textAlign: "center" }}>{row.operation || "—"}</td>
      {/* OUTPUT COLUMN */}
      <td
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, TreeType.Output)}
      >
        <OperationColumn
          rowId={row.rowId}
          items={row.output}
          type={TreeType.Output}
        ></OperationColumn>
        <button
          style={{
            position: "absolute",
            right: 8,
            bottom: 8,
            background: "transparent",
            border: "none",
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => deleteRow(row.rowId)}
        >
          −
        </button>
      </td>
    </tr>
  );
}
