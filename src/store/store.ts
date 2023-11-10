import { create } from "zustand";
import actions from "./actions/combinedActions";
import { RFState } from "./types/rfState";
import topPanelSlice from "./slices/topPanelSlice";
import modalWindowsSlice from "./slices/modalWindowsSlice";
import flowSlice from "./slices/flowSlice";
import designerVisualElementsSlice from "./slices/designerVisualElementsSlice";
import serverSlice from "./slices/serverSlice";

const useStore = create<RFState>((set, get) => ({

  blockList: [],
  selectedBlockID: "-1",
  flowSlice: flowSlice(get, set),
  topPanelSlice: topPanelSlice(get, set),
  modalWindowsSlice: modalWindowsSlice(get, set),
  designerVisualElementsSlice: designerVisualElementsSlice(get, set),
  serverSlice: serverSlice(get, set),
  //Value Editor Actions


  //Node Actions
  getBlocksList: actions.leftPanelActions.getBlocksList(set),
  addBlock: actions.leftPanelActions.addBlock(get, set),
  setselectedBlockID: actions.nodeActions.setselectedBlockID(get, set),
  onBlocksChange: actions.nodeActions.onBlocksChange(get, set),

  //Edge Actions
  onEdgesChange: actions.edgeActions.onEdgesChange(get, set),
  onConnect: actions.edgeActions.onEdgesConnect(get, set),


}))

export default useStore;
