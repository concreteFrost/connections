import { flow } from "../../testFlow/testFlow2"
import { RFState } from "../types/rfState";
import { IBlockData, IBlockParameters } from "../interfaces/IBlock";
import { IVisual } from "../interfaces/Ivisual";
import { Edge } from "react-flow-renderer";
import { saveFlowApi, getFlowListApi, getFlowApi } from "../../api/flow";

function setFlow(data: any, set: any) {
    set((state: RFState) => ({
        flow: {
            ...state.flow,
            created: data.created,
            createdBy: data.createdBy,
            flowConfig: data.flowConfig,
            flowIdentifier: data.flowIdentifier,
            flowVersion: data.flowVersion,
            flowName: data.flowName,
            isEnabled: data.isEnabled,
            lastAmended: data.lastAmended,
            lastAmendedBy: data.lastAmendedBy,
            startBlock: data.startBlock,
            serverIdentifier: data.serverIdentifier,
            blockData: data.blockData.map((b: IBlockData) => {
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
                ...state.flow.visual, blocks: data.visual.blocks.map((b: IVisual) => {
                    return {
                        id: b.id,
                        type: 'pointer',
                        data: b.data,
                        position: b.position
                    }
                }),
                edges: data.visual.edges.map((e: Edge) => {
                    return {
                        id: e.id,
                        source: e.source,
                        target: e.target,
                        type: "step"
                    }
                }),
            },
            substitutions: data.substitutions.map((sub: any) => {
                return {
                    subKey: sub.subKey,
                    subConfigs: sub.subConfigs.map((config: any) => {
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


export const createFlow = (get: any, set: any) => () => {

}

export const openTestFlow = (get: any, set: any) => () => {
    setFlow(flow, set);
};


export const loadFlow = (get: any, set: any) => (id: string) => {

    getFlowApi(id).then((res: any) => {
        setFlow(res.data.flowData, set);
    })

};


export const saveFlow = (get: any, set: any) => () => {
    const flow = get().flow;
    const convertedData = {
        flowName: flow.flowName,
        flowIdentifier: flow.flowIdentifier,
        flowVersion: flow.flowVersion,
        startBlock: flow.blockData.length > 0 ? flow.blockData[0].blockIdentifier : 'null',
        createdBy: flow.createdBy,
        created: flow.created,
        lastAmended: flow.lastAmended,
        lastAmendedBy: flow.lastAmendedBy,
        blockData: flow.blockData,
        visual: flow.visual,
        substitutions: flow.substitutions
    }

    saveFlowApi(convertedData).then((res) => {
        console.log(res)
    }).catch((e) => console.log(e))
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

export const setFlowIsEnabled = (get: any, set: any) => () => {
    set((state: RFState) => ({
        flow: {
            ...state.flow,
            isEnabled: state.flow.isEnabled === "true" ? "false" : "true"
        }
    }))

    console.log(get().flow)

}