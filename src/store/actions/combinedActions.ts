import {
  getNodeBase,
  setNodeColor,
  setNodeDescription,
  setNodeName,
} from "./rightPanelActions";
import { addNode, setSelectedNodeID, onNodesChange, getNodesList } from "./nodeActions";
import { handleConnect, onEdgesChange, onEdgesConnect } from "./edgesActions";
import { hideAllTopMenus, setBgView, toggleDropdown, setSnapToGrid, setSnapStep } from "./topViewActions";
import { addGroup } from "./groupActions";

export const nodeActions = {
  getNodesList: getNodesList,
  addNode: addNode,
  setSelectedNodeID: setSelectedNodeID,
  onNodesChange: onNodesChange,
};

export const groupActions = {
  addGroup: addGroup
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
  setSnapStep: setSnapStep
};
