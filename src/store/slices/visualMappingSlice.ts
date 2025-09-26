import { RFState } from "store/types/rfState";
import {
  applyNodeChanges,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
} from "react-flow-renderer";
import { Connection, Edge, EdgeChange } from "reactflow";
import {
  ITransformNode,
  IVisualMappingNode,
} from "store/interfaces/IVisualMapping";

import {
  createEdgesFromParentToChildren,
  createNodeConverter,
} from "utils/visualMapping/convertNodesToFlowFormat";
import { v4 as uuidv4 } from "uuid";
import uploadStructure from "store/actions/utils/uploadVisualMappingStructure";

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

  uploadInputStructure: (
    rootNode: IVisualMappingNode,
    pos: { x: number; y: number }
  ) => void;
  uploadOutputStructure: (
    rootNode: IVisualMappingNode,
    pos: { x: number; y: number }
  ) => void;

  createCustomFunctionBlock: (
    pos: { x: number; y: number },
    name: string
  ) => void;

  onBlocksChange: (changes: NodeChange[]) => void;

  createParamsEdges: (nodes: Node<any>[]) => void;
  onEdgesConnect: (connection: Connection) => void;
  onEdgeDelete: (edgeId: string) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
};

const visualMappingSlice = (
  get: () => RFState,
  set: any
): VisualMappingSlice => ({
  //#region  API Part
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
      Transform: [],
    },
    Edges: [],
  },

  //#endregion

  InputStructureEdges: [],
  OutputStructureEdges: [],

  //#region Node Actions
  uploadInputStructure: (
    rootNode: IVisualMappingNode,
    pos: { x: number; y: number }
  ) => {
    const { groupedNodes, folderingEdges, cleanedEdges } = uploadStructure(
      get()
    )(rootNode, "source", pos);
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        InputStructure: groupedNodes,
        InputStructureEdges: folderingEdges,
        Visual: {
          ...state.visualMappingSlice.Visual,
          Edges: cleanedEdges,
        },
      },
    }));
  },

  uploadOutputStructure: (
    rootNode: IVisualMappingNode,
    pos: { x: number; y: number }
  ) => {
    const { groupedNodes, folderingEdges, cleanedEdges } = uploadStructure(
      get()
    )(rootNode, "destination", pos);

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        OutputStructure: groupedNodes,
        OutputStructureEdges: folderingEdges,
        Visual: {
          ...state.visualMappingSlice.Visual,
          Edges: cleanedEdges,
        },
      },
    }));
  },

  createCustomFunctionBlock: (pos: { x: number; y: number }, name: string) => {
    const id = uuidv4();

    const newBlock: Node<any> = {
      id: id,
      type: "custom",
      position: { x: pos.x, y: pos.y },
      data: {
        Id: id,
        Name: name,
        Script: "",
      },
    };

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        Visual: {
          ...state.visualMappingSlice.Visual,
          Transforms: {
            ...state.visualMappingSlice.Visual.Transforms,
            Transform: [
              ...state.visualMappingSlice.Visual.Transforms.Transform,
              newBlock,
            ],
          },
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

    if (changes.some((x) => x.type === "remove")) {
      // console.log(get().visualMappingSlice);
    }
  },

  //#endregion

  //#region Edges Actions
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
  //#endregion
});

export default visualMappingSlice;
