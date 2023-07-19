import { flow } from "../../testFlow/testFlow2"
import { RFState } from "../types/rfState";
import IBlockParameters from "../interfaces/IblockParameter";
import IBlockData from "../interfaces/IblockData";
import IVisual from "../interfaces/Ivisual";

export const createFlow = (get: any, set: any) => () => {

}

export const loadFlow = (get: any, set: any) => () => {
    const data = flow;

    set((state: RFState) => ({
        flow: {
            ...state.flow,
            created: data.ConnectionsFlow.Created,
            createdBy: data.ConnectionsFlow.CreatedBy,
            flowIdentifier: data.ConnectionsFlow.FlowIdentifier,
            flowName: data.ConnectionsFlow.FlowName,
            isEnabled: data.ConnectionsFlow.IsEnabled,
            lastAmended: data.ConnectionsFlow.LastAmended,
            lastAmendedBy: data.ConnectionsFlow.LastAmendedBy,
            startBlock: data.ConnectionsFlow.StartBlock,
            substitutions: data.ConnectionsFlow.Substitutions,
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
            }

        }
    }))


}

export const saveFlow = (get: any, set: any) => () => {

}