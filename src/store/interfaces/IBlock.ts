export interface BlockData {
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

export interface BlockDataExtended extends BlockData {
  stats: {
    errors: number;
    fatalErrors: number;
    isEnabled: boolean;
    warnings: number;
  }
}

export interface BlockLookup{
  blockId:string,
  name:string
}

export interface BlockParameters {
  name: any;
  value: any;
  required?: any;
  format?: any;
  placeholder?: string | Date | number;
  constraints: number;
}

