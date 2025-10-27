import { createWithEqualityFn } from "zustand/traditional";
import { RFState } from "shared/types/rfState";
import modalWindowsSlice from "./slices/sharedSlices/modalWindowsSlice";
import flowSlice from "./slices/designerSlices/flowSlice";
import designerVisualElementsSlice from "./slices/designerSlices/designerVisualElementsSlice";
import serverSlice from "./slices/serverSlices/serverSlice";
import notificationSlice from "./slices/serverSlices/notificationSlice";
import securitySlice from "./slices/serverSlices/securitySlice";
import alertSlice from "./slices/sharedSlices/alertSlice";
import statisticsSlice from "./slices/serverSlices/statisticsSlice";
import loaderSlice from "./slices/sharedSlices/loaderSlice";
import visualMappingSlice from "./slices/visualMappingSlices/visualMappingSlice";
import codeEditorSlice from "./slices/sharedSlices/codeEditor";
import tooltipSlice from "./slices/sharedSlices/tooltipSlice";

const useStore = createWithEqualityFn<RFState>((set, get) => ({
  flowSlice: flowSlice(get, set),
  modalWindowsSlice: modalWindowsSlice(get, set),
  designerVisualElementsSlice: designerVisualElementsSlice(get, set),
  serverSlice: serverSlice(get, set),
  notificationSlice: notificationSlice(get, set),
  securitySlice: securitySlice(get, set),
  alertSlice: alertSlice(get, set),
  statisticsSlice: statisticsSlice(get, set),
  loaderSlice: loaderSlice(get, set),
  visualMappingSlice: visualMappingSlice(get, set),
  codeEditorSlice: codeEditorSlice(get, set),
  tooltipSlice: tooltipSlice(get, set),
}));

export default useStore;
