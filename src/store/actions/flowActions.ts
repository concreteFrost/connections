import {flow} from "../../testFlow/testFlow2"
import { RFState } from "../types/rfState";
import { IBlockData,IBlockParameters } from "../interfaces/IBlock";
import {IVisual} from "../interfaces/IVisual";

export const createFlow = (get: any, set: any) => () => {

}

export const loadFlow = (get: any, set: any) => () => {
    const data = flow;

    set((state: RFState) => ({
        flow: {
            ...state.flow,
            created: data.ConnectionsFlow.Created,
            createdBy: data.ConnectionsFlow.CreatedBy,
            flowConfig: data.ConnectionsFlow.FlowConfig,
            flowIdentifier: data.ConnectionsFlow.FlowIdentifier,
            flowVersion: data.ConnectionsFlow.FlowVersion,
            flowName: data.ConnectionsFlow.FlowName,
            isEnabled: data.ConnectionsFlow.IsEnabled,
            lastAmended: data.ConnectionsFlow.LastAmended,
            lastAmendedBy: data.ConnectionsFlow.LastAmendedBy,
            startBlock: data.ConnectionsFlow.StartBlock,
            serverIdentifier: data.ConnectionsFlow.ServerIdentifier,
            blockData: data.ConnectionsFlow.BlockData.map((b: IBlockData) => {
                return {
                    name: b.Name,
                    blockIdentifier: b.BlockIdentifier,
                    blockVersion: b.BlockVersion,
                    blockLabel: b.BlockLabel,
                    blockType: b.BlockType,
                    description: b.Description,
                    typeName: b.TypeName,
                    baseTypeName: b.BaseTypeName,
                    parameters: b.Parameters.map((p: IBlockParameters) => {
                        return {
                            name: p.Name,
                            value: p.Value,
                            required: p.Required,
                            format: p.Format
                        }
                    })
                }
            })
            ,
            visual: {
                ...state.flow.visual, blocks: data.ConnectionsFlow.Visual.Blocks.map((b: IVisual) => {
                    return {
                        id: b.id,
                        type: 'pointer',
                        data: b.data,
                        position: b.position
                    }
                }),
                edges: data.ConnectionsFlow.Visual.Edges.map((e: any) => {
                    return {
                        id: e.id,
                        source: e.source,
                        target: e.target,
                        type: "step"
                    }
                }),
            },
            substitutions: data.ConnectionsFlow.Substitutions.map((sub : any)=>{
                return{
                    subKey: sub.SubKey,
                    subConfigs:sub.SubConfigs.map((config : any)=>{
                        return{
                            configName : config.ConfigName,
                            configValue: config.ConfigValue 
                        }
                    })
                }
            })  


        }
    }))

}

export const saveFlow = (get: any, set: any) => () => {

}

export const setFlowName = (get:any, set:any)=>(name : string)=>{
    set((state:RFState)=>({
        flow:{
            ...state.flow,
            flowName: name
        }
    }))
}

export const setFlowVersion = (get:any, set:any)=>(version : string)=>{
    set((state:RFState)=>({
        flow:{
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