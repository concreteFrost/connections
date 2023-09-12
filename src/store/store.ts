import { create } from "zustand";
import  actions from "./actions/combinedActions";
import initialNodes from "./nodes"
import initialEdges from "./edges";
import { RFState } from "./types/rfState";
import { BackgroundVariant } from "react-flow-renderer";
import { v4 as uuidv4 } from 'uuid';


const useStore = create<RFState>((set, get) => ({
  baseUrl: 'https://iconn.cocoon.technology:9143/iconn',
  flow: {
    blockData: [],
    created: new Date(),
    createdBy: "iliaM",
    flowIdentifier: uuidv4(),
    flowName: "New Flow",
    flowConfig: "Debug",
    flowVersion:'1.0.0.0',
    isEnabled: "true",
    lastAmended: new Date(),
    lastAmendedBy: "iliaM",
    startBlock: "",
    serverIdentifier: uuidv4(),
    substitutions: [],
    visual: {
      blocks: initialNodes,
      edges: initialEdges,
    }
  },
  nodeList: [],
  view: BackgroundVariant.Dots,
  selectedNode: null,
  tooltip: {
    text: ''
  },
  substitutionsPanel:{
    isCollapsed: false,
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
    },
    
  },
  errorMessages:{
    substitutionAddError :''
  },


  //Right Panel Actions
  clearRightPanel : actions.rightPanelActions.clearRightPanel(get,set),

  //Base Actions
  getNodeBase: actions.baseActtions.getNodeBase(set, get),
  setNodeName: actions.baseActtions.setNodeName(set, get),
  setNodeDescription: actions.baseActtions.setNodeDescription(set, get),
  setNodeColor: actions.baseActtions.setNodeColor(set, get),

  //Block Actions
  getBlockData: actions.blockActions.getBlockData(get, set),
  setStringParameter: actions.blockActions.setStringParameter(get, set),
  setIntegerParameter: actions.blockActions.setIntegerParameter(get, set),
  setFloatParameter: actions.blockActions.setFloatParameter(get, set),
  setBooleanParameter: actions.blockActions.setBooleanParameter(get, set),
  setBooleanYNParameter: actions.blockActions.setBooleanYNParameter(get, set),
  setDateTimeParameter: actions.blockActions.setDateTimeParameter(get, set),
  setExecutionParameter: actions.blockActions.setExecutionParameter(get, set),
  setBigIntParameter: actions.blockActions.setBigIntParameter(get, set),
  //Group Actions
  addNodeGroup: actions.groupActions.addGroup(get, set),
  showGroupModal: actions.groupActions.showGroupModal(set),
  setGroupColor: actions.groupActions.setGroupColor(set),
  setGroupLabel: actions.groupActions.setGroupLabel(set),
  hideAllGroupModals: actions.groupActions.hideAllGroupModals(set),
  deleteGroupOnButtonClick: actions.groupActions.deleteGroupOnButtonClick(get, set),

  //Node Actions
  getNodesList: actions.leftPanelActions.getNodesList(set),
  addNode: actions.leftPanelActions.addNode(get, set),
  setSelectedNodeID: actions.nodeActions.setSelectedNodeID(get, set),
  onNodesChange: actions.nodeActions.onNodesChange(get, set),

  //Edge Actions
  onEdgesChange: actions.edgeActions.onEdgesChange(get, set),
  onConnect: actions.edgeActions.onEdgesConnect(get, set),

  //Substitutions Actions
  addSubstitutionKey: actions.substitutionsActions.addSubstitutionKey(get,set),
  addConfig: actions.substitutionsActions.addConfig(get,set),
  deleteSubstitution: actions.substitutionsActions.deleteSubstitution(get,set),
  toggleSubstitutionsPanel: actions.substitutionsActions.toggleSubstitutionsPanel(get,set),

  //Top Menu Actions 
  setBgView: actions.topMenuActions.setBgView(set),
  hideAllTopMenus: actions.topMenuActions.hideAllTopMenus(get, set),
  toggleDropdown: actions.topMenuActions.toggleDropdown(get, set),
  setSnapToGrid: actions.topMenuActions.setSnapToGrid(get, set),
  setSnapStep: actions.topMenuActions.setSnapStep(get, set),
  showMiniMap: actions.topMenuActions.showMiniMap(get, set),

  //Flow Actions
  saveFlow: actions.flowActions.saveFlow(get, set),
  loadFlow: actions.flowActions.loadFlow(get, set),
  setFlowName:actions.flowActions.setFlowName(get,set),
  setFlowVersion: actions.flowActions.setFlowVersion(get,set),
  setFlowIsEnabled:actions.flowActions.setFlowIsEnabled(get,set),

  //Tooltip
  setTooltipText: actions.tooltipActions.setTooltipText(get, set)


}))

export default useStore;
