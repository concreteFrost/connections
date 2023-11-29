import { create } from "zustand";
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

const useStore = create<RFState>((set, get) => ({

  blockList: [],
  selectedBlockID: "-1",
  flowSlice: flowSlice(get, set),
  topPanelSlice: topPanelSlice(get, set),
  modalWindowsSlice: modalWindowsSlice(get, set),
  designerVisualElementsSlice: designerVisualElementsSlice(get, set),
  serverSlice: serverSlice(get, set),
  notificationSlice: notificationSlice(get, set),
  //Value Editor Actions


  //Node Actions
  getBlocksList: leftPanelActions.getBlocksList(set),
  addBlock: leftPanelActions.addBlock(get, set),
  setselectedBlockID: nodeActions.setselectedBlockID(get, set),
  onBlocksChange: nodeActions.onBlocksChange(get, set),

  //Edge Actions
  onEdgesChange: edgeActions.onEdgesChange(get, set),
  onConnect: edgeActions.onEdgesConnect(get, set),
}))

export default useStore;
