import { create } from "zustand";
import { nodeActions, edgeActions, rightPanelActions, topMenuActions, groupActions, tooltipActions, leftPanelActions, blockActions } from "./actions/combinedActions";
import initialNodes from "./nodes"
import initialEdges from "./edges";
import { RFState } from "./types/rfState";
import { BackgroundVariant } from "react-flow-renderer";
import { v4 as uuidv4 } from 'uuid';


const useStore = create<RFState>((set, get) => ({
  baseUrl: 'https://iconn.cocoon.technology:9143/iconn',
  flow:{
    blockData:{
      block:[],
    },
    created: new Date(),
    createdBy : "iliaM",
    flowIdentifier: uuidv4(),
    flowName: "New Flow",
    isEnabled: true,
    lastAmended: new Date(),
    lastAmendedBy: "iliaM",
    startBlock: "",
    substitutions:{
      substitution:[]
    },
    visual:{
      blocks:initialNodes,
      edges:initialEdges,
    }
  },
  nodes: initialNodes,
  edges: initialEdges,
  nodeList: [],
  view: BackgroundVariant.Dots,
  selectedNode: null,
  tooltip: {
    text: ''
  },
  rightPanel: {
    base: {
      blockName: "",
      blockColor: "#FFFFFF",
      blockDescription: ""
    },
    parameters: []
  },
  topPanel: {
    dropdowns: {
      view: { id: 'view', isVisible: false },
      exportFlow: { id: 'exportFlow', isVisible: false },
      settings: { id: 'settings', isVisible: false }
    },
    settings: {
      snapToGrid: false,
      snapStep: [1, 1],
      showMiniMap: true
    }
  },


  //Right Panel Actions
  getNodeBase: rightPanelActions.getNodeBase(set, get),
 
  setNodeName: rightPanelActions.setNodeName(set, get),
  setNodeDescription: rightPanelActions.setNodeDescription(set, get),
  setNodeColor: rightPanelActions.setNodeColor(set, get),

  //Block Actions
  getBlockData: blockActions.getBlockData(get, set),
  setStringParameter: blockActions.setStringParameter(get,set),
  setIntegerParameter: blockActions.setIntegerParameter(get,set),
  setFloatParameter:blockActions.setFloatParameter(get,set),
  setBooleanParameter: blockActions.setBooleanParameter(get,set),
  setBooleanYNParameter: blockActions.setBooleanYNParameter(get,set),
  setDateTimeParameter: blockActions.setDateTimeParameter(get,set),
  setExecutionParameter:blockActions.setExecutionParameter(get,set),
  setBigIntParameter: blockActions.setBigIntParameter(get,set),
  //Group Actions
  addNodeGroup: groupActions.addGroup(get, set),
  showGroupModal: groupActions.showGroupModal(set),
  setGroupColor: groupActions.setGroupColor(set),
  setGroupLabel: groupActions.setGroupLabel(set),
  hideAllGroupModals: groupActions.hideAllGroupModals(set),
  deleteGroupOnButtonClick: groupActions.deleteGroupOnButtonClick(get, set),

  //Node Actions
  getNodesList: leftPanelActions.getNodesList(set),
  addNode: leftPanelActions.addNode(get, set),
  setSelectedNodeID: nodeActions.setSelectedNodeID(get, set),
  onNodesChange: nodeActions.onNodesChange(get, set),

  //Edge Actions
  onEdgesChange: edgeActions.onEdgesChange(get, set),
  onConnect: edgeActions.onEdgesConnect(get, set),

  //Top Menu Actions 
  setBgView: topMenuActions.setBgView(set),
  hideAllTopMenus: topMenuActions.hideAllTopMenus(get, set),
  toggleDropdown: topMenuActions.toggleDropdown(get, set),
  setSnapToGrid: topMenuActions.setSnapToGrid(get, set),
  setSnapStep: topMenuActions.setSnapStep(get, set),
  showMiniMap: topMenuActions.showMiniMap(get, set),
  saveFlow: topMenuActions.saveFlow(get,set),
  loadFlow: topMenuActions.loadFlow(get,set),

  //Tooltip
  setTooltipText: tooltipActions.setTooltipText(get, set)


}))

export default useStore;
