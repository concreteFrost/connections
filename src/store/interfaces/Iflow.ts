import { IBlockData } from "./IBlock";
import { ISubstitutions } from "./ISubstitutions";

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



