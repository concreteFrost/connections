import { Node } from "react-flow-renderer";
import { TreeType } from "store/enums/enums";

export interface IVisualMappingNode {
  Id: string;
  Name: string;
  DataType: any;
  Label: string;
  Nodes: IVisualMappingNode[];
}

export interface ITransformNode {
  Id: string | null;
  Name: string;
  Script: string;
}

export interface RowState {
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

export interface TreeNode {
  name: string;
  value?: any;
  children?: TreeNode[];
}
