import {
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "react-flow-renderer";

import { INodeType } from "../interfaces/INode";
import { TopPanelSlice } from "../slices/topPanelSlice";
import { ModalWindows } from "../slices/modalWindowsSlice";
import { FlowSlice } from "../slices/flowSlice";
import { DesignerVisualElementsSlice } from "../slices/designerVisualElementsSlice";
import { ServerSlice } from "../slices/serverSlice";

export type RFState = {

  blockList: INodeType[];
  selectedBlockID: string | null;
  flowSlice: FlowSlice,
  topPanelSlice: TopPanelSlice,
  modalWindowsSlice: ModalWindows,
  designerVisualElementsSlice: DesignerVisualElementsSlice,
  serverSlice: ServerSlice,


  //Value Editor Actions

  getBlocksList: (data: any) => void;
  addBlock: (type: INodeType, posX: number, posY: number) => void;
  setselectedBlockID: (nodeId: string) => void;
  onBlocksChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;

  //User Actions
  setUserName: (userName: string) => void;


};
