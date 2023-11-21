import { Connection, Edge, addEdge } from 'react-flow-renderer';
import { EdgeChange, applyEdgeChanges } from 'react-flow-renderer';
import { RFState } from '../types/rfState';

export function handleConnect(connection: Connection, state: RFState): Edge[] {

  const newConnection = {
    ...connection,
    type: 'step'
  }
  return addEdge(newConnection, state.flowSlice.flow.visual.edges);
}

export const onEdgesChange = (get: () => RFState, set: any) => (changes: EdgeChange[]) => {

  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        visual: {
          ...state.flowSlice.flow.visual,
          edges: applyEdgeChanges(changes, state.flowSlice.flow.visual.edges)
        }
      }

    }
  }))

}

export const onEdgesConnect = (get: () => RFState, set: any) => (connection: Connection) => {
  console.log("connecting")
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


const edgeActions = {
  handleConnect: handleConnect,
  onEdgesChange: onEdgesChange,
  onEdgesConnect: onEdgesConnect,
};


export default edgeActions;
