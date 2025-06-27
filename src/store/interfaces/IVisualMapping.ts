import { Node } from "react-flow-renderer";

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
