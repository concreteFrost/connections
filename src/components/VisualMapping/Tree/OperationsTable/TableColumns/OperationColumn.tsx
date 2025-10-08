import { TreeType } from "store/enums/enums";
import { MappingField } from "store/interfaces/IVisualMapping";
import useStore from "store/store";
import { RFState } from "store/types/rfState";
import s from "./Column.module.scss";
import clsx from "clsx";

export default function OperationColumn({
  rowId,
  items,
  type,
}: {
  rowId: string;
  items: MappingField[];
  type: TreeType;
}) {
  const { clearRowData } = useStore(
    (state: RFState) => state.visualMappingSlice
  );

  if (items.length === 0)
    return <span style={{ opacity: 0.5 }}>Drop {type} field here</span>;

  const spanClass = type === TreeType.Input ? `${s.input}` : `${s.output}`;
  return (
    <div className={s.wrapper}>
      {items.map((field: MappingField) => (
        <span
          onDoubleClick={() => clearRowData(rowId, type, field.name)}
          key={field.name}
          className={clsx(s.column, spanClass)}
        >
          {field.name}
        </span>
      ))}
    </div>
  );
}
