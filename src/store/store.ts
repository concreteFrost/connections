import { createWithEqualityFn } from "zustand/traditional";
import { RFState } from "./types/rfState";
import topPanelSlice from "./slices/topPanelSlice";
import modalWindowsSlice from "./slices/modalWindowsSlice";
import flowSlice from "./slices/flowSlice";
import designerVisualElementsSlice from "./slices/designerVisualElementsSlice";
import serverSlice from "./slices/serverSlice";
import edgeActions from "./actions/edgesActions";
import nodeActions from "./actions/nodeActions";
import leftPanelActions from "./actions/leftPanelActions";
import notificationSlice from "./slices/notificationSlice";
import securitySlice from "./slices/securitySlice";
import alertSlice from "./slices/alertSlice";
import userSlice from "./slices/userSlice";

const useStore = createWithEqualityFn<RFState>((set, get) => ({

  blockList: [],
  flowSlice: flowSlice(get, set),
  topPanelSlice: topPanelSlice(get, set),
  modalWindowsSlice: modalWindowsSlice(get, set),
  designerVisualElementsSlice: designerVisualElementsSlice(get, set),
  serverSlice: serverSlice(get, set),
  notificationSlice: notificationSlice(get, set),
  securitySlice: securitySlice(get, set),
  alertSlice:alertSlice(get,set),
  userSlice:userSlice(get,set),
  //Value Editor Actions
  //Node Actions
  getBlocksList: leftPanelActions.getBlocksList(set),
  addBlock: leftPanelActions.addBlock(get, set),
  onBlocksChange: nodeActions.onBlocksChange(get, set),

  //Edge Actions
  onEdgesChange: edgeActions.onEdgesChange(get, set),
  // onEdgeRemove: edgeActions.onEdgeRemove(get,set),
  onConnect: edgeActions.onEdgesConnect(get, set),
}))

export default useStore;
