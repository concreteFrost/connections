import { create } from "zustand";

import { nodeActions, edgeActions, rightPanelActions } from "./actions/combinedActions";
import initialNodes from "./nodes"
import initialEdges from "./edges";
import { RFState } from "./types/rfState"


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

  //Right Panel Actions
  getNodeBase: rightPanelActions.getNodeBase(set, get),
  setNodeName: rightPanelActions.setNodeName(set, get),
  setNodeDescription: rightPanelActions.setNodeDescription(set, get),
  setNodeColor: rightPanelActions.setNodeColor(set, get),

  //Node Actions
  addNode: nodeActions.addNode(get, set),
  setSelectedNodeID: nodeActions.setSelectedNodeID(set),
  onNodesChange: nodeActions.onNodesChange(get, set),

  //Edge Actions
  onEdgesChange: edgeActions.onEdgesChange(get, set),
  onConnect: edgeActions.onEdgesConnect(get, set)

}))

export default useStore;
