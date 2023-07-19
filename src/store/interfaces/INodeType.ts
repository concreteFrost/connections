export default interface INodeType {
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

    };
}