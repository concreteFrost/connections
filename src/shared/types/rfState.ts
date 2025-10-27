import { ModalWindows } from "store/slices/sharedSlices/modalWindowsSlice";
import { FlowSlice } from "store/slices/designerSlices/flowSlice";
import { DesignerVisualElementsSlice } from "store/slices/designerSlices/designerVisualElementsSlice";
import { ServerSlice } from "store/slices/serverSlices/serverSlice";
import { NotificationSlice } from "store/slices/serverSlices/notificationSlice";
import { SecuritySlice } from "store/slices/serverSlices/securitySlice";
import { AlertSlice } from "store/slices/sharedSlices/alertSlice";
import { StatusSlice } from "store/slices/serverSlices/statisticsSlice";
import { LoaderSlice } from "store/slices/sharedSlices/loaderSlice";
import { VisualMappingSlice } from "store/slices/visualMappingSlices/visualMappingSlice";
import { CodeEditorSlice } from "store/slices/sharedSlices/codeEditor";
import { TooltipSlice } from "store/slices/sharedSlices/tooltipSlice";

export type RFState = {
  flowSlice: FlowSlice;
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
  tooltipSlice: TooltipSlice;
};
