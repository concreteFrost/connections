import {
  getNodeBase,
  setNodeColor,
  setNodeDescription,
  setNodeName,
} from "./rightPanelActions";
import { addNode, setSelectedNodeID, onNodesChange, addGroup } from "./nodeActions";
import { handleConnect, onEdgesChange, onEdgesConnect } from "./edgesActions";
import { hideAllTopMenus, setBgView, toggleDropdown, setSnapToGrid, setSnapStep } from "./topViewActions";

export const nodeActions = {
  addNode: addNode,
  setSelectedNodeID: setSelectedNodeID,
  onNodesChange: onNodesChange,
  addNodeGroup: addGroup
};

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
  hideAllTopMenus : hideAllTopMenus,
  toggleDropdown:  toggleDropdown,
  setSnapToGrid : setSnapToGrid,
  setSnapStep: setSnapStep
};
