import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  BackgroundVariant,
} from "react-flow-renderer";

import { NodeType } from "./nodeTypes";

export type RFState = {
  baseUrl: string,
  nodes: Node[];
  nodeList: NodeType[],
  edges: Edge[];
  view: BackgroundVariant;
  selectedNode: string | null;
  tooltip: {
    text: string
  }
  rightPanel: {
    base: {
      blockName: string;
      blockColor: string;
      blockDescription: string;
    }
    parameters: []
  };
  topPanel: {
    dropdowns:
    {
      view: { id: string, isVisible: boolean },
      exportFlow: { id: string, isVisible: boolean },
      settings: { id: string, isVisible: boolean }
    },
    settings: {
      snapToGrid: boolean,
      snapStep: number[]
      showMiniMap: boolean
    }

  };

  setSelectedNodeID: (nodeId: string) => void;
  setTooltipText: (text: string) => void;
  onNodesChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
  addNode: (type: NodeType, posX: number, posY: number) => void;
  //Right Panel Actions
  getNodeBase: () => void;
  getBlockData: () => void;
  setNodeName: (text: string) => void;
  setNodeColor: (color: string) => void;
  setNodeDescription: (description: string) => void;
  setBlockProperty: (name: any, value: any) => void;

  //Top Menu 
  setBgView: (view: BackgroundVariant) => void;
  hideAllTopMenus: () => void;
  toggleDropdown: (activeDropdownId: string) => void;
  //Settings
  setSnapToGrid: () => void;
  setSnapStep: (step: number[]) => void;
  showMiniMap: () => void;
  //Group Actions
  addNodeGroup: () => void;
  showGroupModal: (nodeId: string, modalToShow: string) => void;
  getNodesList: (data: any) => void;
  setGroupLabel: (nodeId: string, input: string) => void,
  setGroupColor: (nodeId: string, input: string) => void,
  hideAllGroupModals: () => void;
  deleteGroupOnButtonClick: (groupToDelete: any) => void;



};
