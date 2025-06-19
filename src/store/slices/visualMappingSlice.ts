import { RFState } from "store/types/rfState";
import {
  applyNodeChanges,
  Node,
  NodeChange,
  NodeRemoveChange,
} from "react-flow-renderer";
import { Connection, Edge, EdgeChange } from "reactflow";
import { addEdge, applyEdgeChanges } from "react-flow-renderer";

const inputNodes = [
  {
    id: "source-1",
    type: "source",
    position: { x: 200, y: 100 },
    data: { label: "Parent", deletable: false },
    draggable: false,
  },
];

const outputNodes = [
  {
    id: "destination-1",
    type: "destination",
    position: { x: 1750, y: 100 },
    data: { label: "Parent", deletable: false },
    draggable: false,
  },
];

const customNodes = [
  {
    id: "transform-1",
    type: "custom",
    position: { x: 800, y: 100 },
    data: { label: "Parent", deletable: false },
  },
];

export type VisualMappingSlice = {
  blocks: Node<any>[];
  edges: Edge[];
  onBlocksChange: (changes: NodeChange[]) => void;
  onEdgesConnect: (connection: Connection) => void;
  onEdgeDelete: (edgeId: string) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
};

const visualMappingSlice = (
  get: () => RFState,
  set: any
): VisualMappingSlice => ({
  blocks: [...inputNodes, ...outputNodes, ...customNodes],
  edges: [],

  onBlocksChange: (changes) => {
    const findDeleteAction = changes.filter(
      (change: NodeChange) => change.type === "remove"
    );

    const a = applyNodeChanges(changes, get().visualMappingSlice.blocks);

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        blocks: a,
      },
    }));
  },
  onEdgesConnect: (connection: Connection) => {
    const sourceEdges = get().visualMappingSlice.edges;

    // Optional: prevent multiple connections from same source
    const hasDuplicate = sourceEdges.some(
      (edge) =>
        edge.source === connection.source && edge.target === connection.target
    );

    if (!hasDuplicate) {
      const newEdge: any = {
        id: `${connection.source}-${connection.target}`,
        type: "button",
        ...connection,
      };

      set((state: RFState) => ({
        visualMappingSlice: {
          ...state.visualMappingSlice,
          edges: addEdge(newEdge, get().visualMappingSlice.edges),
        },
      }));
    }
  },

  onEdgeDelete: (edgeId: string) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        edges: state.visualMappingSlice.edges.filter(
          (edge) => edge.id !== edgeId
        ),
      },
    }));
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        edges: applyEdgeChanges(changes, state.visualMappingSlice.edges),
      },
    }));
  },
});

export default visualMappingSlice;
