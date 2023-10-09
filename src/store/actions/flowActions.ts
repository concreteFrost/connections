import { flow } from "../../testFlow/testFlow2"
import { RFState } from "../types/rfState";
import { IBlockData, IBlockParameters } from "../interfaces/IBlock";
import { IVisual } from "../interfaces/Ivisual";

export const createFlow = (get: any, set: any) => () => {

}

export const loadFlow = (get: any, set: any) => () => {
    const data = flow;

    set((state: RFState) => ({
        flow: {
            ...state.flow,
            created: data.connectionsFlow.created,
            createdBy: data.connectionsFlow.createdBy,
            flowConfig: data.connectionsFlow.flowConfig,
            flowIdentifier: data.connectionsFlow.flowIdentifier,
            flowVersion: data.connectionsFlow.flowVersion,
            flowName: data.connectionsFlow.flowName,
            isEnabled: data.connectionsFlow.isEnabled,
            lastAmended: data.connectionsFlow.lastAmended,
            lastAmendedBy: data.connectionsFlow.lastAmendedBy,
            startBlock: data.connectionsFlow.startBlock,
            serverIdentifier: data.connectionsFlow.serverIdentifier,
            blockData: data.connectionsFlow.blockData.map((b: IBlockData) => {
                return {
                    name: b.name,
                    blockIdentifier: b.blockIdentifier,
                    blockVersion: b.blockVersion,
                    blockLabel: b.blockLabel,
                    blockType: b.blockType,
                    description: b.description,
                    typeName: b.typeName,
                    baseTypeName: b.baseTypeName,
                    parameters: b.parameters.map((p: IBlockParameters) => {
                        return {
                            name: p.name,
                            value: p.value,
                            required: p.required,
                            format: p.format
                        }
                    })
                }
            })
            ,
            visual: {
                ...state.flow.visual, blocks: data.connectionsFlow.visual.blocks.map((b: IVisual) => {
                    return {
                        id: b.id,
                        type: 'pointer',
                        data: b.data,
                        position: b.position
                    }
                }),
                edges: data.connectionsFlow.visual.edges.map((e: any) => {
                    return {
                        id: e.id,
                        source: e.source,
                        target: e.target,
                        type: "step"
                    }
                }),
            },
            substitutions: data.connectionsFlow.substitutions.map((sub: any) => {
                return {
                    subKey: sub.SubKey,
                    subConfigs: sub.SubConfigs.map((config: any) => {
                        return {
                            configName: config.configName,
                            configValue: config.configValue
                        }
                    })
                }
            })


        }
    }))

}

export const saveFlow = (get: any, set: any) => () => {

}

export const setFlowName = (get: any, set: any) => (name: string) => {
    set((state: RFState) => ({
        flow: {
            ...state.flow,
            flowName: name
        }
    }))
}

export const setFlowVersion = (get: any, set: any) => (version: string) => {
    set((state: RFState) => ({
        flow: {
            ...state.flow,
            flowVersion: version
        }
    }))
}

export const setFlowIsEnabled = (get:any, set:any)=>()=>{
    set((state:RFState)=>({
        flow:{
            ...state.flow,
            isEnabled: state.flow.isEnabled === "true" ? "false" : "true"
        }
    }))

    console.log(get().flow)

}