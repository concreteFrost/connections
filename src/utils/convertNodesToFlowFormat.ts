import { Node } from "react-flow-renderer";
import { Edge } from "reactflow";
import { IVisualMappingNode } from "store/interfaces/IVisualMapping";

const verticalSpacing = 65;
const horizontalSpacing = 100;

export function createNodeConverter() {
  let currentY = 70;

  function convert(
    node: any,
    type: "source" | "destination",
    group: Node<any>,
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
      data: { ...node, isParent: hasChildren },
      position: nodePosition,
      draggable: false,
      parentNode: group.id,
      extent: "parent",
    };

    nodes.push(newNode);
    currentY += verticalSpacing;

    if (hasChildren) {
      for (const child of node.Nodes) {
        const childNodes = convert(
          child,
          type,
          group,
          type === "source" ? depth + 1 : depth - 1
        );
        nodes.push(...childNodes);
      }
    }

    return nodes;
  }

  return convert;
}

export function createEdgesFromParentToChildren(
  nodes: any[],
  acc: Edge[] = []
): Edge[] {
  for (const node of nodes) {
    const children = node.data?.Nodes ?? [];

    for (const child of children) {
      acc.push({
        id: `${node.data.Id}-${child.Id}`, // уникальный id
        source: node.data.Id,
        target: child.Id,
        sourceHandle: `${node.data.Id}-bottom`, // или другой id, если он в твоём компоненте
        targetHandle: `${child.Id}-top`,
        type: "step",
        data: {
          readonly: true,
        },
        interactionWidth: 0,
        selected: false,
        focusable: false,
        animated: false,
        markerEnd: undefined,
        markerStart: undefined,
      });

      // рекурсия на следующий уровень вложенности
      createEdgesFromParentToChildren([child], acc);
    }
  }
  return acc;
}
