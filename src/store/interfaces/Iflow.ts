import { BlockData } from "./IBlock";
import { Node } from "reactflow";
import ConnectionsEdge from "./IConnectionsEdges";

export interface FlowStructure{
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
}

export interface FlowData {
    created: string;
    createdBy: string;
    flowIdentifier: string;
    flowName: string;
    flowVersion: string;
    isEnabled: boolean;
    lastAmended: string;
    lastAmendedBy: string;
    startBlock: string;
    substitutions: Array<Substitutions>; // Replace 'any' with the appropriate type
    blockData: Array<BlockData>;
    visual: {
        blocks: any;
        edges: any;
    };
}

export interface FlowConfig {
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

  export interface LoadedFlow {
    flowId: string;
    draftId: string;
    flowName: string;
    createdBy: string;
    createdOn: string;
    flowVersion:string;
  }
  

export interface Visual {
    id: string;
    data: { color: string, icon: string };
    position: { x: number, y: number };
}

export interface Substitutions {
    subKey: string;
    subConfigs: Array<SubConfigs>
}

export interface SubConfigs {
    configName: string;
    configValue: string
}

