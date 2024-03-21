import { Connection, Edge, addEdge } from 'react-flow-renderer';
import { EdgeChange, applyEdgeChanges } from 'react-flow-renderer';
import { RFState } from '../types/rfState';

export function handleConnect(connection: Connection, state: RFState): Edge[] {

  const newConnection = {
    ...connection,
    type: 'button'
  }
  return addEdge(newConnection, state.flowSlice.flow.visual.edges);
}

export const deleteEdge = (get: () => RFState, set: any) => (edgeId: string) => {

  const filteredEdges = get().flowSlice.flow.visual.edges.filter((edge: Edge) => edge.id !== edgeId);

  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        visual: {
          ...state.flowSlice.flow.visual,
          edges: filteredEdges
        }
      }

    }
  }))

  console.log(get().flowSlice.flow.visual)

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
  deleteEdge: deleteEdge
};


export default edgeActions;