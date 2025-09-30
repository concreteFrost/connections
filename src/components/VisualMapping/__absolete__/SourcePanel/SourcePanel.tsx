import s from "./SourcePanel.module.scss";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  title: string;
}

function SourcePanel({ title }: Props) {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const [draggingLine, setDraggingLine] = useState<{
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
  } | null>(null);

  return (
    <div
      className={s.wrapper}
      ref={leftPanelRef}
      data-testid="designer_left_panel_wrapper"
    >
      <div className={s.content}>
        <div className={s.title}>{title}</div>

        <ul>
          <li className={s.propertyRow}></li>
        </ul>
      </div>
    </div>
  );
}

export default SourcePanel;
