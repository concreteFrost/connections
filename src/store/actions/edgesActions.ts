import { Connection, Edge, addEdge } from 'react-flow-renderer';
import { EdgeChange, applyEdgeChanges } from 'react-flow-renderer';
import { RFState } from '../types/rfState';

export function handleConnect(connection: Connection, state: any): Edge[] {

  const newConnection = {
    ...connection,
    type: 'step'
  }
  return addEdge(newConnection, state.flowSlice.visual.edges);
}

export const onEdgesChange = (get: () => RFState, set: any) => (changes: EdgeChange[]) => {

  set((state: RFState) => ({
    flow: {
      ...state.flowSlice,
      visual: {
        ...state.flowSlice.flow.visual,
        edges: applyEdgeChanges(changes, state.flowSlice.flow.visual.edges)
      }
    }
  }))

}

export const onEdgesConnect = (get: () => RFState, set: any) => (connection: Connection) => {

  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        visual: {
          ...state.flowSlice.flow.visual,
          edges: handleConnect(connection, get())
        }
      }
    }

  }))

}
