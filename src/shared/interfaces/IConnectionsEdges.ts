import { Edge, EdgeMarkerType } from "reactflow";
import { CSSProperties } from "react";

export default interface ConnectionsEdge<T = any> {
    id: string;
    type?: string;
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
    style?: CSSProperties;
    animated?: boolean;
    hidden?: boolean;
    deletable?: boolean;
    data?: T;
    className?: string;
    sourceNode?: Node;
    targetNode?: Node;
    selected?: boolean;
    markerStart?: EdgeMarkerType;
    markerEnd?: EdgeMarkerType;
    zIndex?: number;
    ariaLabel?: string;
    interactionWidth?: number;
    focusable?: boolean;
    priority:number
}