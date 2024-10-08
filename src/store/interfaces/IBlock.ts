export interface BlockData {
  name: any;
  blockIdentifier: string;
  blockVersion: string;
  blockLabel: string;
  blockType: string;
  description: string;
  typeName: string;
  baseTypeName: string;
  ehDirective: string;
  parameters: BlockParameters[];
  extendedParameters: any[];
}

export interface BlockDataExtended extends BlockData {
  stats: {
    errors: number;
    fatalErrors: number;
    isEnabled: boolean;
    warnings: number;
  };
}

export interface BlockLookup {
  blockId: string;
  name: string;
}

export interface BlockParameters {
  name: any;
  value: any;
  required: any;
  format: any;
  description: string;
}

export interface BlockDefaultParameters {
  name: string;
  description: string;
  constraints: number;
  dataType: number;
  parameterDefault: string;
}