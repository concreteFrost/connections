import React, { MouseEvent, useEffect, useState, useMemo } from "react";
import {
  getSmoothStepPath,
  getEdgeCenter,
  getMarkerEnd,
} from "react-flow-renderer";
import useStore from "../../../store/store";
import s from "./ButtonEdge.module.scss";
import IConnectionsEdge from "../../../store/interfaces/IConnectionsEdges";

const foreignObjectSize = 30;
const ButtonEdge: React.FC<any> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { deleteEdge } = useStore((store) => store.flowSlice);
  const { edges } = useStore((store) => store.flowSlice.flow.visual);
  const [isPriorityVisible, setPriorityVisible] = useState<boolean>(false);
  const [edgeCenterX, edgeCenterY] = useMemo(() => {
    return getEdgeCenter({ sourceX, sourceY, targetX, targetY });
  }, [sourceX, sourceY, targetX, targetY]);

  const matchEdge = useMemo(() => edges.find((x: IConnectionsEdge) => x.id === id), [edges]);

  useEffect(() => {
    const moreThanOneEdge = edges.filter((e: IConnectionsEdge) => e.source === matchEdge?.source);
    setPriorityVisible(moreThanOneEdge.length > 1 ? true : false);
  }, [edges]);

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {isPriorityVisible ? (
        <foreignObject
          width={35}
          height={35}
          x={edgeCenterX - 18}
          y={edgeCenterY - 50}
        >
          <div className={s.priority_text}>{matchEdge?.priority}</div>
        </foreignObject>
      ) : null}
      <foreignObject
        className={s.delete_edge_button_wrapper}
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
      >
        <button className="edgebutton" onClick={() => deleteEdge(id)}>
          ×
        </button>
      </foreignObject>
    </>
  );
};

export default ButtonEdge;
