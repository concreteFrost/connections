import { RFState } from "../types/rfState";
import { Node, Edge } from "react-flow-renderer";
import { ISubstitutions } from "../interfaces/Iflow";
import { initializeFlow } from "../actions/utils/flowUtils";
import initialNodes from "../nodes";
import initialEdges from "../edges";
import flowActions from "../actions/flowActions";
import baseActtions from "../actions/baseActions";
import blockActions from "../actions/blockActions";
import groupActions from "../actions/groupActions";
import substitutionsActions from "../actions/substitutionsActions";
import { INodeType } from "../interfaces/INode";
import blocksWidgetActions from "../actions/blocksWidgetActions";
import { IBlockData } from "../interfaces/IBlock";
import edgeActions from "../actions/edgesActions";
import { IDirective } from "../interfaces/IAlerts";

export type FlowSlice = {
  flow: {
    blockData: Array<IBlockData>;
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
    substitutions: Array<ISubstitutions>;
    visual: {
      blocks: Node<any>[];
      edges: Edge<any>[];
    };
  };

  //directives 
  directivesList: IDirective[],

  //Base Actions
  setBlockName: (text: string) => void;
  setBlockColor: (color: string) => void;
  setBlockDescription: (description: string) => void;

  //Block Actions
  deleteBlock: () => void;
  getBlockProperties: () => void;
  setDirective:(directive:string)=>void;
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
  deleteMultupleBlocks:()=>void;

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
  deleteDraftFlow: (draftId: string) => void;

  loadFlowFromDraft: (draftId: string) => void;
  setFlowName: (name: string) => void;
  setFlowVersion: (version: string) => void;
  setFlowIsEnabled: () => void;
  createFlow: (flowId?: string) => void;
  closeFlow: () => void;
  createFlowFromTemplate: (liveFlowID: string, newDraftName: string) => void;
  createUpdateDraftFromLiveTemplate: (id: string) => void;

  //Substitutions Actions
  addSubstitutionKey: (key: string) => void;
  addConfig: (key: string, configName: string, configValue: string) => void;
  deleteSubstitution: (key: string) => void;

  //Edges Actions
  deleteEdge:(edgeId:string)=>void;


};

const flowSlice = (get: () => RFState, set: any): FlowSlice => ({
  flow: initializeFlow(initialNodes, initialEdges),
  directivesList:[],

  //Base Actions
  setBlockName: baseActtions.setBlockName(set, get),
  setBlockDescription: baseActtions.setBlockDescription(set, get),
  setBlockColor: baseActtions.setBlockColor(set, get),
  getBlockProperties: baseActtions.getBlockProperties(get, set),

  //Block Actions
  deleteBlock: blockActions.deleteBlock(get, set),
  setDirective:blockActions.setDirective(get,set),
  setStringParameter: blockActions.setStringParameter(get, set),
  setIntegerParameter: blockActions.setIntegerParameter(get, set),
  setFloatParameter: blockActions.setFloatParameter(get, set),
  setBooleanParameter: blockActions.setBooleanParameter(get, set),
  setBooleanYNParameter: blockActions.setBooleanYNParameter(get, set),
  setDateTimeParameter: blockActions.setDateTimeParameter(get, set),
  setExecutionParameter: blockActions.setExecutionParameter(get, set),
  setBigIntParameter: blockActions.setBigIntParameter(get, set),
  addCustomParameter: blockActions.addCustomParameter(get, set),
  setSelectedExtendedParameter: blockActions.setSelectedExtendedParameter(
    get,
    set
  ),
  deleteExtendedParameter: blockActions.deleteExtendedParameter(get, set),

  //Group Actions
  addBlockGroup: groupActions.addGroup(get, set),
  showGroupModal: groupActions.showGroupModal(set),
  setGroupColor: groupActions.setGroupColor(set),
  setGroupLabel: groupActions.setGroupLabel(set),
  hideAllGroupModals: groupActions.hideAllGroupModals(set),
  deleteGroupOnButtonClick: groupActions.deleteGroupOnButtonClick(get, set),

  //Edges Actions
  deleteEdge:edgeActions.deleteEdge(get,set),

  //Flow Actions
  createFlow: flowActions.createFlow(get, set),
  createFlowFromTemplate: flowActions.createFlowFromTemplate(get, set),
  createUpdateDraftFromLiveTemplate:
    flowActions.createUpdateDraftFromLiveTemplate(get, set),
  closeFlow: flowActions.closeFlow(get, set),

  saveDraftFlow: flowActions.saveDraftFlow(get, set),
  deleteDraftFlow: flowActions.deleteDraftFlow(get, set),
  loadFlowFromDraft: flowActions.loadFlowFromDraft(get, set),
  setFlowName: flowActions.setFlowName(get, set),
  setFlowVersion: flowActions.setFlowVersion(get, set),
  setFlowIsEnabled: flowActions.setFlowIsEnabled(get, set),

  //Substitution Actions
  addSubstitutionKey: substitutionsActions.addSubstitutionKey(get, set),
  addConfig: substitutionsActions.addConfig(get, set),
  deleteSubstitution: substitutionsActions.deleteSubstitution(get, set),

  //Multple Selected Blocks Actions
  setSelectedBlocksColors:blocksWidgetActions.setSelectedBlocksColors(get,set),
  allignSelectedBlocks:blocksWidgetActions.allignSelectedBlocks(get,set),
  deleteMultupleBlocks:blocksWidgetActions.deleteMultipleBlocks(get,set)

  
});

export default flowSlice;
