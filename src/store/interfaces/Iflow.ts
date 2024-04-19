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

export interface IFlowConfig {
    config: string;
    createdBy: string;
    dateCreated: string;
    enabled: boolean;
    fileName: string;
    flowId: string;
    lastUpdateBy: string;
    lastUpdated: string | null;
    name: string;
    processBlockCollection: any; // You might want to replace 'any' with the actual type
    startBlock: string;
    status: number;
    version: string;
  }

  export interface ILoadedFlow {
    flowId: string;
    draftId: string;
    flowName: string;
    createdBy: string;
    createdOn: string;
    flowVersion:string;
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

