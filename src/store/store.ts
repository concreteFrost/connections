import { create } from "zustand";

import { nodeActions, edgeActions, rightPanelActions, topMenuActions } from "./actions/combinedActions";
import initialNodes from "./nodes"
import initialEdges from "./edges";
import { RFState } from "./types/rfState";
import { BackgroundVariant } from "react-flow-renderer";
import { hideAllTopMenus } from "./actions/topViewActions";


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
      exportFlow:{id:'exportFlow', isVisible : false}
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
  onConnect: edgeActions.onEdgesConnect(get, set),

  //Top Menu Actions 
  setBgView : topMenuActions.setBgView(set),
  hideAllTopMenus: topMenuActions.hideAllTopMenus(get,set),
  toggleDropdown: topMenuActions.toggleDropdown(get,set)

}))

export default useStore;
