import { IVisualMappingNode } from "store/interfaces/IVisualMapping";
import { createNodeConverter } from "utils/convertNodesToFlowFormat";
import { createEdgesFromParentToChildren } from "utils/convertNodesToFlowFormat";
import { Node, Edge } from "react-flow-renderer";
import { RFState } from "store/types/rfState";

const uploadStructure =
  (get: RFState) =>
  (
    rootNode: IVisualMappingNode,
    type: "source" | "destination",
    pos: { x: number; y: number }
  ) => {
    const group: Node<any> = {
      id: type === "source" ? "sourceGroup" : "destinationGroup",
      type: "mappingGroup",
      position: { x: pos.x, y: pos.y },
      data: { label: type === "source" ? "INPUT" : "OUTPUT" },
    };
    const convertedNodes = createNodeConverter()(
      rootNode,
      type === "source" ? "source" : "destination",
      group
    );

    //creating "foldering" edges
    const folderingEdges = createEdgesFromParentToChildren(convertedNodes); // creates "folding" edges

    //clearing up potentially existing edges
    const cleanedEdges = get.visualMappingSlice.Visual.Edges.filter(
      (edge: Edge) => {
        const inputStructureEdges = get.visualMappingSlice.InputStructure.map(
          (node: Node<IVisualMappingNode>) => node.id
        );
        return !inputStructureEdges.includes(
          type === "source" ? edge.source : edge.target
        );
      }
    );

    const groupedNodes = [group, ...convertedNodes];

    return { groupedNodes, folderingEdges, cleanedEdges };
  };

export default uploadStructure;
