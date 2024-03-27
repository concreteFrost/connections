export interface IBlockData {
  name: any;
  blockIdentifier: string;
  blockVersion: string;
  blockLabel: string;
  blockType: string;
  description: string;
  typeName: string;
  baseTypeName: string;
  ehDirective:string;
  parameters: any[];
  extendedParameters: any[];
}

export interface IBlockDataExtended extends IBlockData {
  stats: {
    errors: number;
    fatalErrors: number;
    isEnabled: boolean;
    warnings: number;
  }
}

export interface IBlockLookup{
  blockId:string,
  name:string
}

export interface IBlockParameters {
  name: any;
  value: any;
  required?: any;
  format?: any;
  placeholder?: string | Date | number;
  constraints: number;
}

