
import {
  addCustomParameter,
  deleteExtendedParameter,
  setBigIntParameter,
  setBooleanParameter,
  setBooleanYNParameter,
  setDateTimeParameter,
  setExecutionParameter,
  setFloatParameter,
  setIntegerParameter,
  setSelectedExtendedParameter,
  setStringParameter,
} from "./blockActions";
import { setselectedBlockID, onBlocksChange } from "./nodeActions";
import { handleConnect, onEdgesChange, onEdgesConnect } from "./edgesActions";
import {
  hideAllTopMenus,
  setBgView,
  toggleDropdown,
  setSnapToGrid,
  setSnapStep,
  toggleMiniMap,
} from "./topViewActions";
import {
  addGroup,
  changeGroupColor,
  changeGroupLabel,
  deleteGroup,
  deleteGroupOnButtonClick,
  hideAllGroupModals,
  showGroupModal,
} from "./groupActions";
import { setTooltipText } from "./tooltipActions";
import { getBlocksList, addBlock } from "./leftPanelActions";
import { createFlow, loadFlow, loadFlowFromDraft, openTestFlow, saveDraftFlow,setFlowIsEnabled, setFlowName, setFlowVersion } from "./flowActions";
import {
  addConfig,
  addSubstitutionKey,
  deleteSubstitution,
  toggleSubstitutionsPanel,
} from "./substitutionsActions";
import {
  getBlockProperties,
  setBlockColor,
  setBlockDescription,
  setBlockName,
} from "./baseActions";
import { getParameterValue, setParameterValue } from "./valueEditorActions";
import { getCurrentFlow, toggleFlowControlState } from "./serverActions";

import { toggleMessageModal, setModalMessage, toggleUpdateFlowModal, } from "./modalActions";


const nodeActions = {
  setselectedBlockID: setselectedBlockID,
  onBlocksChange: onBlocksChange,
};

const groupActions = {
  addGroup: addGroup,
  deleteGroup: deleteGroup,
  deleteGroupOnButtonClick: deleteGroupOnButtonClick,
  showGroupModal: showGroupModal,
  setGroupLabel: changeGroupLabel,
  setGroupColor: changeGroupColor,
  hideAllGroupModals: hideAllGroupModals,
};

const leftPanelActions = {
  addBlock: addBlock,
  getBlocksList: getBlocksList,
};

const baseActtions = {

  getBlockProperties: getBlockProperties,
  setBlockColor: setBlockColor,
  setBlockDescription: setBlockDescription,
  setBlockName: setBlockName,
};

const blockActions = {
  getBlockProperties: getBlockProperties,
  setStringParameter: setStringParameter,
  setIntegerParameter: setIntegerParameter,
  setFloatParameter: setFloatParameter,
  setBooleanParameter: setBooleanParameter,
  setBooleanYNParameter: setBooleanYNParameter,
  setDateTimeParameter: setDateTimeParameter,
  setExecutionParameter: setExecutionParameter,
  setBigIntParameter: setBigIntParameter,
  addCustomParameter: addCustomParameter,
  setSelectedExtendedParameter: setSelectedExtendedParameter,
  deleteExtendedParameter: deleteExtendedParameter
};

const valueEditorActions = {
  getParameterValue: getParameterValue,
  setParameterValue: setParameterValue
}

const edgeActions = {
  handleConnect: handleConnect,
  onEdgesChange: onEdgesChange,
  onEdgesConnect: onEdgesConnect,
};

const topMenuActions = {
  setBgView: setBgView,
  hideAllTopMenus: hideAllTopMenus,
  toggleDropdown: toggleDropdown,
  setSnapToGrid: setSnapToGrid,
  setSnapStep: setSnapStep,
  showMiniMap: toggleMiniMap,
};

const substitutionsActions = {
  addSubstitutionKey: addSubstitutionKey,
  addConfig: addConfig,
  deleteSubstitution: deleteSubstitution,
  toggleSubstitutionsPanel: toggleSubstitutionsPanel,
};

const flowActions = {
  createFlow: createFlow,
  openTestFlow: openTestFlow,
  loadFlow: loadFlow,
  loadFlowFromDraft: loadFlowFromDraft,
  saveDraftFlow:saveDraftFlow,
  setFlowName: setFlowName,
  setFlowVersion: setFlowVersion,
  setFlowIsEnabled: setFlowIsEnabled,

};

const tooltipActions = {
  setTooltipText: setTooltipText,
};

const serverActions = {
  getCurrentFlow: getCurrentFlow,
  toggleFlowControlState: toggleFlowControlState

}

const modalActions = {
  toggleMessageModal: toggleMessageModal,
  toggleUpdateFlowModal: toggleUpdateFlowModal,
  setModalMessage: setModalMessage,
}

const actions = {
  flowActions: flowActions,
  nodeActions: nodeActions,
  groupActions: groupActions,
  leftPanelActions: leftPanelActions,
  substitutionsActions: substitutionsActions,
  baseActtions: baseActtions,
  blockActions: blockActions,
  edgeActions: edgeActions,

  serverActions: serverActions,
  topMenuActions: topMenuActions,
  tooltipActions: tooltipActions,
  valueEditorActions: valueEditorActions,
  modalActions: modalActions
};

export default actions
