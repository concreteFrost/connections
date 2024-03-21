import React, { MouseEvent } from 'react';
import {
  getSmoothStepPath,
  getEdgeCenter,
  getMarkerEnd,
} from 'react-flow-renderer';
import useStore from '../../../store/store';
import s from "./ButtonEdge.module.scss"



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
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });


  const {deleteEdge} = useStore((store)=>store.flowSlice);

  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
      className={s.wrapper}
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
      >

          <button
            className="edgebutton"
            onClick={()=>deleteEdge(id)}
          >
            ×
          </button>

      </foreignObject>
    </>
  );
};

export default ButtonEdge;
