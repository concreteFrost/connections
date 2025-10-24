import { createWithEqualityFn } from "zustand/traditional";
import { RFState } from "shared/types/rfState";
import topPanelSlice from "./slices/topPanelSlice";
import modalWindowsSlice from "./slices/modalWindowsSlice";
import flowSlice from "./slices/flowSlice";
import designerVisualElementsSlice from "./slices/designerVisualElementsSlice";
import serverSlice from "./slices/serverSlice";
import notificationSlice from "./slices/notificationSlice";
import securitySlice from "./slices/securitySlice";
import alertSlice from "./slices/alertSlice";
import statisticsSlice from "./slices/statisticsSlice";
import loaderSlice from "./slices/loaderSlice";
import visualMappingSlice from "./slices/visualMappingSlice";
import codeEditorSlice from "./slices/codeEditor";

const useStore = createWithEqualityFn<RFState>((set, get) => ({
  flowSlice: flowSlice(get, set),
  topPanelSlice: topPanelSlice(get, set),
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
}));

export default useStore;
