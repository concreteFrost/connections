import { Node, NodeProps } from "react-flow-renderer";

const getVisualData = (get: any) => {
  return get().flow.visual.blocks.find((node: NodeProps) => node.id === get().selectedNode)!;
};

const getBlockData = (get: any) => {
  return get().flow.blockData.find((block: any) => block.blockIdentifier === get().selectedNode)!;
};

export const getNodeBase = (set: any, get: any) => () => {
  const nodeData = getVisualData(get);
  const nodeParams = getBlockData(get);

  set((state: any) => ({
    rightPanel: {
      ...state.rightPanel,
      base: {
        blockName: nodeParams.blockLabel,
        blockColor: nodeData.data.color,
        blockDescription: nodeParams.description,
      },
    },
  }));
};

export const setNodeName = (set: any, get: any) => (text: string) => {
  const nodeData = getBlockData(get);
  if (nodeData) {
    nodeData.blockLabel = text;
  }
  set((state: any) => ({
    rightPanel: {
      ...state.rightPanel,
      base: { ...state.rightPanel.base, blockName: text },
    },
    flow: {
      ...state.flow,
      blockData: get().flow.blockData.map((x: Node) => x)
    },
  }));
};

export const setNodeDescription = (set: any, get: any) => (description: string) => {
  const nodeData = getBlockData(get);
  if (nodeData) {
    nodeData.description = description;
  }
  set((state: any) => ({
    rightPanel: {
      ...state.rightPanel,
      base: { ...state.rightPanel.base, blockDescription: description },
    },
    flow: {
      ...state.flow,
      blockData: get().flow.blockData.map((x: Node) => x)
    },
  }));
};

export const setNodeColor = (set: any, get: any) => (color: string) => {
  const nodeData = getVisualData(get);
  if (nodeData) {
    nodeData.data = { ...nodeData.data, color: color };
  }
  set((state: any) => ({
    rightPanel: {
      ...state.rightPanel,
      base: { ...state.rightPanel.base, blockColor: color },
    },
    flow: {
      ...state.flow,
      visual: {
        ...state.flow.visual,
        blocks: get().flow.visual.blocks.map((x: Node) => x),
      },
    },
  }));
};
