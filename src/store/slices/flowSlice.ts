import { RFState } from "../types/rfState";
import { Node } from "react-flow-renderer";
import initialNodes from "../nodes";
import initialEdges from "../edges";
import { initializeFlow } from "store/actions/utils/flowUtils";
import flowActions from "store/actions/designerActions/flowActions";
import blockActions from "store/actions/designerActions/blockActions";
import groupActions from "store/actions/designerActions/groupActions";
import edgeActions from "store/actions/designerActions/edgesActions";
import substitutionsActions from "store/actions/designerActions/substitutionsActions";
import blocksWidgetActions from "store/actions/designerActions/blocksWidgetActions";
import blockParametersActions from "store/actions/designerActions/blockParametersActions";
import { Substitutions } from "interfaces/Iflow";
import { BlockData } from "interfaces/IBlock";
import { Directive } from "interfaces/IAlerts";
import { IEdgeDraggable } from "components/Designer/RightPanel/EdgesEditor/EdgesEditor";
import { NodeType } from "interfaces/INode";
import ConnectionsEdge from "interfaces/IConnectionsEdges";
import leftPanelActions from "store/actions/designerActions/leftPanelActions";
import nodeActions from "store/actions/designerActions/nodeActions";
import { Connection,EdgeChange } from "reactflow";

export type FlowSlice = {
  blockList: NodeType[];
  flow: {
    blockData: Array<BlockData>;
    created: Date;
    createdBy: string;
    flowIdentifier: string;
    flowName: string;
    flowVersion: string;
    flowConfig: string;
    isEnabled: string;
    lastAmended: Date;
    lastAmendedBy: string;
    serverIdentifier: string;
    startBlock: string;
    substitutions: Array<Substitutions>;
    visual: {
      blocks: Node<any>[];
      //NEED TO CHANGE TYPE BACK TO EDGE
      // edges: Edge<any>[];
      edges: Array<ConnectionsEdge>;
    };
  };

  draft: {
    draftId: string | null;
    canApprove: boolean;
  };

  //directives
  directivesList: Directive[];

  //Base Actions
  setBlockName: (text: string) => void;
  setBlockColor: (color: string) => void;
  setBlockDescription: (description: string) => void;

  //Block Actions
  addBlock: (type: NodeType, posX: number, posY: number) => void;
  createBlockCopy: (posX: number, posy: number) => void;
  deleteBlock: () => void;
  resetSelectedBlocks: () => void;
  getBlockList: (data:any)=>void;
  onBlockChange:(blocks: Node<any>[])=>void;
  // getBlockProperties: () => void;
  setDirective: (directive: string) => void;
  setStringParameter: (parameterName: string, value: string) => void;
  setIntegerParameter: (parameterName: string, value: number) => void;
  setFloatParameter: (parameterName: string, value: number) => void;
  setBooleanParameter: (parameterName: string, value: boolean) => void;
  setBooleanYNParameter: (parameterName: string, value: string) => void;
  setDateTimeParameter: (parameterName: string, value: Date) => void;
  setExecutionParameter: (parameterName: string, value: string) => void;
  setBigIntParameter: (parameterName: string, value: BigInt) => void;

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
  createFlow: (flowId?: string) => void;
  closeFlow: () => void;
  createFlowFromTemplate: (liveFlowID: string, newDraftName: string) => void;
  createUpdateDraftFromLiveTemplate: (id: string) => void;

  //Draft Actions
  setCanApprove: (canApprove: boolean) => void;

  //Substitutions Actions
  addSubstitutionKey: (key: string) => void;
  addConfig: (key: string, configName: string, configValue: string) => void;
  deleteSubstitution: (key: string) => void;

  //Edges Actions
  onEdgesConnect:(connection: Connection)=>void;
  onChange:(changes: EdgeChange[])=>void;
  deleteEdge: (edgeId: string) => void;
  reorderEdgesPriority: (draggableList: Array<IEdgeDraggable>) => void;
};

const flowSlice = (get: () => RFState, set: any): FlowSlice => ({
  blockList: [],
  flow: initializeFlow(initialNodes, initialEdges),

  draft: {
    draftId: null,
    canApprove: false,
  },

  directivesList: [],

  //Base Actions
  setBlockName: blockActions.setBlockName(get, set),
  setBlockDescription: blockActions.setBlockDescription(get, set),
  setBlockColor: blockActions.setBlockColor(get, set),
  // getBlockProperties: baseActtions.getBlockProperties(get, set),

  //Block Actions
  addBlock: blockActions.addBlock(get, set),
  createBlockCopy: blockActions.createBlockCopy(get, set),
  deleteBlock: blockActions.deleteBlock(get, set),
  getBlockList: leftPanelActions.getBlocksList(set),
  resetSelectedBlocks: blockActions.resetSelectedBlocks(get, set),
  setDirective: blockActions.setDirective(get, set),
  setStringParameter: blockParametersActions.setStringParameter(get, set),
  setIntegerParameter: blockParametersActions.setIntegerParameter(get, set),
  setFloatParameter: blockParametersActions.setFloatParameter(get, set),
  setBooleanParameter: blockParametersActions.setBooleanParameter(get, set),
  setBooleanYNParameter: blockParametersActions.setBooleanYNParameter(get, set),
  setDateTimeParameter: blockParametersActions.setDateTimeParameter(get, set),
  setExecutionParameter: blockParametersActions.setExecutionParameter(get, set),
  setBigIntParameter: blockParametersActions.setBigIntParameter(get, set),
  addCustomParameter: blockParametersActions.addCustomParameter(get, set),
  setSelectedExtendedParameter:
    blockParametersActions.setSelectedExtendedParameter(get, set),
  deleteExtendedParameter: blockParametersActions.deleteExtendedParameter(
    get,
    set
  ),
  onBlockChange:nodeActions.onBlocksChange(get,set),

  //Group Actions
  addBlockGroup: groupActions.addGroup(get, set),
  showGroupModal: groupActions.showGroupModal(set),
  setGroupColor: groupActions.setGroupColor(set),
  setGroupLabel: groupActions.setGroupLabel(set),
  hideAllGroupModals: groupActions.hideAllGroupModals(set),
  deleteGroupOnButtonClick: groupActions.deleteGroupOnButtonClick(get, set),

  //Edges Actions
  deleteEdge: edgeActions.deleteEdge(get, set),
  reorderEdgesPriority: edgeActions.reorderEdgesPriority(get, set),
  onEdgesConnect:edgeActions.onEdgesConnect(get,set),
  onChange:edgeActions.onEdgesChange(get,set),

  //Flow Actions
  createFlow: flowActions.createFlow(get, set),
  createFlowFromTemplate: flowActions.createFlowFromTemplate(get, set),
  createUpdateDraftFromLiveTemplate:
    flowActions.createUpdateDraftFromLiveTemplate(get, set),
  closeFlow: flowActions.closeFlow(get, set),

  saveDraftFlow: flowActions.saveDraftFlow(get, set),

  loadFlowFromDraft: flowActions.loadFlowFromDraft(get, set),
  setFlowName: flowActions.setFlowName(get, set),
  setFlowVersion: flowActions.setFlowVersion(get, set),
  setFlowIsEnabled: flowActions.setFlowIsEnabled(get, set),

  //Draft Actions
  setCanApprove: flowActions.setCanApprove(get, set),

  //Substitution Actions
  addSubstitutionKey: substitutionsActions.addSubstitutionKey(get, set),
  addConfig: substitutionsActions.addConfig(get, set),
  deleteSubstitution: substitutionsActions.deleteSubstitution(get, set),

  //Multple Selected Blocks Actions
  setSelectedBlocksColors: blocksWidgetActions.setSelectedBlocksColors(
    get,
    set
  ),
  allignSelectedBlocks: blocksWidgetActions.allignSelectedBlocks(get, set),
  deleteMultupleBlocks: blocksWidgetActions.deleteMultipleBlocks(get, set),
});

export default flowSlice;
