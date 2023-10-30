export interface IBlockData {
  name: any;
  blockIdentifier: string;
  blockVersion: string;
  blockLabel: string;
  blockType: string;
  description: string;
  typeName: string;
  baseTypeName: string;
  parameters: any[];
  extendedParameters: any[];
}

export interface IBlockParameters {
  name: any;
  value: any;
  required?: any;
  format?: any;
  placeholder?: string | Date | number;
  constraints: number;
}

