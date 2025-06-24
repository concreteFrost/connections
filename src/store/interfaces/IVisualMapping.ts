import { Node } from "react-flow-renderer";

export interface IVisualMappingNode {
  Id?: string | null;
  Name: string;
  DataType: any;
  Label: string;
  Nodes: Node<IVisualMappingNode>[];
}

export interface ITransformNode {
  Id: string | null;
  Name: string;
  Script: string;
}
