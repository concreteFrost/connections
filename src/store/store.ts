import { create } from "zustand";

import {
  Connection,
  Edge,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
} from "react-flow-renderer";

import {
  updateNodeText,
  updateNodeColor,
  handleConnect,
  addNode,
  setNum,
  setOperationType,
  performMathOperation
} from "./nodeServices";

import initialNodes from "./nodes"
import initialEdges from "./edges";
import { NodeType } from "./nodeTypes";


type RFState = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: string | null,
  rightPanel: {
    base: {
      blockName: string,
      blockColor: string,
      blockDescription: string
    }
  }
  setSelectedNodeID: (nodeId: string) => void;
  onNodesChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
  updateNodeColor: (nodeId: string, color: string) => void;
  updateNodeText: (nodeId: string, text: string) => void;
  addNode: (type: NodeType) => void;
  mathOperation: (nodeId: string) => void;
  setMathOperationType: (type: string, id: string) => void;
  setNum: (nodeId: string, num: number) => void;
  getNodeBase: (nodeBase: object) => void;
  setNodeName: (text: string) => void;
  setNodeColor: (color: string) => void;
  setNodeDescription: (description: string) => void;

};

const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  rightPanel: {
    base: {
      blockName: "",
      blockColor: "",
      blockDescription: ""
    }
  },

  getNodeBase: (nodeBase: object) => {
    const nodeData = get().nodes.find((node: Node) => node.id === get().selectedNode)!

    set((state) => ({
      rightPanel: {
        ...state.rightPanel,
        base: {
          blockName: nodeData.data.title,
          blockColor: nodeData.data.color,
          blockDescription: nodeData.data.description
        }
      }
    }))
  },

  setNodeName: (text: string) => {
    const nodeData = get().nodes.find((node: Node) => node.id === get().selectedNode)
    if (nodeData) {
      nodeData.data = { ...nodeData.data, title: text };
    }
    set((state) => ({
      rightPanel: {
        ...state.rightPanel, base: { ...state.rightPanel.base, blockName: text }
      },
      nodes: get().nodes.map((x: Node) => x)
    }))
  },

  setNodeDescription: (description: string) => {
    const nodeData = get().nodes.find((node: Node) => node.id === get().selectedNode)
    if (nodeData) {
      nodeData.data = { ...nodeData.data, description: description };
    }
    set((state) => ({
      rightPanel: {
        ...state.rightPanel, base: { ...state.rightPanel.base, blockDescription: description }
      },
      nodes: get().nodes.map((x: Node) => x)
    }))
  },

  setNodeColor: (color: string) => {
    const nodeData = get().nodes.find((node: Node) => node.id === get().selectedNode)
    if (nodeData) {
      nodeData.data = { ...nodeData.data, color: color };
    }
    set((state) => ({
      rightPanel: {
        ...state.rightPanel, base: { ...state.rightPanel.base, blockColor: color }
      },
      nodes: get().nodes.map((x: Node) => x)
    }))
  },



  setSelectedNodeID: (nodeId: string) => {
    set({ selectedNode: nodeId })

  },

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {

    set({ edges: handleConnect(connection, get()) });
  },

  updateNodeColor: (nodeId: string, color: string) => {
    set({
      nodes: updateNodeColor(get().nodes, nodeId, color)
    });
  },

  updateNodeText: (nodeId: string, text: string) => {
    set({
      nodes: updateNodeText(get().nodes, nodeId, text),
    });
  },

  addNode: (type: NodeType) => {
    set((state) => ({
      nodes: [...state.nodes, addNode(get().nodes, type)],
    }));
  },

  mathOperation: (nodeId: string) => {
    set({
      nodes: performMathOperation(get().nodes, nodeId)
    });
  },

  setMathOperationType: (type: string, id: string) => {
    set({
      nodes: setOperationType(get().nodes, id, type)
    })
  },

  setNum: (nodeId: string, num: number) => {
    set({ nodes: setNum(get().nodes, nodeId, num) })
  },

}))

export default useStore;
