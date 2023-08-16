import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  BackgroundVariant,
} from "react-flow-renderer";

import INodeType from "../interfaces/INodeType";

export type RFState = {
  baseUrl: string,
  flow: {
    blockData: [],
    created: Date,
    createdBy: string,
    flowIdentifier: string,
    flowName: string,
    flowVersion:string,
    flowConfig:string,
    isEnabled: boolean,
    lastAmended: Date,
    lastAmendedBy: string,
    serverIdentifier: string,
    startBlock: string,
    substitutions: Array<Object>,
    visual: {
      blocks: Node<any>[],
      edges: Edge<any>[],
    }
  }
  nodeList: INodeType[],
  view: BackgroundVariant;
  selectedNode: string | null;
  tooltip: {
    text: string
  },
  substitutionsPanel:{
    isCollapsed: boolean
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
  addNode: (type: INodeType, posX: number, posY: number) => void;
  //Right Panel Actions
  getNodeBase: () => void;
  getBlockData: () => void;
  setNodeName: (text: string) => void;
  setNodeColor: (color: string) => void;
  setNodeDescription: (description: string) => void;

  //Block Actions
  setStringParameter: (parameterName: string, value: string) => void;
  setIntegerParameter: (parameterName: string, value: number) => void;
  setFloatParameter: (parameterName: string, value: number) => void;
  setBooleanParameter: (parameterName: string, value: boolean) => void;
  setBooleanYNParameter: (parameterName: string, value: string) => void;
  setDateTimeParameter: (parameterName: string, value: Date) => void;
  setExecutionParameter: (parameterName: string, value: string) => void;
  setBigIntParameter: (parameterName: string, value: BigInt) => void;

  //Top Menu 
  setBgView: (view: BackgroundVariant) => void;
  hideAllTopMenus: () => void;
  toggleDropdown: (activeDropdownId: string) => void;
  saveFlow: () => void;
  loadFlow: () => void;

  //Substitutions Panel 
  toggleSubstitutionsPanel:()=>void;

  //Substitutions
  addSubstitutionKey:(key:string)=>void;
  addConfig:(key:string,configName:string,configValue:string)=>void,
  deleteSubstitution:(key:string)=>void,

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
