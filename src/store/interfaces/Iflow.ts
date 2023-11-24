import { IBlockData } from "./IBlock";

export interface IFlowData {
    created: string;
    createdBy: string;
    flowIdentifier: string;
    flowName: string;
    flowVersion: string;
    isEnabled: boolean;
    lastAmended: string;
    lastAmendedBy: string;
    startBlock: string;
    substitutions: Array<ISubstitutions>; // Replace 'any' with the appropriate type
    blockData: Array<IBlockData>;
    visual: {
        blocks: any;
        edges: any;
    };
}

export interface IVisual {
    id: string;
    data: { color: string, icon: string };
    position: { x: number, y: number };
}

export interface ISubstitutions {
    subKey: string;
    subConfigs: Array<ISubConfigs>
}

export interface ISubConfigs {
    configName: string;
    configValue: string
}

