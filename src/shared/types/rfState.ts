import { TopPanelSlice } from "store/slices/topPanelSlice";
import { ModalWindows } from "store/slices/modalWindowsSlice";
import { FlowSlice } from "store/slices/flowSlice";
import { DesignerVisualElementsSlice } from "store/slices/designerVisualElementsSlice";
import { ServerSlice } from "store/slices/serverSlice";
import { NotificationSlice } from "store/slices/notificationSlice";
import { SecuritySlice } from "store/slices/securitySlice";
import { AlertSlice } from "store/slices/alertSlice";
import { StatusSlice } from "store/slices/statisticsSlice";
import { LoaderSlice } from "store/slices/loaderSlice";
import { VisualMappingSlice } from "store/slices/visualMappingSlice";
import { CodeEditorSlice } from "store/slices/codeEditor";

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
  codeEditorSlice: CodeEditorSlice;
};
