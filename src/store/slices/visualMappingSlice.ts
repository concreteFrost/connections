import { RFState } from "store/types/rfState";
import {
  applyNodeChanges,
  Node,
  NodeChange,
  NodeRemoveChange,
} from "react-flow-renderer";
import { Connection, Edge, EdgeChange } from "reactflow";
import { addEdge, applyEdgeChanges } from "react-flow-renderer";
import {
  ITransformNode,
  IVisualMappingNode,
} from "store/interfaces/IVisualMapping";
import {
  deepOrderStructure,
  destinationStructure,
} from "__mocks__/mockVisualMappingItem";
import { createNodeConverter } from "utils/convertNodesToFlowFormat";

// const inputNodes = [
//   {
//     id: "acd944e9-4c06-4979-a27a-dc6ec3e13e6e",
//     type: "source",
//     position: { x: 200, y: 100 },
//     data: { Name: "Orders", DataType: "Array", Label: "Orders", Nodes: [] },
//     draggable: false,
//   },
// ];

const outputNodes = [
  {
    id: "destination-1",
    type: "destination",
    position: { x: 1750, y: 100 },
    data: { label: "Parent", deletable: false },
    draggable: false,
  },
];

const customNodes: Node<ITransformNode>[] = [
  {
    id: "transform-1",
    type: "custom",
    position: { x: 500, y: 200 },
    data: {
      Id: "tr",
      Name: "Transform",
      Script: "",
    },
  },
  {
    id: "transform-2",
    type: "custom",
    position: { x: 750, y: 200 },
    data: {
      Id: "tr",
      Name: "Transform",
      Script: "",
    },
  },
];

export type VisualMappingSlice = {
  MappingId: string;
  MappingName: string;
  CreatedBy: string;
  Created: Date;
  InputStructure: Node<IVisualMappingNode>[];
  OutputStructure: Node<IVisualMappingNode>[];

  TransForms: {
    TransForm: Node<ITransformNode>[];
  };

  Visual: {
    Transforms: {
      Transform: Node<ITransformNode>[];
    };
    Edges: Edge[];
  };

  uploadInputStructure: () => void;
  uploadOutputStructure: () => void;

  onBlocksChange: (changes: NodeChange[]) => void;
  onEdgesConnect: (connection: Connection) => void;
  onEdgeDelete: (edgeId: string) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
};

const visualMappingSlice = (
  get: () => RFState,
  set: any
): VisualMappingSlice => ({
  MappingId: "",
  MappingName: "",
  CreatedBy: "",
  Created: new Date(),
  InputStructure: [
    // ...createNodeConverter()(deepOrderStructure.NodeSet, "source"),
  ],
  OutputStructure: [
    // ...createNodeConverter()(destinationStructure, "destination", 17),
  ],

  TransForms: {
    TransForm: [],
  },

  Visual: {
    Transforms: {
      Transform: [...customNodes],
    },
    Edges: [],
  },

  uploadInputStructure: () => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        InputStructure: [
          ...createNodeConverter()(deepOrderStructure.NodeSet, "source"),
        ],
      },
    }));
  },

  uploadOutputStructure: () => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        OutputStructure: [
          ...createNodeConverter()(destinationStructure, "destination", 17),
        ],
      },
    }));
  },

  onBlocksChange: (changes) => {
    // const findDeleteAction = changes.filter(
    //   (change: NodeChange) => change.type === "remove"
    // );

    const a = applyNodeChanges(
      changes,
      get().visualMappingSlice.Visual.Transforms.Transform
    );

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        Visual: {
          ...state.visualMappingSlice.Visual,
          Transforms: {
            ...state.visualMappingSlice.Visual.Transforms,
            Transform: a,
          },
        },
      },
    }));
  },
  onEdgesConnect: (connection: Connection) => {
    const sourceEdges = get().visualMappingSlice.Visual.Edges;

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
          Visual: {
            ...state.visualMappingSlice.Visual,
            Edges: addEdge(newEdge, state.visualMappingSlice.Visual.Edges),
          },
        },
      }));
    }
  },

  onEdgeDelete: (edgeId: string) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        Visual: {
          ...state.visualMappingSlice.Visual,
          Edges: state.visualMappingSlice.Visual.Edges.filter(
            (edge) => edge.id !== edgeId
          ),
        },
      },
    }));
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        Visual: {
          ...state.visualMappingSlice.Visual,
          Edges: applyEdgeChanges(
            changes,
            state.visualMappingSlice.Visual.Edges
          ),
        },
      },
    }));
  },
});

export default visualMappingSlice;
