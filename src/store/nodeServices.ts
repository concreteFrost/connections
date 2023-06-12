import { NodeType } from "./nodeTypes";
import { Node, Connection, Edge, addEdge } from 'react-flow-renderer';

export function addNode(nodes: Node[], type: NodeType): Node {
  return {
    id: nodes.length.toString(),
    type: type.type,
    data: type.data,
    position: { x: 0, y: 0 },
  }
}

export function handleConnect(connection: Connection, state: any): Edge[] {
  const target = connection.target
  const targetNode = state.nodes.find((node: Node) => node.id === target);
  if (targetNode && targetNode.data?.allowsMultipleConnection === false) {
    const isTargetConnected = state.edges.some((edge: Edge) => edge.target === target);
    if (isTargetConnected) {
      return state.edges;
    }
  }

  return addEdge(connection, state.edges);
}

export function updateNodeColor(nodes: Node[], nodeId: string, color: string): Node[] {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      node.data = { ...node.data, color };
    }
    return node;
  })
}

export function updateNodeText(nodes: Node[], nodeId: string, text: string): Node[] {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      node.data = { ...node.data, text: text }
    }

    return node;
  });
}

export function setNum(nodes: Node[], nodeId: string, payload: number): Node[] {
  return nodes.map((n: Node) => {
    if (n.id === nodeId) {
      n.data = { ...n.data, number: payload }
    }
    return n;
  })
}

export function setOperationType(nodes: Node[], nodeId: string, payload: string): Node[] {
  return nodes.map((n: Node) => {
    if (n.id === nodeId) {
      n.data = { ...n.data, operationType: payload }
    }
    return n;
  })
}

export function performMathOperation(nodes: Node[], nodeId: string): Node[] {

  return nodes.map((n: Node) => {
    if (n.id === nodeId) {
      let res = 0
      switch (n.data.operationType) {
        case "addition":
          res = n.data.numbers.reduce((a: number, b: number) => a + b, 0);
          break;
        case "subtraction":
          res = n.data.numbers.reduce((a: number, b: number) => a - b, 0);
          break;
      }

      n.data = { ...n.data, number: res }

    }
    return n
  })

}

