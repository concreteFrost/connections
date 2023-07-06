import { Node, Connection, Edge, addEdge } from 'react-flow-renderer';
import { EdgeChange, applyEdgeChanges } from 'react-flow-renderer';

export function handleConnect(connection: Connection, state: any): Edge[] {
  // const target = connection.target
  // const targetNode = state.nodes.find((node: Node) => node.id === target);
  // if (targetNode && targetNode.data?.allowsMultipleConnection === false) {
  //   const isTargetConnected = state.edges.some((edge: Edge) => edge.target === target);
  //   if (isTargetConnected) {
  //     return state.edges;
  //   }
  // }
  // console.log(state.edges)
  const newConnection = {
    ...connection,
    type: 'step'
  }
  return addEdge(newConnection, state.edges);
}

export const onEdgesChange = (get: any, set: any) => (changes: EdgeChange[]) => {
  set({
    edges: applyEdgeChanges(changes, get().edges),
  });
}

export const onEdgesConnect = (get: any, set: any) => (connection: Connection) => {
  set({ edges: handleConnect(connection, get()) });
}
