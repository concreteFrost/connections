import IBlockParameters from "./IblockParameter";

export default interface IBlockData {
    Name: string,
    BlockIdentifier: string,
    BlockVersion: string,
    BlockLabel: string,
    BlockType: string,
    Description: string,
    TypeName: string,
    BaseTypeName: string,
    Parameters: any[]
}