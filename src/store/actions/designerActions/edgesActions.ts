import { Connection, Edge, addEdge } from "react-flow-renderer";
import { EdgeChange, applyEdgeChanges } from "react-flow-renderer";
import { RFState } from "shared/types/rfState";
import { IEdgeDraggable } from "components/Designer/RightPanel/EdgesEditor/EdgesEditor";
import markerEnd from "shared/constants/edgeConst";
import ConnectionsEdge from "interfaces/IConnectionsEdges";

const edgeActions = (get: () => RFState, set: any) => ({
  onEdgesConnect: (connection: Connection) => {
    const sourceEdges = get().flowSlice.flow.visual.edges;
    const matchedEdgesLength = sourceEdges.filter(
      (x) => x.source === connection.source
    );

    const updatedEdges = sourceEdges.map((edge: any) => {
      if (edge.source === connection.source) {
        return {
          ...edge,
          priority: matchedEdgesLength.indexOf(edge) + 1,
        };
      }
      return edge;
    });

    const newConnection = {
      ...connection,
      type: "button",
      markerEnd,
      priority: matchedEdgesLength.length + 1,
    };

    // Call handleConnect with the updated edges array
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          visual: {
            ...state.flowSlice.flow.visual,
            edges: addEdge(newConnection, updatedEdges),
          },
        },
      },
    }));
  },

  deleteEdge: (edgeId: string) => {
    const edges = get().flowSlice.flow.visual.edges;

    // Find the edge to be deleted
    const deletedEdge = edges.find(
      (edge: ConnectionsEdge) => edge.id === edgeId
    );
    if (!deletedEdge) return; // Edge not found, no action needed

    // Filter out the edge to be deleted
    const filteredEdges = edges.filter(
      (edge: ConnectionsEdge) => edge.id !== edgeId
    );

    // Update the priorities of the remaining edges above the deleted edge
    //NEED TO CHANGE TYPE BACK TO EDGE
    const updatedEdges = filteredEdges.map((edge: any) => {
      if (
        edge.source === deletedEdge.source &&
        edge.priority! > deletedEdge.priority!
      ) {
        const newPriority = Math.max(edge.priority! - 1, 1); // Ensure priority is not less than 1
        return {
          ...edge,
          priority: newPriority,
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
            edges: updatedEdges,
          },
        },
      },
    }));

    console.log(get().flowSlice.flow.visual);
  },

  reorderEdgesPriority: (draggableList: Array<IEdgeDraggable>) => {
    const edges = get().flowSlice.flow.visual.edges;

    for (let i = 0; i < edges.length; i++) {
      for (let j = 0; j < draggableList.length; j++) {
        if (edges[i].target === draggableList[j].targetEdgeID) {
          edges[i].priority = draggableList.indexOf(draggableList[j]) + 1;
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
            edges: edges,
          },
        },
      },
    }));
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          visual: {
            ...state.flowSlice.flow.visual,
            edges: applyEdgeChanges(
              changes,
              state.flowSlice.flow.visual.edges as Edge[]
            ),
          },
        },
      },
    }));
  },
});

export default edgeActions;
