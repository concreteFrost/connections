import { BlockParameters } from "./IBlock";

export interface NodeGroup {
    dataGroup: string;
    externalGroup: string;
    functionGroup: string;
    inputGroup: string;
    outputGroup: string;
  }

export  interface NodeType {
    type: string,
    visualData: {
        color: string,
        icon: string,

    }
    data: {
        //Api parameters
        name: string;
        blockVersion: string;
        blockLabel: string;
        blockType: string;
        description: string;
        typeName: string;
        baseTypeName: string;
        category: string;
        parameters: Array<BlockParameters>;
        extendedParameters:[];
        ehDirective:string;
        //Custom parameters
        // color: string;
        // icon: any;
        // children? : any;

    };
}


  