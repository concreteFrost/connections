import { Node } from "react-flow-renderer";
import { IVisualMappingNode } from "store/interfaces/IVisualMapping";

const verticalSpacing = 50;
const horizontalSpacing = 100;

export function createNodeConverter() {
  let currentY = 100;

  function convert(
    node: any,
    type: "source" | "destination",
    depth = 1
  ): Node<IVisualMappingNode>[] {
    const nodes: Node<IVisualMappingNode>[] = [];

    const id = node.Id;
    const hasChildren = node.Nodes.length > 0;

    const nodePosition = {
      x: depth * horizontalSpacing,
      y: currentY,
    };

    const newNode: Node<IVisualMappingNode> = {
      id,
      type,
      data: node,
      position: nodePosition,
      draggable: false,
    };

    nodes.push(newNode);
    currentY += verticalSpacing;

    if (hasChildren) {
      for (const child of node.Nodes) {
        const childNodes = convert(
          child,
          type,
          type === "source" ? depth + 1 : depth - 1
        );
        nodes.push(...childNodes);
      }
    }

    return nodes;
  }

  return convert;
}
