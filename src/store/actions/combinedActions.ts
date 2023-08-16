import {

  getNodeBase,
  setNodeColor,
  setNodeDescription,
  setNodeName,
} from "./rightPanelActions";
import { getBlockData, setBigIntParameter, setBooleanParameter, setBooleanYNParameter, setDateTimeParameter, setExecutionParameter, setFloatParameter, setIntegerParameter, setStringParameter } from "./blockActions";
import { setSelectedNodeID, onNodesChange } from "./nodeActions";
import { handleConnect, onEdgesChange, onEdgesConnect } from "./edgesActions";
import { hideAllTopMenus, setBgView, toggleDropdown, setSnapToGrid, setSnapStep, toggleMiniMap } from "./topViewActions";
import { addGroup, changeGroupColor, changeGroupLabel, deleteGroup, deleteGroupOnButtonClick, hideAllGroupModals, showGroupModal } from "./groupActions";
import { setTooltipText } from "./tooltipActions";
import { getNodesList, addNode } from "./leftPanelActions";
import { loadFlow, saveFlow } from "./flowActions";
import { toggleSubstitutionsPanel } from "./substitutionsPanelActions";
import { addConfig, addSubstitutionKey, deleteSubstitution } from "./substitutionsActions";

export const nodeActions = {

  setSelectedNodeID: setSelectedNodeID,
  onNodesChange: onNodesChange,
};

export const groupActions = {
  addGroup: addGroup,
  deleteGroup: deleteGroup,
  deleteGroupOnButtonClick: deleteGroupOnButtonClick,
  showGroupModal: showGroupModal,
  setGroupLabel: changeGroupLabel,
  setGroupColor: changeGroupColor,
  hideAllGroupModals: hideAllGroupModals
}

export const leftPanelActions = {
  addNode: addNode,
  getNodesList: getNodesList
}

export const rightPanelActions = {
  getNodeBase: getNodeBase,
  setNodeColor: setNodeColor,
  setNodeDescription: setNodeDescription,
  setNodeName: setNodeName,

};

export const blockActions = {
  getBlockData: getBlockData,
  setStringParameter: setStringParameter,
  setIntegerParameter: setIntegerParameter,
  setFloatParameter: setFloatParameter,
  setBooleanParameter: setBooleanParameter,
  setBooleanYNParameter: setBooleanYNParameter,
  setDateTimeParameter: setDateTimeParameter,
  setExecutionParameter: setExecutionParameter,
  setBigIntParameter: setBigIntParameter,
}

export const edgeActions = {
  handleConnect: handleConnect,
  onEdgesChange: onEdgesChange,
  onEdgesConnect: onEdgesConnect,
};

export const topMenuActions = {
  setBgView: setBgView,
  hideAllTopMenus: hideAllTopMenus,
  toggleDropdown: toggleDropdown,
  setSnapToGrid: setSnapToGrid,
  setSnapStep: setSnapStep,
  showMiniMap: toggleMiniMap,
};

export const substitutionsActions = {
  addSubstitutionKey : addSubstitutionKey,
  addConfig: addConfig,
  deleteSubstitution: deleteSubstitution
}

export const substitutionsPanelActions={
  toggleSubstitutionsPanel : toggleSubstitutionsPanel
}

export const flowActions = {
  loadFlow: loadFlow,
  saveFlow: saveFlow
}

export const tooltipActions = {
  setTooltipText: setTooltipText
}
