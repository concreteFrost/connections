import { ISubstitutions } from "./ISubstitutions";

export  interface IFlowData {
    created: string;
    createdBy: string;
    flowIdentifier: string;
    flowName: string;
    isEnabled: boolean;
    lastAmended: string;
    lastAmendedBy: string;
    startBlock: string;
    substitutions: Array<ISubstitutions>; // Replace 'any' with the appropriate type
    blockData: {
        block: any;
    };
    visual: {
        blocks: any;
        edges: any;
    };
}



