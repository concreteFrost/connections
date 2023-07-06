import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  BackgroundVariant,
  NodeChange,
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
    };
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
    }

  };

  setSelectedNodeID: (nodeId: string) => void;
  setTooltipText: (text: string) => void;
  onNodesChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
  addNode: (type: NodeType, posX: number, posY: number) => void;
  getNodeBase: (nodeBase: object) => void;
  setNodeName: (text: string) => void;
  setNodeColor: (color: string) => void;
  setNodeDescription: (description: string) => void;
  setBgView: (view: BackgroundVariant) => void;
  hideAllTopMenus: () => void;
  toggleDropdown: (activeDropdownId: string) => void;
  setSnapToGrid: () => void;
  setSnapStep: (step: number[]) => void;
  //Group Actions
  addNodeGroup: () => void;

  getNodesList: (data: any) => void;


};
