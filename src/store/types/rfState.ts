import {
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  BackgroundVariant,
} from "react-flow-renderer";

import { INodeType } from "../interfaces/INode";

import { TopPanelSlice } from "../slices/topPanelSlice";
import { ModalWindows } from "../slices/modalWindowsSlice";
import { FlowSlice } from "../slices/flowSlice";

export type RFState = {
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

  flowSlice: FlowSlice,
  topPanelSlice: TopPanelSlice,
  modalWindowsSlice: ModalWindows,

  setselectedBlockID: (nodeId: string) => void;
  setTooltipText: (text: string) => void;
  onBlocksChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
  addBlock: (type: INodeType, posX: number, posY: number) => void;

  //Value Editor Actions
  getParameterValue: (parameterName: string, value: string) => void;
  setParameterValue: (propertyName: string, value: string) => void;

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
