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
}

export interface IBlockParameters {
  name: any;
  value: any;
  required: any;
  format: any;
}

export interface IBlockParametersType {
  name: string;
  value: any;
  format: string;
  inputType: string;
  placeholder?: string | Date | number;
  constraints: number;
}
