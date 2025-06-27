import { RFState } from "store/types/rfState";
import { applyNodeChanges, Node, NodeChange } from "react-flow-renderer";
import { Connection, Edge, EdgeChange } from "reactflow";
import { addEdge, applyEdgeChanges } from "react-flow-renderer";
import {
  ITransformNode,
  IVisualMappingNode,
} from "store/interfaces/IVisualMapping";

import {
  createEdgesFromParentToChildren,
  createNodeConverter,
} from "utils/convertNodesToFlowFormat";
import { customNodes } from "__mocks__/mockVisualMappingItem";

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
      Transform: Node<any>[];
    };
    Edges: Edge[];
  };

  InputStructureEdges: Edge[]; //stores "folding" edges for InputStructure
  OutputStructureEdges: Edge[]; //stores "folding" edges for OutputStructure

  uploadInputStructure: (rootNode: IVisualMappingNode) => void;
  uploadOutputStructure: (rootNode: IVisualMappingNode) => void;
  createParamsEdges: (nodes: Node<any>[]) => void;

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
  InputStructure: [],
  OutputStructure: [],
  TransForms: {
    TransForm: [],
  },
  Visual: {
    Transforms: {
      Transform: [...customNodes],
    },
    Edges: [],
  },

  InputStructureEdges: [],
  OutputStructureEdges: [],

  uploadInputStructure: (rootNode: IVisualMappingNode) => {
    const group: Node<any> = {
      id: "inputGroup",
      type: "mappingGroup",
      position: { x: 50, y: 100 },
      data: { label: "SOURCE" },
    };

    const convertedNodes = createNodeConverter()(rootNode, "source", group);
    const edges = createEdgesFromParentToChildren(convertedNodes); // creates "folding" edges
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        InputStructure: [group, ...convertedNodes],
        InputStructureEdges: edges,
      },
    }));
  },

  uploadOutputStructure: (rootNode: IVisualMappingNode) => {
    const group: Node<any> = {
      id: "outputGroup",
      type: "mappingGroup",
      position: { x: 1500, y: 100 },
      data: { label: "OUTPUT" },
    };
    const convertedNodes = createNodeConverter()(
      rootNode,
      "destination",
      group,
      -1
    );

    // 2. Создаём рёбра ОДИН раз, пока структура ещё «сырая»
    const edges = createEdgesFromParentToChildren(convertedNodes);

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        OutputStructure: [group, ...convertedNodes],
        OutputStructureEdges: edges,
      },
    }));
  },

  createParamsEdges: (nodes: Node<any>[]) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        Visual: {
          ...state.visualMappingSlice.Visual,
          Edges: createEdgesFromParentToChildren(nodes),
        },
      },
    }));
  },

  onBlocksChange: (changes: NodeChange[]) => {
    const transforms = [
      ...get().visualMappingSlice.Visual.Transforms.Transform,
    ];
    const sources = [...get().visualMappingSlice.InputStructure];
    const outputs = [...get().visualMappingSlice.OutputStructure];
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        InputStructure: applyNodeChanges(changes, sources),
        OutputStructure: applyNodeChanges(changes, outputs),
        Visual: {
          ...state.visualMappingSlice.Visual,
          Transforms: {
            ...state.visualMappingSlice.Visual.Transforms,
            Transform: applyNodeChanges(changes, transforms),
          },
        },
      },
    }));

    if (changes.some((x) => x.type === "remove"))
      console.log(get().visualMappingSlice);
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
