import { Connection, Edge, addEdge } from 'react-flow-renderer';
import { EdgeChange, applyEdgeChanges } from 'react-flow-renderer';
import { RFState } from '../types/rfState';
import { IEdgeDraggable } from '../../components/Designer/RightPanel/EdgesEditor/EdgesEditor';

export const onEdgesConnect = (get: () => RFState, set: any) => (connection: Connection) => {
  const sourceEdges = get().flowSlice.flow.visual.edges;
  const matchedEdgesLength = sourceEdges.filter((x)=> x.source === connection.source);

  const updatedEdges = sourceEdges.map((edge: any) => {
    if (edge.source === connection.source) {
      return {
        ...edge,
        priority: matchedEdgesLength.indexOf(edge)+1
      };
    }
    return edge;
  });

  const newConnection = {
    ...connection,
    type: 'button',
    priority: matchedEdgesLength.length +1 
  };

  // Call handleConnect with the updated edges array
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        visual: {
          ...state.flowSlice.flow.visual,
          edges: addEdge(newConnection,updatedEdges)
        }
      }
    }
  }));
};

export const deleteEdge = (get: () => RFState, set: any) => (edgeId: string) => {
  const edges = get().flowSlice.flow.visual.edges;

  // Find the edge to be deleted
  const deletedEdge = edges.find((edge: Edge) => edge.id === edgeId);
  if (!deletedEdge) return; // Edge not found, no action needed

  // Filter out the edge to be deleted
  const filteredEdges = edges.filter((edge: Edge) => edge.id !== edgeId);

  // Update the priorities of the remaining edges above the deleted edge
  const updatedEdges = filteredEdges.map((edge: Edge) => {
    if (edge.source === deletedEdge.source && edge.priority! > deletedEdge.priority!) {
      const newPriority = Math.max(edge.priority! - 1, 1); // Ensure priority is not less than 1
      return {
        ...edge,
        priority: newPriority
      };
    }
    return edge;
  });

  // Update the state with the updated edges array
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        visual: {
          ...state.flowSlice.flow.visual,
          edges: updatedEdges
        }
      }
    }
  }));

  console.log(get().flowSlice.flow.visual);
};

export const reorderEdgesPriority = (get:()=>RFState, set:any) =>(draggableList:Array<IEdgeDraggable>)=>{

  const edges = get().flowSlice.flow.visual.edges;
  
  for(let i=0; i<edges.length;i++){
    for(let j=0;j<draggableList.length; j++){
      if(edges[i].target === draggableList[j].targetEdgeID){
        edges[i].priority = draggableList.indexOf(draggableList[j])+1
      }
    }
  }

  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        visual: {
          ...state.flowSlice.flow.visual,
          edges: edges
        }
      }
    }
  }))
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

const edgeActions = {

  onEdgesChange: onEdgesChange,
  onEdgesConnect: onEdgesConnect,
  deleteEdge: deleteEdge,
  reorderEdgesPriority:reorderEdgesPriority
};


export default edgeActions;