import { create } from "zustand";
import actions from "./actions/combinedActions";
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
    createdBy: '',
    flowIdentifier: uuidv4(),
    flowName: "New Flow" + uuidv4().split('-')[0],
    flowConfig: "Debug",
    flowVersion: '1.0.0.0',
    isEnabled: "true",
    lastAmended: new Date(),
    lastAmendedBy: "",
    startBlock: "",
    serverIdentifier: uuidv4(),
    substitutions: [],
    visual: {
      blocks: initialNodes,
      edges: initialEdges,
    }
  },
  server: {
    currentFlow: {},

  },
  nodeList: [],
  view: BackgroundVariant.Dots,
  selectedNode: null,
  tooltip: {
    text: ''
  },
  substitutionsPanel: {
    isCollapsed: false,
  },
  rightPanel: {
    base: {
      blockName: "",
      blockColor: "#FFFFFF",
      blockDescription: ""
    },
    parameters: [],
    extendedParameters: [],
    valueEditor: {
      inputValue: '',
      parameterName: ''
    }
  },
  modalWindows: {
    updateFlowModal: {
      isVisible: false,
    },
    messageModal: {
      isVisible: false,
      message: '',
    }
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
  errorMessages: {
    substitutionAddError: ''
  },


  //Right Panel Actions
  clearRightPanel: actions.rightPanelActions.clearRightPanel(get, set),

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
  addCustomParameter: actions.blockActions.addCustomParameter(get, set),

  //Value Editor Actions
  getParameterValue: actions.valueEditorActions.getParameterValue(get, set),
  setParameterValue: actions.valueEditorActions.setParameterValue(get, set),

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
  addSubstitutionKey: actions.substitutionsActions.addSubstitutionKey(get, set),
  addConfig: actions.substitutionsActions.addConfig(get, set),
  deleteSubstitution: actions.substitutionsActions.deleteSubstitution(get, set),
  toggleSubstitutionsPanel: actions.substitutionsActions.toggleSubstitutionsPanel(get, set),

  //Server Actions
  getCurrentFlow: actions.serverActions.getCurrentFlow(get, set),

  //Top Menu Actions 
  setBgView: actions.topMenuActions.setBgView(set),
  hideAllTopMenus: actions.topMenuActions.hideAllTopMenus(get, set),
  toggleDropdown: actions.topMenuActions.toggleDropdown(get, set),
  setSnapToGrid: actions.topMenuActions.setSnapToGrid(get, set),
  setSnapStep: actions.topMenuActions.setSnapStep(get, set),
  showMiniMap: actions.topMenuActions.showMiniMap(get, set),

  //Flow Actions
  openFlow: actions.flowActions.openTestFlow(get, set),
  saveFlow: actions.flowActions.saveFlow(get, set),
  updateFlow: actions.flowActions.updateFlow(get, set),
  loadFlow: actions.flowActions.loadFlow(get, set),
  setFlowName: actions.flowActions.setFlowName(get, set),
  setFlowVersion: actions.flowActions.setFlowVersion(get, set),
  setFlowIsEnabled: actions.flowActions.setFlowIsEnabled(get, set),

  //Tooltip
  setTooltipText: actions.tooltipActions.setTooltipText(get, set),

  //User Actions
  setUserName: actions.userActions.setUserName(get, set),

  //Modal Actions
  toggleMessageModal: actions.modalActions.toggleMessageModal(get, set),
  setModalMessage: actions.modalActions.setModalMessage(get, set),
  toggleUpdateFlowModal: actions.modalActions.toggleUpdateFlowModal(get, set)

}))

export default useStore;
