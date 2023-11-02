import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  BackgroundVariant,
} from "react-flow-renderer";

import { INodeType } from "../interfaces/INode";
import { ISubstitutions } from "../interfaces/ISubstitutions";
import { TopPanelSlice } from "../slices/topPanelSlice";
import { ModalWindows } from "../slices/modalWindowsSlice";

export type RFState = {
  flow: {
    blockData: [];
    created: Date;
    createdBy: string;
    flowIdentifier: string;
    flowName: string;
    flowVersion: string;
    flowConfig: string;
    isEnabled: string;
    lastAmended: Date;
    lastAmendedBy: string;
    serverIdentifier: string;
    startBlock: string;
    substitutions: Array<ISubstitutions>;
    visual: {
      blocks: Node<any>[];
      edges: Edge<any>[];
    };
  };
  blockList: INodeType[];
  view: BackgroundVariant;
  selectedBlockID: string | null;
  tooltip: {
    text: string;
  };
  substitutionsPanel: {
    isCollapsed: boolean;
  };
  valueEditor: {
    valueToEdit: string;
    parameterToModify: string;
  };
  server: {
    currentFlow: object;
  };

  errorMessages: {
    substitutionAddError: string;
  };

  topPanelSlice: TopPanelSlice,
  modalWindowsSlice: ModalWindows,

  setselectedBlockID: (nodeId: string) => void;
  setTooltipText: (text: string) => void;
  onBlocksChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
  addBlock: (type: INodeType, posX: number, posY: number) => void;

  setBlockName: (text: string) => void;
  setBlockColor: (color: string) => void;
  setBlockDescription: (description: string) => void;

  //Block Actions
  getBlockProperties: () => void;
  setStringParameter: (parameterName: string, value: string) => void;
  setIntegerParameter: (parameterName: string, value: number) => void;
  setFloatParameter: (parameterName: string, value: number) => void;
  setBooleanParameter: (parameterName: string, value: boolean) => void;
  setBooleanYNParameter: (parameterName: string, value: string) => void;
  setDateTimeParameter: (parameterName: string, value: Date) => void;
  setExecutionParameter: (parameterName: string, value: string) => void;
  setBigIntParameter: (parameterName: string, value: BigInt) => void;
  addCustomParameter: (name: string, value: string) => boolean | undefined;
  setSelectedExtendedParameter: (parameterName: string, value: string) => void;
  deleteExtendedParameter: (parameterName: string) => void;

  //Value Editor Actions
  getParameterValue: (parameterName: string, value: string) => void;
  setParameterValue: (propertyName: string, value: string) => void;

  //Flow
  openFlow: () => void;
  saveFlow: () => void;
  updateFlow: (match: any) => void;
  loadFlow: (id: string) => void;
  setFlowName: (name: string) => void;
  setFlowVersion: (version: string) => void;
  setFlowIsEnabled: () => void;
  createFlow: () => void;

  //Substitutions Panel
  toggleSubstitutionsPanel: () => void;

  //Substitutions
  addSubstitutionKey: (key: string) => void;
  addConfig: (key: string, configName: string, configValue: string) => void;
  deleteSubstitution: (key: string) => void;

  //Server Actions
  getCurrentFlow: (flowId: string) => void;

  //Group Actions
  addBlockGroup: () => void;
  showGroupModal: (nodeId: string, modalToShow: string) => void;
  getBlocksList: (data: any) => void;
  setGroupLabel: (nodeId: string, input: string) => void;
  setGroupColor: (nodeId: string, input: string) => void;
  hideAllGroupModals: () => void;
  deleteGroupOnButtonClick: (groupToDelete: any) => void;

  //User Actions
  setUserName: (userName: string) => void;


};
