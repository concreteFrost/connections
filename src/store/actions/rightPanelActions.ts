import { Node } from "react-flow-renderer";

export const getNodeBase = (set: any, get: any) => (nodeBase: object) => {
  const nodeData = get().nodes.find((node: Node) => node.id === get().selectedNode)!;

  set((state: any) => ({
    rightPanel: {
      ...state.rightPanel,
      base: {
        blockName: nodeData.data.title,
        blockColor: nodeData.data.color,
        blockDescription: nodeData.data.description,
      },
    },
  }));
};

export const setNodeName = (set: any, get: any) => (text: string) => {
  const nodeData = get().nodes.find((node: Node) => node.id === get().selectedNode)
  if (nodeData) {
    nodeData.data = { ...nodeData.data, title: text };
  }
  set((state: any) => ({
    rightPanel: {
      ...state.rightPanel, base: { ...state.rightPanel.base, blockName: text }
    },
    nodes: get().nodes.map((x: Node) => x)
  }))
}

export const setNodeDescription = (set: any, get: any) => (description: string) => {

  const nodeData = get().nodes.find((node: Node) => node.id === get().selectedNode)
  if (nodeData) {
    nodeData.data = { ...nodeData.data, description: description };
  }
  set((state: any) => ({
    rightPanel: {
      ...state.rightPanel, base: { ...state.rightPanel.base, blockDescription: description }
    },
    nodes: get().nodes.map((x: Node) => x)
  }))
}

export const setNodeColor = (set: any, get: any) => (color: string) => {

  const nodeData = get().nodes.find((node: Node) => node.id === get().selectedNode)
  if (nodeData) {
    nodeData.data = { ...nodeData.data, color: color };
  }
  set((state: any) => ({
    rightPanel: {
      ...state.rightPanel, base: { ...state.rightPanel.base, blockColor: color }
    },
    nodes: get().nodes.map((x: Node) => x)
  }))
}



