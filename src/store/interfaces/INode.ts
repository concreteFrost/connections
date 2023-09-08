
export interface INodeGroup {
    dataGroup: string;
    externalGroup: string;
    functionGroup: string;
    inputGroup: string;
    outputGroup: string;
  }

export  interface INodeType {
    type: string,
    visualData: {
        color: string,
        icon: string
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
        parameters: [];
        //Custom parameters
        color: string;
        icon: any;
        children? : any;

    };
}


  