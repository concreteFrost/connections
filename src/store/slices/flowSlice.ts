import { RFState } from "../types/rfState";
import { create } from "zustand";
import { Node, Edge } from "react-flow-renderer";
import { ISubstitutions } from "../interfaces/ISubstitutions";
import { initializeFlow } from "../actions/utils/flowUtils";
import initialNodes from "../nodes"
import initialEdges from "../edges";
import actions from "../actions/combinedActions";

export type FlowSlice = {
    flow: {
        blockData: [];
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
        }
    }

    //Base Actions 

    setBlockName: (text: string) => void;
    setBlockColor: (color: string) => void;
    setBlockDescription: (description: string) => void;

    //Block Actions
    getBlockProperties: () => void;
    setStringParameter: (parameterName: string, value: string) => void;
    setIntegerParameter: (parameterName: string, value: number) => void;
    setFloatParameter: (parameterName: string, value: number) => void;
    setBooleanParameter: (parameterName: string, value: boolean) => void;
    setBooleanYNParameter: (parameterName: string, value: string) => void;
    setDateTimeParameter: (parameterName: string, value: Date) => void;
    setExecutionParameter: (parameterName: string, value: string) => void;
    setBigIntParameter: (parameterName: string, value: BigInt) => void;
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
    openFlow: () => void;
    saveFlow: () => void;
    updateFlow: (match: any) => void;
    loadFlow: (id: string) => void;
    setFlowName: (name: string) => void;
    setFlowVersion: (version: string) => void;
    setFlowIsEnabled: () => void;
    createFlow: () => void;

    //Substitutions Actions
    addSubstitutionKey: (key: string) => void;
    addConfig: (key: string, configName: string, configValue: string) => void;
    deleteSubstitution: (key: string) => void;
}


const flowSlice = (get: () => RFState, set: any): FlowSlice => ({
    flow: initializeFlow(initialNodes, initialEdges),

    //Base Actions 
    setBlockName: actions.baseActtions.setBlockName(set, get),
    setBlockDescription: actions.baseActtions.setBlockDescription(set, get),
    setBlockColor: actions.baseActtions.setBlockColor(set, get),

    //Block Actions
    getBlockProperties: actions.blockActions.getBlockProperties(get, set),
    setStringParameter: actions.blockActions.setStringParameter(get, set),
    setIntegerParameter: actions.blockActions.setIntegerParameter(get, set),
    setFloatParameter: actions.blockActions.setFloatParameter(get, set),
    setBooleanParameter: actions.blockActions.setBooleanParameter(get, set),
    setBooleanYNParameter: actions.blockActions.setBooleanYNParameter(get, set),
    setDateTimeParameter: actions.blockActions.setDateTimeParameter(get, set),
    setExecutionParameter: actions.blockActions.setExecutionParameter(get, set),
    setBigIntParameter: actions.blockActions.setBigIntParameter(get, set),
    addCustomParameter: actions.blockActions.addCustomParameter(get, set),
    setSelectedExtendedParameter: actions.blockActions.setSelectedExtendedParameter(get, set),
    deleteExtendedParameter: actions.blockActions.deleteExtendedParameter(get, set),

    //Group Actions
    addBlockGroup: actions.groupActions.addGroup(get, set),
    showGroupModal: actions.groupActions.showGroupModal(set),
    setGroupColor: actions.groupActions.setGroupColor(set),
    setGroupLabel: actions.groupActions.setGroupLabel(set),
    hideAllGroupModals: actions.groupActions.hideAllGroupModals(set),
    deleteGroupOnButtonClick: actions.groupActions.deleteGroupOnButtonClick(get, set),

    //Flow Actions
    createFlow: actions.flowActions.createFlow(get, set),
    openFlow: actions.flowActions.openTestFlow(get, set),
    saveFlow: actions.flowActions.saveFlow(get, set),
    updateFlow: actions.flowActions.updateFlow(get, set),
    loadFlow: actions.flowActions.loadFlow(get, set),
    setFlowName: actions.flowActions.setFlowName(get, set),
    setFlowVersion: actions.flowActions.setFlowVersion(get, set),
    setFlowIsEnabled: actions.flowActions.setFlowIsEnabled(get, set),

    //Substitution Actions
    addSubstitutionKey: actions.substitutionsActions.addSubstitutionKey(get, set),
    addConfig: actions.substitutionsActions.addConfig(get, set),
    deleteSubstitution: actions.substitutionsActions.deleteSubstitution(get, set),
})

export default flowSlice;