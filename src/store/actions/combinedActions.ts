import { clearRightPanel } from "./rightPanelActions";
import {
  getBlockData,
  setBigIntParameter,
  setBooleanParameter,
  setBooleanYNParameter,
  setDateTimeParameter,
  setExecutionParameter,
  setFloatParameter,
  setIntegerParameter,
  setStringParameter,
} from "./blockActions";
import { setSelectedNodeID, onNodesChange } from "./nodeActions";
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
import { loadFlow, saveFlow, setFlowIsEnabled, setFlowName, setFlowVersion } from "./flowActions";
import {
  addConfig,
  addSubstitutionKey,
  deleteSubstitution,
  toggleSubstitutionsPanel,
} from "./substitutionsActions";
import {
  getNodeBase,
  setNodeColor,
  setNodeDescription,
  setNodeName,
} from "./baseActions";

const nodeActions = {
  setSelectedNodeID: setSelectedNodeID,
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

const rightPanelActions = {
  clearRightPanel: clearRightPanel,
};

const baseActtions = {
  getNodeBase: getNodeBase,
  setNodeColor: setNodeColor,
  setNodeDescription: setNodeDescription,
  setNodeName: setNodeName,
};

const blockActions = {
  getBlockData: getBlockData,
  setStringParameter: setStringParameter,
  setIntegerParameter: setIntegerParameter,
  setFloatParameter: setFloatParameter,
  setBooleanParameter: setBooleanParameter,
  setBooleanYNParameter: setBooleanYNParameter,
  setDateTimeParameter: setDateTimeParameter,
  setExecutionParameter: setExecutionParameter,
  setBigIntParameter: setBigIntParameter,
};

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
  loadFlow: loadFlow,
  saveFlow: saveFlow,
  setFlowName: setFlowName,
  setFlowVersion: setFlowVersion,
  setFlowIsEnabled: setFlowIsEnabled
};

const tooltipActions = {
  setTooltipText: setTooltipText,
};

const actions = {
  flowActions: flowActions,
  nodeActions: nodeActions,
  groupActions: groupActions,
  leftPanelActions: leftPanelActions,
  rightPanelActions: rightPanelActions,
  substitutionsActions: substitutionsActions,
  baseActtions: baseActtions,
  blockActions: blockActions,
  edgeActions: edgeActions,
  topMenuActions: topMenuActions,
  tooltipActions: tooltipActions,
};

export default actions
