import { TopPanelSlice } from "../slices/topPanelSlice";
import { ModalWindows } from "../slices/modalWindowsSlice";
import { FlowSlice } from "../slices/flowSlice";
import { DesignerVisualElementsSlice } from "../slices/designerVisualElementsSlice";
import { ServerSlice } from "../slices/serverSlice";
import { NotificationSlice } from "../slices/notificationSlice";
import { SecuritySlice } from "../slices/securitySlice";
import { AlertSlice } from "../slices/alertSlice";
import { StatusSlice } from "../slices/statisticsSlice";
import { LoaderSlice } from "../slices/loaderSlice";
import { VisualMappingSlice } from "store/slices/visualMappingSlice";

export type RFState = {
  flowSlice: FlowSlice;
  topPanelSlice: TopPanelSlice;
  modalWindowsSlice: ModalWindows;
  designerVisualElementsSlice: DesignerVisualElementsSlice;
  serverSlice: ServerSlice;
  notificationSlice: NotificationSlice;
  securitySlice: SecuritySlice;
  alertSlice: AlertSlice;
  statisticsSlice: StatusSlice;
  loaderSlice: LoaderSlice;
  visualMappingSlice: VisualMappingSlice;
};
