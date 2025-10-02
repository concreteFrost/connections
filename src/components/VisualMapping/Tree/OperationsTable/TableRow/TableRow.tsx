import { TreeType } from "store/enums/enums";
import { RowElement, MappingState } from "store/interfaces/IVisualMapping";
import useStore from "store/store";
import { RFState } from "store/types/rfState";

interface Props {
  row: MappingState;
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
