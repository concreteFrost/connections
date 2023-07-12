
import {
  NodeChange,
  NodeProps,
  applyNodeChanges,
} from "react-flow-renderer";

import { groupActions } from "./combinedActions";


export const setSelectedNodeID = (get: any, set: any) => (nodeId: string) => {
  set({ selectedNode: nodeId });

};

export const onNodesChange =
  (get: any, set: any) => (changes: NodeChange[]) => {

    changes.forEach((change: NodeChange) => {
      if (change.type === 'remove') {
        groupActions.deleteGroup(get().nodes, change)
      }
    })
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  };

