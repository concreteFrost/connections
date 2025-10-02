import { TreeType } from "store/enums/enums";

export interface TreeNode {
  name: string;
  value?: any;
  children?: TreeNode[];
}

export interface MappingState {
  row_id: string;
  input: RowElement | null;
  operation: string | null;
  output: RowElement | null;
}

export interface RowElement {
  name: string;
  value: string;
  type: TreeType;
  path: string;
}

export interface MappingStructure {
  name: string;
  sourceType: string;
  xsdContent: string;
  success: boolean;
  message: string;
}
