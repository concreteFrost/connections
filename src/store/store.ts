import { create } from "zustand";

import { nodeActions, edgeActions, rightPanelActions, topMenuActions } from "./actions/combinedActions";
import initialNodes from "./nodes"
import initialEdges from "./edges";
import { RFState } from "./types/rfState";
import { BackgroundVariant } from "react-flow-renderer";

const useStore = create<RFState>((set, get) => ({
nodes: initialNodes,
  edges: initialEdges,
  view : BackgroundVariant.Dots,
  selectedNode: null,
  rightPanel: {
    base: {
      blockName: "",
      blockColor: "",
      blockDescription: ""
    }
  },
  topPanel:{
    dropdowns:{
      view:{id:'view', isVisible: false},
      exportFlow:{id:'exportFlow', isVisible : false},
      settings:{id:'settings',isVisible:false}
    },
    settings:{
      snapToGrid:false,
      snapStep: [1,1]
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
  addNodeGroup:nodeActions.addNodeGroup(get,set),

  //Edge Actions
  onEdgesChange: edgeActions.onEdgesChange(get, set),
  onConnect: edgeActions.onEdgesConnect(get, set),

  //Top Menu Actions 
  setBgView : topMenuActions.setBgView(set),
  hideAllTopMenus: topMenuActions.hideAllTopMenus(get,set),
  toggleDropdown: topMenuActions.toggleDropdown(get,set),
  setSnapToGrid:topMenuActions.setSnapToGrid(get,set),
  setSnapStep: topMenuActions.setSnapStep(get,set)
}))

export default useStore;
