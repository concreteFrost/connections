export interface IBlockData {
  Name: any;
  BlockIdentifier: string;
  BlockVersion: string;
  BlockLabel: string;
  BlockType: string;
  Description: string;
  TypeName: string;
  BaseTypeName: string;
  Parameters: any[];
}

export interface IBlockParameters {
  Name: any;
  Value: any;
  Required: any;
  Format: any;
}

export interface IBlockParametersType {
  name: string;
  value: any;
  format: string;
  inputType: string;
  placeholder?: string | Date | number;
  constraints: number;
}
