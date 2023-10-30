
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
import { setselectedBlockID, onNodesChange } from "./nodeActions";
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
import { getNodesList, addNode } from "./leftPanelActions";
import { createFlow, loadFlow, openTestFlow, saveFlow, setFlowIsEnabled, setFlowName, setFlowVersion, updateFlow } from "./flowActions";
import {
  addConfig,
  addSubstitutionKey,
  deleteSubstitution,
  toggleSubstitutionsPanel,
} from "./substitutionsActions";
import {
  getBlockProperties,
  setNodeColor,
  setNodeDescription,
  setNodeName,
} from "./baseActions";
import { getParameterValue, setParameterValue } from "./valueEditorActions";
import { getCurrentFlow } from "./serverActions";
import { setUserName } from "./userActions";
import { toggleMessageModal, toggleUpdateFlowModal, setModalMessage } from "./modalActions";


const nodeActions = {
  setselectedBlockID: setselectedBlockID,
  onNodesChange: onNodesChange,
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
  addNode: addNode,
  getNodesList: getNodesList,
};

const baseActtions = {

  getBlockProperties: getBlockProperties,
  setNodeColor: setNodeColor,
  setNodeDescription: setNodeDescription,
  setNodeName: setNodeName,
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
  saveFlow: saveFlow,
  updateFlow: updateFlow,
  setFlowName: setFlowName,
  setFlowVersion: setFlowVersion,
  setFlowIsEnabled: setFlowIsEnabled,

};

const tooltipActions = {
  setTooltipText: setTooltipText,
};

const serverActions = {
  getCurrentFlow: getCurrentFlow,

}

const userActions = {
  setUserName: setUserName
}

const modalActions = {
  toggleMessageModal: toggleMessageModal,
  setModalMessage: setModalMessage,
  toggleUpdateFlowModal: toggleUpdateFlowModal
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
  userActions: userActions,
  modalActions: modalActions
};

export default actions
