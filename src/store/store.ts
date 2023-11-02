import { create } from "zustand";
import actions from "./actions/combinedActions";
import initialNodes from "./nodes"
import initialEdges from "./edges";
import { RFState } from "./types/rfState";
import { BackgroundVariant } from "react-flow-renderer";
import { initializeFlow } from "./actions/utils/flowUtils";
import { IBlockData } from "./interfaces/IBlock";

const useStore = create<RFState>((set, get) => ({
  flow: initializeFlow(initialNodes, initialEdges),
  server: {
    currentFlow: {},
  },
  blockList: [],
  view: BackgroundVariant.Dots,
  // selectedBlock: {},
  selectedBlockID: null,
  tooltip: {
    text: ''
  },
  substitutionsPanel: {
    isCollapsed: false,
  },
  valueEditor: {
    valueToEdit: '',
    parameterToModify: ''
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


  //Base Actions
  getBlockProperties: actions.baseActtions.getBlockProperties(get, set),
  setNodeName: actions.baseActtions.setNodeName(set, get),
  setNodeDescription: actions.baseActtions.setNodeDescription(set, get),
  setNodeColor: actions.baseActtions.setNodeColor(set, get),

  //Block Actions
  setStringParameter: actions.blockActions.setStringParameter(get, set),
  setIntegerParameter: actions.blockActions.setIntegerParameter(get, set),
  setFloatParameter: actions.blockActions.setFloatParameter(get, set),
  setBooleanParameter: actions.blockActions.setBooleanParameter(get, set),
  setBooleanYNParameter: actions.blockActions.setBooleanYNParameter(get, set),
  setDateTimeParameter: actions.blockActions.setDateTimeParameter(get, set),
  setExecutionParameter: actions.blockActions.setExecutionParameter(get, set),
  setBigIntParameter: actions.blockActions.setBigIntParameter(get, set),
  addCustomParameter: actions.blockActions.addCustomParameter(get, set),
  setSelectedExtendedParameter: actions.blockActions.setSelectedExtendedParameter(get, set),
  deleteExtendedParameter: actions.blockActions.deleteExtendedParameter(get, set),

  //Value Editor Actions
  getParameterValue: actions.valueEditorActions.getParameterValue(set),
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
  setselectedBlockID: actions.nodeActions.setselectedBlockID(get, set),
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
  createFlow: actions.flowActions.createFlow(get, set),
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
