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
import { NotificationSlice } from "../slices/notificationSlice";
import { SecuritySlice } from "../slices/securitySlice";
import { AlertSlice } from "../slices/alertSlice";
import { UserSlice } from "../slices/userSlice";

export type RFState = {

  blockList: INodeType[];
  flowSlice: FlowSlice,
  topPanelSlice: TopPanelSlice,
  modalWindowsSlice: ModalWindows,
  designerVisualElementsSlice: DesignerVisualElementsSlice,
  serverSlice: ServerSlice,
  notificationSlice: NotificationSlice,
  securitySlice: SecuritySlice,
  alertSlice: AlertSlice,
  userSlice:UserSlice

  //Value Editor Actions

  getBlocksList: (data: any) => void;
  addBlock: (type: INodeType, posX: number, posY: number) => void;
  onBlocksChange: OnNodesChange;
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
};
