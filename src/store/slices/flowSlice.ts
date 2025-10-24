import { RFState } from "shared/types/rfState";
import { Node } from "react-flow-renderer";
import initialNodes from "store/nodes";
import initialEdges from "store/edges";
import { initializeFlow } from "utils/flowUtils";
import flowActions from "store/actions/designerActions/flowActions";
import blockActions from "store/actions/designerActions/blockActions";
import groupActions from "store/actions/designerActions/groupActions";
import edgeActions from "store/actions/designerActions/edgesActions";
import substitutionsActions from "store/actions/designerActions/substitutionsActions";
import blockParametersActions from "store/actions/designerActions/blockParametersActions";
import { FlowStructure } from "interfaces/Iflow";
import { Directive } from "interfaces/IAlerts";
import { IEdgeDraggable } from "components/Designer/RightPanel/EdgesEditor/EdgesEditor";
import { NodeType } from "interfaces/INode";
import nodeActions from "store/actions/designerActions/nodeActions";
import { Connection, EdgeChange } from "reactflow";
import tabsActions from "store/actions/designerActions/tabsActions";

export type FlowSlice = {
  blockList: NodeType[];
  allFlows: FlowStructure[];
  flow: FlowStructure;
  draft: {
    draftId: string | null;
    canApprove: boolean;
  };

  //directives
  directivesList: Directive[];

  reactFlowInstance: any;
  reactFlowWrapper: any;

  //tabs acttions
  addFlowToTabs: (flow: FlowStructure) => void;
  setFlowNameInTabs: (value: string) => void;
  takeFlowSnapshot: (flowId: FlowStructure) => void;
  getFlowFromSnapshot: (flow: FlowStructure) => void;
  clearFlowTabs: () => void;
  removeFromTab: (flowId: string) => void;

  //Base Actions
  setBlockName: (text: string) => void;
  setBlockColor: (color: string) => void;
  setBlockDescription: (description: string) => void;

  //Block Actions
  addBlock: (type: NodeType, posX: number, posY: number) => void;
  createBlockCopy: (posX: number, posy: number) => void;
  deleteBlock: () => void;
  resetSelectedBlocks: () => void;
  getBlockList: (data: any) => void;
  onBlockChange: (blocks: Node<any>[]) => void;
  // getBlockProperties: () => void;
  setDirective: (directive: string) => void;
  setParameterValue: (
    propertyName: string,
    value: any,
    options?: string
  ) => void;
  //Multiple Selected Blocks Actions
  setSelectedBlocksColors: (color: string) => void;
  allignSelectedBlocks: (allignment: "x" | "y") => void;
  deleteMultupleBlocks: () => void;

  //Extended Params Actions
  addCustomParameter: (name: string, value: string) => boolean | undefined;
  setSelectedExtendedParameter: (parameterName: string, value: string) => void;
  deleteExtendedParameter: (parameterName: string) => void;

  //Group Actions
  addBlockGroup: () => void;
  showGroupModal: (nodeId: string, modalToShow: string) => void;
  setGroupLabel: (nodeId: string, input: string) => void;
  setGroupColor: (nodeId: string, input: string) => void;
  hideAllGroupModals: () => void;
  deleteGroupOnButtonClick: (groupToDelete: any) => void;

  //Flow Actions
  saveDraftFlow: (match: any, subfolder: string) => Promise<boolean>;
  loadFlowFromDraft: (draftId: string) => void;
  setFlowName: (name: string) => void;
  setFlowVersion: (version: string) => void;
  setFlowIsEnabled: () => void;
  createFlow: (flowId?: string) => FlowStructure;
  closeFlow: () => void;
  createFlowFromTemplate: (flowConfiguration: any) => void;
  createUpdateDraftFromLiveTemplate: (flowConfiguration: any) => void;
  setInstance: (instance: any) => void;
  setFlowWrapper: (wrapper: any) => void;

  //Substitutions Actions
  addSubstitutionKey: (key: string) => void;
  addConfig: (key: string, configName: string, configValue: string) => void;
  deleteSubstitution: (key: string) => void;

  //Edges Actions
  onEdgesConnect: (connection: Connection) => void;
  onChange: (changes: EdgeChange[]) => void;
  deleteEdge: (edgeId: string) => void;
  reorderEdgesPriority: (draggableList: Array<IEdgeDraggable>) => void;
};

const flowSlice = (get: () => RFState, set: any): FlowSlice => ({
  blockList: [],
  allFlows: [],
  flow: initializeFlow(initialNodes, initialEdges),

  draft: {
    draftId: null,
    canApprove: false,
  },

  directivesList: [],

  reactFlowInstance: null,
  reactFlowWrapper: null,

  //#region Tabs Actions
  addFlowToTabs: tabsActions(get, set).addFlowToTabs,
  setFlowNameInTabs: tabsActions(get, set).setFlowNameInTabs,
  takeFlowSnapshot: tabsActions(get, set).takeFlowSnapshot,
  getFlowFromSnapshot: tabsActions(get, set).getFlowFromSnapshot,
  clearFlowTabs: tabsActions(get, set).clearFlowTabs,
  removeFromTab: tabsActions(get, set).removeFromTab,
  //#endregion

  //#region Block Actions
  addBlock: blockActions(get, set).addBlock,
  createBlockCopy: blockActions(get, set).createBlockCopy,
  deleteBlock: blockActions(get, set).deleteBlock,
  getBlockList: blockActions(get, set).getBlocksList,
  resetSelectedBlocks: blockActions(get, set).resetSelectedBlocks,
  setDirective: blockActions(get, set).setDirective,

  setParameterValue: blockParametersActions(get, set).setParameterValue,
  addCustomParameter: blockParametersActions(get, set).addCustomParameter,
  setSelectedExtendedParameter: blockParametersActions(get, set)
    .setSelectedExtendedParameter,
  deleteExtendedParameter: blockParametersActions(get, set)
    .deleteExtendedParameter,
  onBlockChange: nodeActions.onBlocksChange(get, set),

  setBlockName: blockActions(get, set).setBlockName,
  setBlockDescription: blockActions(get, set).setBlockDescription,
  setBlockColor: blockActions(get, set).setBlockColor,
  //#endregion

  //#region Group Actions
  addBlockGroup: groupActions(get, set).addGroup,
  showGroupModal: groupActions(get, set).showGroupModal,
  setGroupColor: groupActions(get, set).changeGroupColor,
  setGroupLabel: groupActions(get, set).changeGroupLabel,
  hideAllGroupModals: groupActions(get, set).hideAllGroupModals,
  deleteGroupOnButtonClick: groupActions(get, set).deleteGroupOnButtonClick,
  setSelectedBlocksColors: groupActions(get, set).setSelectedBlocksColors,
  allignSelectedBlocks: groupActions(get, set).allignSelectedBlocks,
  deleteMultupleBlocks: groupActions(get, set).deleteMultipleBlocks,
  //#endregion

  //#region Edges Actions
  deleteEdge: edgeActions(get, set).deleteEdge,
  reorderEdgesPriority: edgeActions(get, set).reorderEdgesPriority,
  onEdgesConnect: edgeActions(get, set).onEdgesConnect,
  onChange: edgeActions(get, set).onEdgesChange,
  //#endregion

  //#region Flow actions
  createFlow: flowActions(get, set).createFlow,
  createFlowFromTemplate: flowActions(get, set).createFlowFromTemplate,
  createUpdateDraftFromLiveTemplate: flowActions(get, set)
    .createUpdateDraftFromLiveTemplate,
  closeFlow: flowActions(get, set).closeFlow,
  saveDraftFlow: flowActions(get, set).saveDraftFlow,
  loadFlowFromDraft: flowActions(get, set).loadFlowFromDraft,
  setFlowName: flowActions(get, set).setFlowName,
  setFlowVersion: flowActions(get, set).setFlowVersion,
  setFlowIsEnabled: flowActions(get, set).setFlowIsEnabled,
  // sets instance of the flow on flow init
  setInstance: flowActions(get, set).setInstance,
  // added ref to get correct coordinates
  setFlowWrapper: flowActions(get, set).setFlowWrapper,
  //#endregion

  //#region Substitution Actions
  addSubstitutionKey: substitutionsActions(get, set).addSubstitutionKey,
  addConfig: substitutionsActions(get, set).addConfig,
  deleteSubstitution: substitutionsActions(get, set).deleteSubstitution,
  //#endregion
});

export default flowSlice;
