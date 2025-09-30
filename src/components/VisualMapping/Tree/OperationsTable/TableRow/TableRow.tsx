import { TreeType } from "store/enums/enums";
import { RowElement, RowState } from "store/interfaces/IVisualMapping";

interface Props {
  row: RowState;
  deleteRow: (id: string) => void;
  setRowData: (row_id: string, data: RowElement) => void;
  clearRowData: (row_id: string, type: TreeType) => void;
}

export default function TableRow({
  row,
  deleteRow,
  setRowData,
  clearRowData,
}: Props) {
  function handleDrop(e: React.DragEvent, type: TreeType) {
    e.preventDefault();

    const data = e.dataTransfer.getData("treeItem");
    const parsed = JSON.parse(data);

    if (parsed.type !== type) return;

    setRowData(row.row_id, parsed);
  }
  return (
    <>
      <tr style={{ position: "relative", height: 40 }}>
        <td
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, TreeType.Input)}
          onDoubleClick={() => clearRowData(row.row_id, TreeType.Input)}
        >
          {row.input?.name}
        </td>
        <td>{row.operation}</td>
        <td
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, TreeType.Output)}
          onDoubleClick={() => clearRowData(row.row_id, TreeType.Output)}
        >
          {row.output?.name}{" "}
          <button
            style={{ position: "absolute", right: 10, bottom: 8 }}
            onClick={() => deleteRow(row.row_id)}
          >
            -
          </button>
        </td>
      </tr>
    </>
  );
}
