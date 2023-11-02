import { create } from "zustand";
import actions from "./actions/combinedActions";
import { RFState } from "./types/rfState";
import { BackgroundVariant } from "react-flow-renderer";
import topPanelSlice from "./slices/topPanelSlice";
import modalWindowsSlice from "./slices/modalWindowsSlice";
import flowSlice from "./slices/flowSlice";

const useStore = create<RFState>((set, get) => ({
  server: {
    currentFlow: {},
  },
  blockList: [],
  view: BackgroundVariant.Dots,
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
  errorMessages: {
    substitutionAddError: ''
  },
  flowSlice: flowSlice(get, set),
  topPanelSlice: topPanelSlice(get, set),
  modalWindowsSlice: modalWindowsSlice(get, set),



  //Value Editor Actions
  getParameterValue: actions.valueEditorActions.getParameterValue(set),
  setParameterValue: actions.valueEditorActions.setParameterValue(get, set),

  //Group Actions
  addBlockGroup: actions.groupActions.addGroup(get, set),
  showGroupModal: actions.groupActions.showGroupModal(set),
  setGroupColor: actions.groupActions.setGroupColor(set),
  setGroupLabel: actions.groupActions.setGroupLabel(set),
  hideAllGroupModals: actions.groupActions.hideAllGroupModals(set),
  deleteGroupOnButtonClick: actions.groupActions.deleteGroupOnButtonClick(get, set),

  //Node Actions
  getBlocksList: actions.leftPanelActions.getBlocksList(set),
  addBlock: actions.leftPanelActions.addBlock(get, set),
  setselectedBlockID: actions.nodeActions.setselectedBlockID(get, set),
  onBlocksChange: actions.nodeActions.onBlocksChange(get, set),

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
