import {
  getNodeBase,
  setNodeColor,
  setNodeDescription,
  setNodeName,
} from "./rightPanelActions";
import { addNode, setSelectedNodeID, onNodesChange, getNodesList } from "./nodeActions";
import { handleConnect, onEdgesChange, onEdgesConnect } from "./edgesActions";
import { hideAllTopMenus, setBgView, toggleDropdown, setSnapToGrid, setSnapStep, toggleMiniMap } from "./topViewActions";
import { addGroup, changeGroupColor, changeGroupLabel, deleteGroup, deleteGroupOnButtonClick, hideAllGroupModals, showGroupModal } from "./groupActions";
import { setTooltipText } from "./tooltipActions";

export const nodeActions = {
  getNodesList: getNodesList,
  addNode: addNode,
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

export const rightPanelActions = {
  getNodeBase: getNodeBase,
  setNodeColor: setNodeColor,
  setNodeDescription: setNodeDescription,
  setNodeName: setNodeName,
};

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
  showMiniMap: toggleMiniMap
};

export const tooltipActions = {
  setTooltipText: setTooltipText
}
