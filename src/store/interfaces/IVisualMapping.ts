import { TreeType } from "store/enums/enums";

export interface TreeNode {
  name: string;
  value?: any;
  children?: TreeNode[];
}

export interface MappingState {
  name: string | null;
  reference: string | null;
  inputXsdContent: SchemaDocument | null;
  operations: Operations[];
  outputXsdContent: SchemaDocument | null;
}

export interface SchemaDocument {
  name: string;
  reference: string;
  sourceType: string;
  content: string;
}

export interface Operations {
  rowId: string;
  input: MappingField[];
  operation: string;
  output: MappingField[];
}

export interface MappingField {
  name: string;
  valueType: string;
  docPath: string;
}

export interface MappingList {
  created: string;
  fileName: string;
  lastAccessed: string;
  name: string;
  reference: string;
}
