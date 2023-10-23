import { RFState } from "../../types/rfState";
import { IBlockData } from "../../interfaces/IBlock";
import { IBlockParameters } from "../../interfaces/IBlock";
import { IVisual } from "../../interfaces/Ivisual";
import { Edge } from "react-flow-renderer";
import { getFlowListApi } from "../../../api/flow";

export function setFlow(data: any, set: any) {
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
                            format: p.format,
                        };
                    }),
                };
            }),
            visual: {
                ...state.flow.visual,
                blocks: data.visual.blocks.map((b: IVisual) => {
                    return {
                        id: b.id,
                        type: "pointer",
                        data: b.data,
                        position: b.position,
                    };
                }),
                edges: data.visual.edges.map((e: Edge) => {
                    return {
                        id: e.id,
                        source: e.source,
                        target: e.target,
                        type: "step",
                    };
                }),
            },
            substitutions: data.substitutions.map((sub: any) => {
                return {
                    subKey: sub.subKey,
                    subConfigs: sub.subConfigs.map((config: any) => {
                        return {
                            configName: config.configName,
                            configValue: config.configValue,
                        };
                    }),
                };
            }),
        },
    }));
}

export function parseFloatVersion(flowVersion: number) {
    let flowToInt = flowVersion.toString();
    let result = '';
    for (let ch of flowToInt) {
        result += ch + '.'
    }
    return result.slice(0, result.length - 1);
}

export function flowVersionToInt(flowVersion: string) {
    return parseInt(flowVersion.replace(/\./g, ''));
}

export function checkExistingFlowInDataBase(flowName: string) {
    return new Promise((resolve, reject) => {
        getFlowListApi().then((res: any) => {
            const match = res.data.find((flow: any) => flow.name === flowName);
            resolve(match); // Resolve the Promise with a boolean value
        }).catch((error: any) => {
            reject(error); // Reject the Promise in case of an error
        });
    });
}

export function compareFlowVersions(version: string) {

}

