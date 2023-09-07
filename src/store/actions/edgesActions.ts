import {Connection, Edge, addEdge } from 'react-flow-renderer';
import { EdgeChange, applyEdgeChanges } from 'react-flow-renderer';
import { RFState } from '../types/rfState';

export function handleConnect(connection: Connection, state: any): Edge[] {

  const newConnection = {
    ...connection,
    type: 'step'
  }
  return addEdge(newConnection, state.flow.visual.edges);
}

export const onEdgesChange = (get: any, set: any) => (changes: EdgeChange[]) => {
  
  set((state : RFState)=>({
    flow:{
      ...state.flow,
      visual:{
        ...state.flow.visual,
        edges:applyEdgeChanges(changes, state.flow.visual.edges)
      }   
    }
  }))
  
}

export const onEdgesConnect = (get: any, set: any) => (connection: Connection) => {

  set((state : RFState)=>({
    flow:{
      ...state.flow,
      visual:{
        ...state.flow.visual,
        edges:handleConnect(connection, get())
      }
     
    }

  }))
  
}
